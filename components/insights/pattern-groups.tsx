"use client";

import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { useApp } from "@/components/providers/app-provider";
import { SymptomCategory, TriggerScore } from "@/lib/types";

function bySymptom(target: SymptomCategory, scores: TriggerScore[]) {
  return scores.filter((score) => score.linkedSymptoms.includes(target)).slice(0, 3);
}

export function PatternGroups() {
  const { scores } = useApp();
  const bloating = bySymptom("bloating", scores);
  const pain = bySymptom("stomach pain", scores);
  const fatigue = bySymptom("fatigue", scores);
  const safeFoods = scores.filter((score) => score.classification === "Probably safe").slice(0, 4);

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-2">
          <Chip label="7 / 30 / 90 days" />
          <p className="text-sm text-ink/55">Trend filters ready for expansion</p>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-ink/55">Foods linked to bloating</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {bloating.map((item) => (
            <Chip key={item.name} label={item.name} tone="warm" />
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm text-ink/55">Foods linked to pain</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {pain.map((item) => (
            <Chip key={item.name} label={item.name} tone="warm" />
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm text-ink/55">Foods linked to fatigue</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {fatigue.map((item) => (
            <Chip key={item.name} label={item.name} tone="warm" />
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-sm text-ink/55">Foods with calmer repeat exposures</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {safeFoods.map((item) => (
            <Chip key={item.name} label={item.name} tone="success" />
          ))}
        </div>
      </Card>
    </div>
  );
}
