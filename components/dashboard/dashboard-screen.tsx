"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { AccountCard } from "@/components/dashboard/account-card";
import { HeroCard } from "@/components/dashboard/hero-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RemindersCard } from "@/components/dashboard/reminders-card";
import { TriggerCards } from "@/components/dashboard/trigger-cards";
import { WeeklySummary } from "@/components/dashboard/weekly-summary";
import { SeverityChart } from "@/components/charts/severity-chart";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function DashboardScreen() {
  const { snapshot, scores } = useApp();

  const todayKey = format(new Date(), "yyyy-MM-dd");
  const todaysMeals = snapshot.meals.filter((meal) => meal.loggedAt.startsWith(todayKey));
  const todaysSymptoms = snapshot.symptoms.filter((symptom) => symptom.startedAt.startsWith(todayKey));
  const possibleTriggers = scores.filter((score) =>
    ["High suspicion", "Moderate suspicion"].includes(score.classification)
  );
  const safeFoods = scores.filter((score) => score.classification === "Probably safe").slice(0, 3);

  const trend = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        const key = format(date, "yyyy-MM-dd");
        const sameDay = snapshot.symptoms.filter((symptom) => symptom.startedAt.startsWith(key));
        const severity = sameDay.length
          ? sameDay.reduce((sum, symptom) => sum + symptom.severity, 0) / sameDay.length
          : 0;
        return { day: format(date, "EEE"), severity: Number(severity.toFixed(1)) };
      }),
    [snapshot.symptoms]
  );

  return (
    <div className="space-y-4 pb-8">
      <HeroCard />
      <QuickActions />

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink/55">Today</p>
            <h2 className="text-lg font-semibold text-ink">Your rhythm so far</h2>
          </div>
          <p className="text-xs text-ink/45">{format(new Date(), "MMM d")}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-[22px] bg-sand/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Meals</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{todaysMeals.length}</p>
            <p className="mt-1 text-xs text-ink/55">
              {todaysMeals.length === 0 ? "No meals logged yet" : "Captured for analysis"}
            </p>
          </div>
          <div className="rounded-[22px] bg-white p-4 ring-1 ring-line">
            <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Symptoms</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{todaysSymptoms.length}</p>
            <p className="mt-1 text-xs text-ink/55">
              {todaysSymptoms.length === 0 ? "A calm day so far" : "Pattern data saved"}
            </p>
          </div>
        </div>
      </Card>

      <WeeklySummary />
      <TriggerCards possibleTriggers={possibleTriggers} safeFoods={safeFoods} />
      <RemindersCard />
      <AccountCard />
      <SeverityChart data={trend} />
    </div>
  );
}
