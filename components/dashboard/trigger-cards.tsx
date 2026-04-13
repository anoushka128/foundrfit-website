import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

type TriggerCardRow = {
  name: string;
  exposures: number;
  symptomLinkedExposures: number;
  linkedSymptoms: string[];
  classification: string;
};

export function TriggerCards({
  possibleTriggers,
  safeFoods
}: {
  possibleTriggers: TriggerCardRow[];
  safeFoods: { name: string }[];
}) {
  return (
    <div className="grid gap-4">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink/55">Possible trigger foods</p>
            <h2 className="text-lg font-semibold text-ink">Worth testing carefully</h2>
          </div>
          <Chip label="Cautious" tone="warm" />
        </div>
        <div className="mt-4 space-y-3">
          {possibleTriggers.length > 0 ? (
            possibleTriggers.slice(0, 3).map((score) => (
              <div key={score.name} className="rounded-[22px] bg-sand/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium capitalize text-ink">{score.name}</p>
                  <Chip label={score.classification} tone="danger" />
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/60">
                  Seen in {score.exposures} meals, with symptoms after {score.symptomLinkedExposures}. Most linked to{" "}
                  {score.linkedSymptoms.slice(0, 2).join(" and ")}.
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm leading-6 text-ink/55">
              No strong food pattern yet. More repeat observations will make this card sharper.
            </p>
          )}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink/55">Safe foods</p>
            <h2 className="text-lg font-semibold text-ink">Calmer patterns so far</h2>
          </div>
          <Chip label="Early signal" tone="success" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {safeFoods.length > 0 ? (
            safeFoods.map((score) => <Chip key={score.name} label={score.name} tone="success" />)
          ) : (
            <p className="text-sm text-ink/55">
              No clearly safe foods yet. More repeat logging helps this card become useful.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
