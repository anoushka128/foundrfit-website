"use client";

import { AlertTriangle, HeartPulse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function SafetyScreen() {
  const { safetyAlert } = useApp();

  return (
    <div className="space-y-4 pb-8">
      <Card className="bg-white">
        <div className="mb-4 inline-flex rounded-full bg-[#f7e6e2] p-3 text-[#8f372c]">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm text-ink/55">Safety</p>
        <h1 className="text-[28px] font-semibold leading-tight text-ink">
          GutTrigger is for tracking patterns, not medical diagnosis.
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink/60">
          Use this app to notice patterns worth discussing with a clinician. It should not replace urgent care,
          allergy evaluation, or treatment decisions.
        </p>
      </Card>

      <Card className="bg-[#fff8f6]">
        <div className="mb-3 inline-flex rounded-full bg-white p-3 text-[#8f372c]">
          <HeartPulse className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-ink">When to seek immediate help</h2>
        <p className="mt-3 text-sm leading-6 text-ink/60">
          If you have throat tightness, wheezing, trouble breathing, swelling of your lips or tongue, fainting, or a
          severe rash, seek medical attention immediately.
        </p>
        {safetyAlert ? (
          <div className="mt-4 rounded-[22px] bg-[#f7e1db] p-4 text-sm font-medium leading-6 text-[#7c4238]">
            {safetyAlert}
          </div>
        ) : (
          <div className="mt-4 rounded-[22px] bg-white p-4 text-sm leading-6 text-ink/55">
            No serious reaction-type symptoms are currently flagged in your logs.
          </div>
        )}
      </Card>
    </div>
  );
}
