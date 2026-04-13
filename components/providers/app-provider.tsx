"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Session } from "@supabase/supabase-js";
import { buildInsightSummaries, buildTriggerScores, getSafetyAlert, getTopSymptomCategories } from "@/lib/analysis";
import { initialAppData } from "@/lib/mock-data";
import {
  clearDemoSession,
  loadDemoSession,
  loadLocalSnapshot,
  saveDemoSession,
  saveLocalSnapshot
} from "@/lib/local-store";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import {
  AppDataSnapshot,
  CreateCheckInInput,
  CreateMealInput,
  CreateSymptomInput,
  OnboardingPreferences,
  Reminder
} from "@/lib/types";

type AppContextValue = {
  snapshot: AppDataSnapshot;
  initialized: boolean;
  mode: "demo" | "supabase";
  session: Session | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  scores: ReturnType<typeof buildTriggerScores>;
  summaries: ReturnType<typeof buildInsightSummaries>;
  topSymptoms: ReturnType<typeof getTopSymptomCategories>;
  safetyAlert: string | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  saveOnboarding: (input: OnboardingPreferences) => Promise<{ error?: string }>;
  addMeal: (input: CreateMealInput) => Promise<{ error?: string }>;
  addSymptom: (input: CreateSymptomInput) => Promise<{ error?: string; alert?: string | null }>;
  addCheckIn: (input: CreateCheckInInput) => Promise<{ error?: string }>;
  toggleReminder: (id: string) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function parseCsv(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isSupabaseEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function AppProvider({ children }: PropsWithChildren) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [snapshot, setSnapshot] = useState<AppDataSnapshot>(initialAppData);
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [demoAuthenticated, setDemoAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const mode = supabase && isSupabaseEnabled() ? "supabase" : "demo";

  useEffect(() => {
    if (mode === "demo") {
      setSnapshot(loadLocalSnapshot());
      setDemoAuthenticated(loadDemoSession().authenticated);
      setInitialized(true);
      setAuthLoading(false);
      return;
    }

    let active = true;

    async function boot() {
      if (!supabase) return;
      const {
        data: { session: initialSession }
      } = await supabase.auth.getSession();
      if (!active) return;
      setSession(initialSession);
      if (initialSession?.user) {
        const loaded = await loadSnapshotFromSupabase(supabase, initialSession.user.id, initialSession.user.email ?? "");
        if (active) setSnapshot(loaded);
      }
      setInitialized(true);
      setAuthLoading(false);
    }

    boot();

    const { data } = supabase!.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (nextSession?.user) {
        const loaded = await loadSnapshotFromSupabase(supabase!, nextSession.user.id, nextSession.user.email ?? "");
        if (active) setSnapshot(loaded);
      }
      setInitialized(true);
      setAuthLoading(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [mode, supabase]);

  const scores = useMemo(
    () => buildTriggerScores(snapshot.meals, snapshot.symptoms),
    [snapshot.meals, snapshot.symptoms]
  );
  const summaries = useMemo(
    () => buildInsightSummaries(snapshot.meals, snapshot.symptoms, scores),
    [snapshot.meals, snapshot.symptoms, scores]
  );
  const topSymptoms = useMemo(() => getTopSymptomCategories(snapshot.symptoms), [snapshot.symptoms]);
  const safetyAlert = useMemo(
    () => snapshot.symptoms.map(getSafetyAlert).find(Boolean) ?? null,
    [snapshot.symptoms]
  );

  async function signUp(email: string, password: string, name: string) {
    if (mode === "demo") {
      const nextSnapshot = {
        ...loadLocalSnapshot(),
        profile: {
          ...loadLocalSnapshot().profile,
          email,
          name
        },
        onboarding: {
          ...loadLocalSnapshot().onboarding,
          name
        },
        onboardingCompleted: false
      };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      saveDemoSession({ authenticated: true });
      setDemoAuthenticated(true);
      return { message: "Demo account ready. You can start using the app right away." };
    }

    const { error, data } = await supabase!.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) return { error: error.message };

    if (data.user) {
      await supabase!.from("profiles").upsert({
        id: data.user.id,
        email,
        name
      });
    }

    return { message: "Account created. Check your email if confirmation is enabled." };
  }

  async function signIn(email: string, password: string) {
    if (mode === "demo") {
      const nextSnapshot = {
        ...loadLocalSnapshot(),
        profile: { ...loadLocalSnapshot().profile, email }
      };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      saveDemoSession({ authenticated: true });
      setDemoAuthenticated(true);
      return {};
    }

    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  }

  async function signOut() {
    if (mode === "demo") {
      clearDemoSession();
      setDemoAuthenticated(false);
      return;
    }
    await supabase!.auth.signOut();
  }

  async function saveOnboarding(input: OnboardingPreferences) {
    if (mode === "demo") {
      const nextSnapshot = {
        ...snapshot,
        profile: {
          ...snapshot.profile,
          name: input.name,
          goal: input.mainGoal,
          commonSymptoms: input.commonSymptoms,
          suspectedFoods: input.suspectedFoods,
          knownAllergies: input.knownAllergies,
          dietaryRestrictions: input.dietaryRestrictions,
          wantsReminders: input.remindersEnabled,
          mealsPerDay: input.mealsPerDay
        },
        onboarding: input,
        onboardingCompleted: true
      };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      return {};
    }

    if (!session?.user) return { error: "Please log in first." };

    const userId = session.user.id;
    const [{ error: profileError }, { error: onboardingError }] = await Promise.all([
      supabase!.from("profiles").upsert({
        id: userId,
        email: session.user.email,
        name: input.name
      }),
      supabase!.from("onboarding_preferences").upsert({
        user_id: userId,
        main_goal: input.mainGoal,
        common_symptoms: input.commonSymptoms,
        suspected_foods: input.suspectedFoods,
        known_allergies: input.knownAllergies,
        dietary_restrictions: input.dietaryRestrictions,
        reminders_enabled: input.remindersEnabled,
        meals_per_day: input.mealsPerDay
      })
    ]);

    if (profileError || onboardingError) {
      return { error: profileError?.message ?? onboardingError?.message };
    }

    setSnapshot((current) => ({
      ...current,
      profile: {
        ...current.profile,
        name: input.name,
        goal: input.mainGoal,
        commonSymptoms: input.commonSymptoms,
        suspectedFoods: input.suspectedFoods,
        knownAllergies: input.knownAllergies,
        dietaryRestrictions: input.dietaryRestrictions,
        wantsReminders: input.remindersEnabled,
        mealsPerDay: input.mealsPerDay
      },
      onboarding: input,
      onboardingCompleted: true
    }));
    return {};
  }

  async function addMeal(input: CreateMealInput) {
    const mealId = uid("meal");
    const meal = {
      id: mealId,
      userId: snapshot.profile.id,
      title: input.title,
      loggedAt: input.loggedAt,
      mealType: input.mealType,
      foods: input.foods.map((name) => ({ id: uid("food"), mealId, name, categoryTags: [] })),
      ingredients: input.ingredients.map((ingredient) => ({
        id: uid("ingredient"),
        mealId,
        name: ingredient.name,
        quantity: ingredient.quantity,
        categoryTags: []
      })),
      portionSize: input.portionSize,
      location: input.location,
      notes: input.notes,
      photoUrl: input.photoUrl
    };

    if (mode === "demo") {
      const nextSnapshot = { ...snapshot, meals: [meal, ...snapshot.meals] };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      return {};
    }

    if (!session?.user) return { error: "Please log in first." };
    const { error } = await supabase!.from("meals").insert({
      id: meal.id,
      user_id: session.user.id,
      title: meal.title,
      logged_at: meal.loggedAt,
      meal_type: meal.mealType,
      portion_size: meal.portionSize,
      location: meal.location,
      notes: meal.notes,
      photo_url: meal.photoUrl
    });
    if (error) return { error: error.message };
    if (meal.foods.length) {
      await supabase!.from("meal_foods").insert(
        meal.foods.map((food) => ({
          id: food.id,
          meal_id: meal.id,
          name: food.name,
          category_tags: food.categoryTags
        }))
      );
    }
    if (meal.ingredients.length) {
      await supabase!.from("meal_ingredients").insert(
        meal.ingredients.map((ingredient) => ({
          id: ingredient.id,
          meal_id: meal.id,
          name: ingredient.name,
          quantity: ingredient.quantity,
          category_tags: ingredient.categoryTags
        }))
      );
    }
    setSnapshot((current) => ({ ...current, meals: [meal, ...current.meals] }));
    return {};
  }

  async function addSymptom(input: CreateSymptomInput) {
    const symptom = {
      id: uid("symptom"),
      userId: snapshot.profile.id,
      ...input
    };
    const alert = getSafetyAlert(symptom);

    if (mode === "demo") {
      const nextSnapshot = { ...snapshot, symptoms: [symptom, ...snapshot.symptoms] };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      return { alert };
    }

    if (!session?.user) return { error: "Please log in first." };
    const { error } = await supabase!.from("symptoms").insert({
      id: symptom.id,
      user_id: session.user.id,
      started_at: symptom.startedAt,
      severity: symptom.severity,
      categories: symptom.categories,
      duration: symptom.duration,
      notes: symptom.notes,
      timing_bucket: symptom.timing
    });
    if (error) return { error: error.message, alert };
    setSnapshot((current) => ({ ...current, symptoms: [symptom, ...current.symptoms] }));
    return { alert };
  }

  async function addCheckIn(input: CreateCheckInInput) {
    const checkIn = {
      id: uid("checkin"),
      userId: snapshot.profile.id,
      ...input
    };
    if (mode === "demo") {
      const nextSnapshot = { ...snapshot, checkIns: [checkIn, ...snapshot.checkIns] };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      return {};
    }
    if (!session?.user) return { error: "Please log in first." };
    const { error } = await supabase!.from("check_ins").insert({
      id: checkIn.id,
      user_id: session.user.id,
      logged_at: checkIn.loggedAt,
      feeling: checkIn.feeling,
      symptoms_present: checkIn.symptomsPresent,
      energy_level: checkIn.energyLevel,
      cravings: checkIn.cravings,
      bowel_movement_today: checkIn.bowelMovementToday,
      stress_level: checkIn.stressLevel,
      sleep_hours: checkIn.sleepHours
    });
    if (error) return { error: error.message };
    setSnapshot((current) => ({ ...current, checkIns: [checkIn, ...current.checkIns] }));
    return {};
  }

  async function toggleReminder(id: string) {
    const updatedReminders = snapshot.reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    );

    if (mode === "demo") {
      const nextSnapshot = { ...snapshot, reminders: updatedReminders };
      setSnapshot(nextSnapshot);
      saveLocalSnapshot(nextSnapshot);
      return;
    }

    const changed = updatedReminders.find((reminder) => reminder.id === id) as Reminder | undefined;
    if (changed) {
      await supabase!.from("reminders").update({ enabled: changed.enabled }).eq("id", id);
    }
    setSnapshot((current) => ({ ...current, reminders: updatedReminders }));
  }

  return (
    <AppContext.Provider
      value={{
        snapshot,
        initialized,
        mode,
        session,
        isAuthenticated: mode === "demo" ? demoAuthenticated : Boolean(session?.user),
        authLoading,
        scores,
        summaries,
        topSymptoms,
        safetyAlert,
        signUp,
        signIn,
        signOut,
        saveOnboarding,
        addMeal,
        addSymptom,
        addCheckIn,
        toggleReminder
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}

export function splitCommaSeparated(input: string) {
  return parseCsv(input);
}

async function loadSnapshotFromSupabase(
  supabase: NonNullable<ReturnType<typeof createSupabaseBrowserClient>>,
  userId: string,
  email: string
): Promise<AppDataSnapshot> {
  const [profilesRes, onboardingRes, mealsRes, mealFoodsRes, ingredientsRes, symptomsRes, checkInsRes, remindersRes] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("onboarding_preferences").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("meals").select("*").eq("user_id", userId).order("logged_at", { ascending: false }),
      supabase.from("meal_foods").select("*"),
      supabase.from("meal_ingredients").select("*"),
      supabase.from("symptoms").select("*").eq("user_id", userId).order("started_at", { ascending: false }),
      supabase.from("check_ins").select("*").eq("user_id", userId).order("logged_at", { ascending: false }),
      supabase.from("reminders").select("*").eq("user_id", userId)
    ]);

  const meals = (mealsRes.data ?? []).map((meal) => ({
    id: meal.id,
    userId,
    title: meal.title,
    loggedAt: meal.logged_at,
    mealType: meal.meal_type,
    portionSize: meal.portion_size,
    location: meal.location,
    notes: meal.notes ?? undefined,
    photoUrl: meal.photo_url ?? undefined,
    foods: (mealFoodsRes.data ?? [])
      .filter((food) => food.meal_id === meal.id)
      .map((food) => ({
        id: food.id,
        mealId: meal.id,
        name: food.name,
        categoryTags: food.category_tags ?? []
      })),
    ingredients: (ingredientsRes.data ?? [])
      .filter((ingredient) => ingredient.meal_id === meal.id)
      .map((ingredient) => ({
        id: ingredient.id,
        mealId: meal.id,
        name: ingredient.name,
        quantity: ingredient.quantity ?? undefined,
        categoryTags: ingredient.category_tags ?? []
      }))
  }));

  return {
    profile: {
      id: userId,
      email,
      name: profilesRes.data?.name ?? "GutTrigger user",
      goal: onboardingRes.data?.main_goal ?? "identify trigger foods",
      commonSymptoms: onboardingRes.data?.common_symptoms ?? [],
      suspectedFoods: onboardingRes.data?.suspected_foods ?? [],
      knownAllergies: onboardingRes.data?.known_allergies ?? [],
      dietaryRestrictions: onboardingRes.data?.dietary_restrictions ?? [],
      wantsReminders: onboardingRes.data?.reminders_enabled ?? false,
      mealsPerDay: onboardingRes.data?.meals_per_day ?? 3
    },
    onboarding: {
      name: profilesRes.data?.name ?? "",
      mainGoal: onboardingRes.data?.main_goal ?? "identify trigger foods",
      commonSymptoms: onboardingRes.data?.common_symptoms ?? [],
      suspectedFoods: onboardingRes.data?.suspected_foods ?? [],
      knownAllergies: onboardingRes.data?.known_allergies ?? [],
      dietaryRestrictions: onboardingRes.data?.dietary_restrictions ?? [],
      remindersEnabled: onboardingRes.data?.reminders_enabled ?? false,
      mealsPerDay: onboardingRes.data?.meals_per_day ?? 3
    },
    onboardingCompleted: Boolean(onboardingRes.data),
    meals,
    symptoms: (symptomsRes.data ?? []).map((symptom) => ({
      id: symptom.id,
      userId,
      startedAt: symptom.started_at,
      severity: symptom.severity,
      categories: symptom.categories ?? [],
      duration: symptom.duration ?? "",
      notes: symptom.notes ?? undefined,
      timing: symptom.timing_bucket
    })),
    checkIns: (checkInsRes.data ?? []).map((checkIn) => ({
      id: checkIn.id,
      userId,
      loggedAt: checkIn.logged_at,
      feeling: checkIn.feeling ?? "",
      symptomsPresent: checkIn.symptoms_present ?? false,
      energyLevel: checkIn.energy_level ?? 5,
      cravings: checkIn.cravings ?? "",
      bowelMovementToday: checkIn.bowel_movement_today ?? false,
      stressLevel: checkIn.stress_level ?? 5,
      sleepHours: Number(checkIn.sleep_hours ?? 0)
    })),
    reminders: (remindersRes.data ?? []).map((reminder) => ({
      id: reminder.id,
      userId,
      label: reminder.label,
      time: reminder.reminder_time,
      enabled: reminder.enabled
    }))
  };
}
