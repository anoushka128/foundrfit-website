"use client";

import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { useApp } from "@/components/providers/app-provider";

export function InsightSummaryCards() {
  const { summaries, topSymptoms } = useApp();

  return (
    <div className="space-y-4">
      {summaries.map((summary) => (
        <Card key={summary.title} className="bg-white/95">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink">{summary.title}</h3>
            <Chip
              label={summary.tone === "warning" ? "Take note" : summary.tone === "supportive" ? "Encouraging" : "Observed"}
              tone={summary.tone === "warning" ? "danger" : summary.tone === "supportive" ? "success" : "default"}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/60">{summary.body}</p>
        </Card>
      ))}

      <Card>
        <p className="text-sm text-ink/55">Top symptom categories</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topSymptoms.map((symptom) => (
            <Chip key={symptom.name} label={`${symptom.name} (${symptom.count})`} tone="warm" />
          ))}
        </div>
      </Card>
    </div>
  );
}
