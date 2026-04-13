"use client";

import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function WeeklySummary() {
  const { snapshot, scores } = useApp();
  const trigger = scores.find((score) =>
    ["High suspicion", "Moderate suspicion"].includes(score.classification)
  );

  return (
    <Card className="bg-espresso text-mist">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-mist/65">Weekly summary</p>
          <h2 className="mt-1 text-xl font-semibold">
            You logged {snapshot.meals.length} meals and {snapshot.symptoms.length} symptom events so far.
          </h2>
        </div>
        <ArrowUpRight className="h-5 w-5 text-mist/70" />
      </div>
      <p className="mt-4 text-sm leading-6 text-mist/72">
        {trigger
          ? `Strongest repeat pattern so far: ${trigger.name} showing up before symptoms often enough to be worth testing.`
          : "No strong repeat trigger yet. Consistent logging will make this summary more precise."}
      </p>
    </Card>
  );
}
