"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { SeverityChart } from "@/components/charts/severity-chart";
import { PatternGroups } from "@/components/insights/pattern-groups";
import { ReactionSplit } from "@/components/insights/reaction-split";
import { InsightSummaryCards } from "@/components/insights/summary-cards";
import { TriggerTable } from "@/components/insights/trigger-table";
import { useApp } from "@/components/providers/app-provider";

export function InsightsScreen() {
  const { snapshot } = useApp();

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
      <div>
        <p className="text-sm text-ink/55">Insights</p>
        <h1 className="text-[30px] font-semibold leading-tight text-ink">
          Patterns that may explain your discomfort.
        </h1>
      </div>
      <InsightSummaryCards />
      <ReactionSplit />
      <SeverityChart data={trend} title="7 day severity trend" />
      <PatternGroups />
      <TriggerTable />
    </div>
  );
}
