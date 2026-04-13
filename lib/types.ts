export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type MealLocation = "home" | "restaurant" | "other";
export type PortionSize = "light" | "regular" | "large";
export type Goal =
  | "identify trigger foods"
  | "reduce bloating"
  | "reduce digestive discomfort"
  | "identify allergy patterns";
export type SymptomTiming =
  | "immediately"
  | "within 1 hour"
  | "within 2-4 hours"
  | "later that day"
  | "next morning";
export type SymptomCategory =
  | "bloating"
  | "stomach pain"
  | "gas"
  | "nausea"
  | "reflux"
  | "diarrhea"
  | "constipation"
  | "fatigue"
  | "brain fog"
  | "itching"
  | "rash"
  | "headache"
  | "swelling"
  | "throat tightness"
  | "wheezing"
  | "trouble breathing"
  | "swelling of lips/tongue"
  | "fainting"
  | "severe rash"
  | "other";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  goal: Goal;
  commonSymptoms: SymptomCategory[];
  suspectedFoods: string[];
  knownAllergies: string[];
  dietaryRestrictions: string[];
  wantsReminders: boolean;
  mealsPerDay: number;
}

export interface MealFood {
  id: string;
  mealId: string;
  name: string;
  categoryTags: string[];
}

export interface MealIngredient {
  id: string;
  mealId: string;
  name: string;
  quantity?: string;
  categoryTags: string[];
}

export interface MealEntry {
  id: string;
  userId: string;
  title: string;
  loggedAt: string;
  mealType: MealType;
  foods: MealFood[];
  ingredients: MealIngredient[];
  portionSize: PortionSize;
  location: MealLocation;
  notes?: string;
  photoUrl?: string;
}

export interface SymptomEntry {
  id: string;
  userId: string;
  startedAt: string;
  severity: number;
  categories: SymptomCategory[];
  duration: string;
  notes?: string;
  timing: SymptomTiming;
}

export interface CheckInEntry {
  id: string;
  userId: string;
  loggedAt: string;
  feeling: string;
  symptomsPresent: boolean;
  energyLevel: number;
  cravings: string;
  bowelMovementToday: boolean;
  stressLevel: number;
  sleepHours: number;
}

export interface Reminder {
  id: string;
  userId: string;
  label: string;
  time: string;
  enabled: boolean;
}

export interface OnboardingPreferences {
  name: string;
  mainGoal: Goal;
  commonSymptoms: SymptomCategory[];
  suspectedFoods: string[];
  knownAllergies: string[];
  dietaryRestrictions: string[];
  remindersEnabled: boolean;
  mealsPerDay: number;
}

export interface TriggerScore {
  name: string;
  exposures: number;
  symptomLinkedExposures: number;
  avgSeverity: number;
  consistency: number;
  timePatternScore: number;
  confidence: number;
  weightedScore: number;
  classification:
    | "High suspicion"
    | "Moderate suspicion"
    | "Low suspicion"
    | "Probably safe"
    | "Not enough data";
  linkedSymptoms: SymptomCategory[];
}

export interface InsightSummary {
  title: string;
  body: string;
  tone: "neutral" | "supportive" | "warning";
}

export interface AppDataSnapshot {
  profile: UserProfile;
  onboarding: OnboardingPreferences;
  onboardingCompleted: boolean;
  meals: MealEntry[];
  symptoms: SymptomEntry[];
  checkIns: CheckInEntry[];
  reminders: Reminder[];
}

export interface CreateMealInput {
  title: string;
  loggedAt: string;
  mealType: MealType;
  foods: string[];
  ingredients: { name: string; quantity?: string }[];
  portionSize: PortionSize;
  location: MealLocation;
  notes?: string;
  photoUrl?: string;
}

export interface CreateSymptomInput {
  startedAt: string;
  severity: number;
  categories: SymptomCategory[];
  duration: string;
  notes?: string;
  timing: SymptomTiming;
}

export interface CreateCheckInInput {
  loggedAt: string;
  feeling: string;
  symptomsPresent: boolean;
  energyLevel: number;
  cravings: string;
  bowelMovementToday: boolean;
  stressLevel: number;
  sleepHours: number;
}
