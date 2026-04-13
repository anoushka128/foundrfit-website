"use client";

import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { useApp } from "@/components/providers/app-provider";
import { formatPercent } from "@/lib/utils";

export function TriggerTable() {
  const { scores } = useApp();

  return (
    <Card>
      <p className="text-sm text-ink/55">Trigger scoring model</p>
      <h2 className="text-lg font-semibold text-ink">Food and ingredient suspicion levels</h2>
      <div className="mt-4 space-y-3">
        {scores.slice(0, 8).map((score) => (
          <div key={score.name} className="rounded-[22px] border border-line p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium capitalize text-ink">{score.name}</p>
                <p className="mt-1 text-sm text-ink/55">
                  {score.symptomLinkedExposures} symptom-linked exposures out of {score.exposures}
                </p>
              </div>
              <Chip
                label={score.classification}
                tone={
                  score.classification === "High suspicion"
                    ? "danger"
                    : score.classification === "Probably safe"
                      ? "success"
                      : "default"
                }
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-ink/55">
              <div>Severity: {score.avgSeverity.toFixed(1)}/10</div>
              <div>Consistency: {formatPercent(score.consistency)}</div>
              <div>Confidence: {formatPercent(score.confidence)}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
