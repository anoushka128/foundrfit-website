"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckInForm } from "@/components/logging/checkin-form";
import { MealForm } from "@/components/logging/meal-form";
import { SymptomForm } from "@/components/logging/symptom-form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LogScreen() {
  const params = useSearchParams();
  const initial = params.get("type");
  const [active, setActive] = useState(initial === "symptom" || initial === "checkin" ? initial : "meal");

  return (
    <div className="space-y-4">
      <Card className="p-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "meal", label: "Meal" },
            { id: "symptom", label: "Symptom" },
            { id: "checkin", label: "Check-In" }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                active === item.id ? "bg-espresso text-mist" : "text-ink/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      {active === "meal" ? <MealForm /> : null}
      {active === "symptom" ? <SymptomForm /> : null}
      {active === "checkin" ? <CheckInForm /> : null}
    </div>
  );
}
