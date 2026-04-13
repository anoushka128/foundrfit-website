import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { meals, symptoms } from "@/lib/mock-data";

const todayKey = format(new Date(), "yyyy-MM-dd");

const todaysMeals = meals.filter((meal) => meal.loggedAt.startsWith(todayKey));
const todaysSymptoms = symptoms.filter((symptom) => symptom.startedAt.startsWith(todayKey));

export function TodayOverview() {
  return (
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
          <p className="mt-1 text-xs text-ink/55">Breakfast and lunch captured</p>
        </div>
        <div className="rounded-[22px] bg-white p-4 ring-1 ring-line">
          <p className="text-xs uppercase tracking-[0.18em] text-ink/40">Symptoms</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{todaysSymptoms.length}</p>
          <p className="mt-1 text-xs text-ink/55">Mostly mild so far</p>
        </div>
      </div>
    </Card>
  );
}
