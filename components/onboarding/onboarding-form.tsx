"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { splitCommaSeparated, useApp } from "@/components/providers/app-provider";
import { Goal, OnboardingPreferences, SymptomCategory } from "@/lib/types";

const goals: Goal[] = [
  "identify trigger foods",
  "reduce bloating",
  "reduce digestive discomfort",
  "identify allergy patterns"
];

const commonSymptoms: SymptomCategory[] = [
  "bloating",
  "stomach pain",
  "gas",
  "nausea",
  "reflux",
  "diarrhea",
  "constipation",
  "fatigue",
  "brain fog",
  "itching",
  "rash",
  "headache",
  "swelling"
];

export function OnboardingForm() {
  const router = useRouter();
  const { snapshot, saveOnboarding } = useApp();
  const [form, setForm] = useState<OnboardingPreferences>(snapshot.onboarding);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const result = await saveOnboarding(form);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Preferences saved.");
    router.push("/");
  }

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 py-8">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-ink/55">Onboarding</p>
          <h1 className="text-[30px] font-semibold leading-tight text-ink">
            Let’s shape GutTrigger around how you actually want to track.
          </h1>
          <div className="mt-4">
            <Progress value={100} />
          </div>
        </div>

        <Card>
          <p className="text-sm text-ink/55">Setup</p>
          <h2 className="text-lg font-semibold text-ink">Your tracking preferences</h2>
          <form className="mt-4 space-y-4" onSubmit={onSubmit}>
            <Input value={form.name} placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">Main goal</p>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setForm({ ...form, mainGoal: goal })}
                    className="border-0 bg-transparent p-0"
                  >
                    <Chip label={goal} tone={form.mainGoal === goal ? "success" : "default"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">Common symptoms</p>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => {
                  const active = form.commonSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          commonSymptoms: active
                            ? form.commonSymptoms.filter((item) => item !== symptom)
                            : [...form.commonSymptoms, symptom]
                        })
                      }
                      className="border-0 bg-transparent p-0"
                    >
                      <Chip label={symptom} tone={active ? "warm" : "default"} />
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              placeholder="Known allergies or foods you suspect"
              value={form.knownAllergies.join(", ")}
              onChange={(e) => setForm({ ...form, knownAllergies: splitCommaSeparated(e.target.value) })}
            />
            <Input
              placeholder="Foods you already suspect"
              value={form.suspectedFoods.join(", ")}
              onChange={(e) => setForm({ ...form, suspectedFoods: splitCommaSeparated(e.target.value) })}
            />
            <Input
              placeholder="Dietary restrictions"
              value={form.dietaryRestrictions.join(", ")}
              onChange={(e) => setForm({ ...form, dietaryRestrictions: splitCommaSeparated(e.target.value) })}
            />

            <div className="grid grid-cols-2 gap-3">
              <label className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">
                Meals per day
                <input
                  className="mt-2 w-full border-0 bg-transparent outline-none"
                  type="number"
                  min={1}
                  max={8}
                  value={form.mealsPerDay}
                  onChange={(e) => setForm({ ...form, mealsPerDay: Number(e.target.value) || 3 })}
                />
              </label>
              <button
                type="button"
                onClick={() => setForm({ ...form, remindersEnabled: !form.remindersEnabled })}
                className={`rounded-2xl px-4 py-3 text-left text-sm ${
                  form.remindersEnabled ? "bg-espresso text-mist" : "border border-line bg-white text-ink"
                }`}
              >
                Reminders
                <p className="mt-2 text-xs opacity-75">
                  {form.remindersEnabled ? "Enabled after meals" : "Tap to turn on"}
                </p>
              </button>
            </div>

            {error ? <p className="text-sm text-[#9f4135]">{error}</p> : null}
            {message ? <p className="text-sm text-moss">{message}</p> : null}
            <Button className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Continue to dashboard"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
