import { differenceInHours, parseISO } from "date-fns";
import {
  InsightSummary,
  MealEntry,
  SymptomCategory,
  SymptomEntry,
  TriggerScore
} from "@/lib/types";

const ANALYSIS_WINDOW_HOURS = 18;

const timingWeightMap: Record<string, number> = {
  immediately: 1,
  "within 1 hour": 0.95,
  "within 2-4 hours": 0.85,
  "later that day": 0.65,
  "next morning": 0.45
};

export function getSafetyAlert(symptom: SymptomEntry) {
  const serious = [
    "throat tightness",
    "wheezing",
    "trouble breathing",
    "swelling of lips/tongue",
    "fainting",
    "severe rash"
  ];

  return symptom.categories.some((category) => serious.includes(category))
    ? "These symptoms may be serious. Seek medical attention immediately."
    : null;
}

function linkedSymptomsForMeal(meal: MealEntry, symptoms: SymptomEntry[]) {
  const mealTime = parseISO(meal.loggedAt);
  return symptoms.filter((symptom) => {
    const symptomTime = parseISO(symptom.startedAt);
    const hours = differenceInHours(symptomTime, mealTime);
    return hours >= 0 && hours <= ANALYSIS_WINDOW_HOURS;
  });
}

function classifyScore(score: number, exposures: number): TriggerScore["classification"] {
  if (exposures < 2) return "Not enough data";
  if (score >= 0.75) return "High suspicion";
  if (score >= 0.55) return "Moderate suspicion";
  if (score >= 0.35) return "Low suspicion";
  if (score < 0.2) return "Probably safe";
  return "Low suspicion";
}

export function buildTriggerScores(meals: MealEntry[], symptoms: SymptomEntry[]) {
  const foodMap = new Map<
    string,
    {
      exposures: number;
      symptomLinkedExposures: number;
      severityTotal: number;
      timingTotal: number;
      linkedSymptoms: SymptomCategory[];
    }
  >();

  for (const meal of meals) {
    const relatedSymptoms = linkedSymptomsForMeal(meal, symptoms);
    const mealItems = [...meal.foods.map((food) => food.name), ...meal.ingredients.map((ingredient) => ingredient.name)];
    const uniqueItems = [...new Set(mealItems.map((item) => item.toLowerCase()))];

    for (const item of uniqueItems) {
      const existing = foodMap.get(item) ?? {
        exposures: 0,
        symptomLinkedExposures: 0,
        severityTotal: 0,
        timingTotal: 0,
        linkedSymptoms: []
      };

      existing.exposures += 1;

      if (relatedSymptoms.length > 0) {
        existing.symptomLinkedExposures += 1;
        existing.severityTotal +=
          relatedSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0) / relatedSymptoms.length;
        existing.timingTotal +=
          relatedSymptoms.reduce((sum, symptom) => sum + timingWeightMap[symptom.timing], 0) / relatedSymptoms.length;
        existing.linkedSymptoms.push(...relatedSymptoms.flatMap((symptom) => symptom.categories));
      }

      foodMap.set(item, existing);
    }
  }

  return [...foodMap.entries()]
    .map(([name, entry]) => {
      const avgSeverity = entry.symptomLinkedExposures
        ? entry.severityTotal / entry.symptomLinkedExposures
        : 0;
      const normalizedSeverity = avgSeverity / 10;
      const consistency = entry.exposures ? entry.symptomLinkedExposures / entry.exposures : 0;
      const timePatternScore = entry.symptomLinkedExposures
        ? entry.timingTotal / entry.symptomLinkedExposures
        : 0;
      const confidence = Math.min(1, (entry.exposures / 6) * 0.7 + consistency * 0.3);
      const weightedScore =
        consistency * 0.45 +
        normalizedSeverity * 0.25 +
        timePatternScore * 0.15 +
        confidence * 0.15;

      return {
        name,
        exposures: entry.exposures,
        symptomLinkedExposures: entry.symptomLinkedExposures,
        avgSeverity,
        consistency,
        timePatternScore,
        confidence,
        weightedScore,
        classification: classifyScore(weightedScore, entry.exposures),
        linkedSymptoms: [...new Set(entry.linkedSymptoms)]
      } satisfies TriggerScore;
    })
    .sort((a, b) => b.weightedScore - a.weightedScore);
}

export function buildInsightSummaries(
  meals: MealEntry[],
  symptoms: SymptomEntry[],
  scores: TriggerScore[]
): InsightSummary[] {
  const summaries: InsightSummary[] = [];
  const topTrigger = scores.find((score) =>
    ["High suspicion", "Moderate suspicion"].includes(score.classification)
  );
  const safeFood = scores.find((score) => score.classification === "Probably safe");
  const restaurantMeals = meals.filter((meal) => meal.location === "restaurant");
  const restaurantLinked = restaurantMeals.filter((meal) => linkedSymptomsForMeal(meal, symptoms).length > 0);

  if (topTrigger) {
    summaries.push({
      title: "Pattern detected",
      body: `${titleCase(topTrigger.name)} appeared in ${topTrigger.exposures} logged meals, with symptoms following ${topTrigger.symptomLinkedExposures} times. Worth testing more carefully.`,
      tone: "neutral"
    });
  }

  if (safeFood) {
    summaries.push({
      title: "Lower-risk signal",
      body: `${titleCase(safeFood.name)} has repeated exposures with limited symptom follow-up so far. This may be a steadier option.`,
      tone: "supportive"
    });
  }

  if (restaurantMeals.length >= 2) {
    summaries.push({
      title: "Context matters",
      body: `Symptoms followed ${restaurantLinked.length} of ${restaurantMeals.length} restaurant meals. Eating out may be amplifying ingredient uncertainty.`,
      tone: restaurantLinked.length / restaurantMeals.length > 0.6 ? "warning" : "neutral"
    });
  }

  if (!topTrigger) {
    summaries.push({
      title: "Keep logging",
      body: "There is not enough repeat data yet to separate a likely trigger from a one-off bad meal.",
      tone: "supportive"
    });
  }

  return summaries;
}

export function getTopSymptomCategories(symptoms: SymptomEntry[]) {
  const counts = new Map<string, number>();
  for (const symptom of symptoms) {
    for (const category of symptom.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
