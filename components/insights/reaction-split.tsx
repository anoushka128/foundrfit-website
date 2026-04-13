"use client";

import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

const digestiveSignals = [
  "bloating",
  "stomach pain",
  "gas",
  "nausea",
  "reflux",
  "diarrhea",
  "constipation"
];
const allergySignals = ["itching", "rash", "swelling", "throat tightness", "wheezing", "trouble breathing"];

export function ReactionSplit() {
  const { snapshot } = useApp();
  const digestiveCount = snapshot.symptoms.filter((entry) =>
    entry.categories.some((category) => digestiveSignals.includes(category))
  ).length;
  const allergyLikeCount = snapshot.symptoms.filter((entry) =>
    entry.categories.some((category) => allergySignals.includes(category))
  ).length;

  return (
    <Card>
      <p className="text-sm text-ink/55">Reaction pattern split</p>
      <h2 className="text-lg font-semibold text-ink">Digestive intolerance vs allergy-like signals</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[22px] bg-sand/65 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Digestive pattern</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{digestiveCount}</p>
          <p className="mt-1 text-xs text-ink/55">Most events so far are digestive-type symptoms.</p>
        </div>
        <div className="rounded-[22px] bg-white p-4 ring-1 ring-line">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Allergy-like pattern</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{allergyLikeCount}</p>
          <p className="mt-1 text-xs text-ink/55">Track closely, especially when symptoms happen quickly.</p>
        </div>
      </div>
    </Card>
  );
}
