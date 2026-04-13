"use client";

import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function TimelineList() {
  const { snapshot } = useApp();
  const timelineItems = [
    ...snapshot.meals.map((meal) => ({ type: "Meal", title: meal.title, date: meal.loggedAt, detail: meal.mealType })),
    ...snapshot.symptoms.map((symptom) => ({
      type: "Symptom",
      title: symptom.categories.join(", "),
      date: symptom.startedAt,
      detail: `Severity ${symptom.severity}`
    })),
    ...snapshot.checkIns.map((checkIn) => ({
      type: "Check-in",
      title: checkIn.feeling,
      date: checkIn.loggedAt,
      detail: `Energy ${checkIn.energyLevel}/10`
    })),
    ...snapshot.checkIns
      .filter((checkIn) => checkIn.bowelMovementToday)
      .map((checkIn) => ({
        type: "Bowel movement",
        title: "Bowel movement reported",
        date: checkIn.loggedAt,
        detail: "Logged during check-in"
      }))
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-4">
      {timelineItems.map((item, index) => (
        <div key={`${item.type}-${index}`} className="relative pl-6">
          <div className="absolute left-[9px] top-8 h-full w-px bg-line" />
          <div className="absolute left-0 top-2 h-5 w-5 rounded-full bg-espresso ring-4 ring-sand" />
          <Card>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-ink/40">{item.type}</p>
              <p className="text-xs text-ink/45">{format(new Date(item.date), "MMM d, h:mm a")}</p>
            </div>
            <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-sm text-ink/55">{item.detail}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}
