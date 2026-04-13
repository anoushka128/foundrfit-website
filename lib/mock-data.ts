import { addDays, setHours, setMinutes, subDays } from "date-fns";
import {
  AppDataSnapshot,
  CheckInEntry,
  MealEntry,
  OnboardingPreferences,
  Reminder,
  SymptomEntry,
  UserProfile
} from "@/lib/types";

const now = new Date();

function at(date: Date, hours: number, minutes: number) {
  return setMinutes(setHours(date, hours), minutes).toISOString();
}

export const demoUser: UserProfile = {
  id: "user_demo",
  email: "ava@example.com",
  name: "Ava",
  goal: "identify trigger foods",
  commonSymptoms: ["bloating", "fatigue", "itching", "stomach pain"],
  suspectedFoods: ["garlic", "greek yogurt"],
  knownAllergies: ["shrimp"],
  dietaryRestrictions: ["vegetarian during weekdays"],
  wantsReminders: true,
  mealsPerDay: 3
};

const d0 = now;
const d1 = subDays(now, 1);
const d2 = subDays(now, 2);
const d3 = subDays(now, 3);
const d4 = subDays(now, 4);
const d5 = subDays(now, 5);
const d6 = subDays(now, 6);

export const meals: MealEntry[] = [
  {
    id: "meal_1",
    userId: demoUser.id,
    title: "Greek yogurt bowl",
    loggedAt: at(d6, 8, 20),
    mealType: "breakfast",
    portionSize: "regular",
    location: "home",
    notes: "Honey drizzle",
    foods: [{ id: "food_1", mealId: "meal_1", name: "greek yogurt", categoryTags: ["dairy"] }],
    ingredients: [
      { id: "ingredient_1", mealId: "meal_1", name: "greek yogurt", quantity: "1 cup", categoryTags: ["dairy"] },
      { id: "ingredient_2", mealId: "meal_1", name: "berries", quantity: "1/2 cup", categoryTags: [] },
      { id: "ingredient_3", mealId: "meal_1", name: "honey", quantity: "1 tbsp", categoryTags: [] }
    ]
  },
  {
    id: "meal_2",
    userId: demoUser.id,
    title: "Sweetgreen chicken salad",
    loggedAt: at(d5, 12, 45),
    mealType: "lunch",
    portionSize: "regular",
    location: "restaurant",
    foods: [
      { id: "food_2", mealId: "meal_2", name: "chicken", categoryTags: [] },
      { id: "food_3", mealId: "meal_2", name: "garlic dressing", categoryTags: ["onion/garlic"] }
    ],
    ingredients: [
      { id: "ingredient_4", mealId: "meal_2", name: "chicken", quantity: "4 oz", categoryTags: [] },
      { id: "ingredient_5", mealId: "meal_2", name: "romaine", quantity: "2 cups", categoryTags: [] },
      { id: "ingredient_6", mealId: "meal_2", name: "garlic", quantity: "1 tbsp", categoryTags: ["onion/garlic"] },
      { id: "ingredient_7", mealId: "meal_2", name: "parmesan", quantity: "1 tbsp", categoryTags: ["dairy"] }
    ]
  },
  {
    id: "meal_3",
    userId: demoUser.id,
    title: "Salmon, sweet potato, spinach",
    loggedAt: at(d4, 19, 10),
    mealType: "dinner",
    portionSize: "regular",
    location: "home",
    foods: [
      { id: "food_4", mealId: "meal_3", name: "salmon", categoryTags: [] },
      { id: "food_5", mealId: "meal_3", name: "sweet potato", categoryTags: [] },
      { id: "food_6", mealId: "meal_3", name: "spinach", categoryTags: [] }
    ],
    ingredients: [
      { id: "ingredient_8", mealId: "meal_3", name: "salmon", quantity: "5 oz", categoryTags: [] },
      { id: "ingredient_9", mealId: "meal_3", name: "sweet potato", quantity: "1 medium", categoryTags: [] },
      { id: "ingredient_10", mealId: "meal_3", name: "spinach", quantity: "1 cup", categoryTags: [] }
    ]
  },
  {
    id: "meal_4",
    userId: demoUser.id,
    title: "Garlic pasta",
    loggedAt: at(d3, 20, 0),
    mealType: "dinner",
    portionSize: "large",
    location: "restaurant",
    foods: [
      { id: "food_7", mealId: "meal_4", name: "pasta", categoryTags: ["gluten"] },
      { id: "food_8", mealId: "meal_4", name: "garlic", categoryTags: ["onion/garlic"] }
    ],
    ingredients: [
      { id: "ingredient_11", mealId: "meal_4", name: "pasta", quantity: "2 cups", categoryTags: ["gluten"] },
      { id: "ingredient_12", mealId: "meal_4", name: "garlic", quantity: "2 cloves", categoryTags: ["onion/garlic"] },
      { id: "ingredient_13", mealId: "meal_4", name: "butter", quantity: "1 tbsp", categoryTags: ["dairy", "high-fat"] }
    ]
  },
  {
    id: "meal_5",
    userId: demoUser.id,
    title: "Oatmeal and banana",
    loggedAt: at(d2, 8, 15),
    mealType: "breakfast",
    portionSize: "light",
    location: "home",
    foods: [{ id: "food_9", mealId: "meal_5", name: "oatmeal", categoryTags: [] }],
    ingredients: [
      { id: "ingredient_14", mealId: "meal_5", name: "oats", quantity: "1 cup", categoryTags: [] },
      { id: "ingredient_15", mealId: "meal_5", name: "banana", quantity: "1", categoryTags: [] }
    ]
  },
  {
    id: "meal_6",
    userId: demoUser.id,
    title: "Turkey sandwich",
    loggedAt: at(d1, 13, 5),
    mealType: "lunch",
    portionSize: "regular",
    location: "other",
    foods: [
      { id: "food_10", mealId: "meal_6", name: "turkey", categoryTags: [] },
      { id: "food_11", mealId: "meal_6", name: "bread", categoryTags: ["gluten"] }
    ],
    ingredients: [
      { id: "ingredient_16", mealId: "meal_6", name: "turkey", quantity: "4 oz", categoryTags: [] },
      { id: "ingredient_17", mealId: "meal_6", name: "bread", quantity: "2 slices", categoryTags: ["gluten"] },
      { id: "ingredient_18", mealId: "meal_6", name: "mustard", quantity: "1 tsp", categoryTags: [] }
    ]
  },
  {
    id: "meal_7",
    userId: demoUser.id,
    title: "Eggs and sourdough",
    loggedAt: at(d0, 8, 40),
    mealType: "breakfast",
    portionSize: "regular",
    location: "home",
    foods: [
      { id: "food_12", mealId: "meal_7", name: "eggs", categoryTags: [] },
      { id: "food_13", mealId: "meal_7", name: "sourdough", categoryTags: ["gluten"] }
    ],
    ingredients: [
      { id: "ingredient_19", mealId: "meal_7", name: "eggs", quantity: "2", categoryTags: [] },
      { id: "ingredient_20", mealId: "meal_7", name: "sourdough", quantity: "2 slices", categoryTags: ["gluten"] }
    ]
  },
  {
    id: "meal_8",
    userId: demoUser.id,
    title: "Salmon rice bowl",
    loggedAt: at(d0, 12, 35),
    mealType: "lunch",
    portionSize: "regular",
    location: "restaurant",
    foods: [
      { id: "food_14", mealId: "meal_8", name: "salmon", categoryTags: [] },
      { id: "food_15", mealId: "meal_8", name: "rice", categoryTags: [] },
      { id: "food_16", mealId: "meal_8", name: "avocado", categoryTags: ["high-fat"] }
    ],
    ingredients: [
      { id: "ingredient_21", mealId: "meal_8", name: "salmon", quantity: "4 oz", categoryTags: [] },
      { id: "ingredient_22", mealId: "meal_8", name: "rice", quantity: "1 cup", categoryTags: [] },
      { id: "ingredient_23", mealId: "meal_8", name: "avocado", quantity: "1/2", categoryTags: ["high-fat"] }
    ]
  }
];

export const symptoms: SymptomEntry[] = [
  {
    id: "symptom_1",
    userId: demoUser.id,
    startedAt: at(d5, 15, 0),
    severity: 7,
    categories: ["bloating", "stomach pain"],
    duration: "2 hours",
    timing: "within 2-4 hours",
    notes: "Felt tight after lunch"
  },
  {
    id: "symptom_2",
    userId: demoUser.id,
    startedAt: at(d3, 22, 30),
    severity: 8,
    categories: ["bloating", "reflux", "fatigue"],
    duration: "Rest of evening",
    timing: "within 2-4 hours"
  },
  {
    id: "symptom_3",
    userId: demoUser.id,
    startedAt: at(d2, 10, 10),
    severity: 2,
    categories: ["fatigue"],
    duration: "1 hour",
    timing: "within 1 hour"
  },
  {
    id: "symptom_4",
    userId: demoUser.id,
    startedAt: at(d1, 16, 10),
    severity: 4,
    categories: ["brain fog", "bloating"],
    duration: "90 minutes",
    timing: "within 2-4 hours"
  },
  {
    id: "symptom_5",
    userId: demoUser.id,
    startedAt: at(d0, 13, 50),
    severity: 3,
    categories: ["itching"],
    duration: "30 minutes",
    timing: "within 1 hour",
    notes: "Mild, faded quickly"
  }
];

export const checkIns: CheckInEntry[] = [
  {
    id: "checkin_1",
    userId: demoUser.id,
    loggedAt: at(d0, 9, 0),
    feeling: "Pretty steady",
    symptomsPresent: false,
    energyLevel: 7,
    cravings: "Something salty",
    bowelMovementToday: true,
    stressLevel: 4,
    sleepHours: 7.5
  },
  {
    id: "checkin_2",
    userId: demoUser.id,
    loggedAt: at(d0, 18, 20),
    feeling: "A little off after lunch",
    symptomsPresent: true,
    energyLevel: 5,
    cravings: "Tea",
    bowelMovementToday: true,
    stressLevel: 6,
    sleepHours: 7.5
  }
];

export const reminders: Reminder[] = [
  { id: "reminder_1", userId: demoUser.id, label: "Log breakfast", time: "08:30", enabled: true },
  { id: "reminder_2", userId: demoUser.id, label: "Check in 1 hour after lunch", time: "14:00", enabled: true },
  { id: "reminder_3", userId: demoUser.id, label: "Evening summary", time: "20:30", enabled: false }
];

export const onboarding: OnboardingPreferences = {
  name: demoUser.name,
  mainGoal: demoUser.goal,
  commonSymptoms: demoUser.commonSymptoms,
  suspectedFoods: demoUser.suspectedFoods,
  knownAllergies: demoUser.knownAllergies,
  dietaryRestrictions: demoUser.dietaryRestrictions,
  remindersEnabled: demoUser.wantsReminders,
  mealsPerDay: demoUser.mealsPerDay
};

export const initialAppData: AppDataSnapshot = {
  profile: demoUser,
  onboarding,
  onboardingCompleted: true,
  meals,
  symptoms,
  checkIns,
  reminders
};

export const symptomTrend = Array.from({ length: 7 }, (_, index) => ({
  day: addDays(d6, index).toLocaleDateString("en-US", { weekday: "short" }),
  severity: [3, 7, 2, 8, 4, 3, 5][index]
}));
