"use client";

import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function HeroCard() {
  const { snapshot, mode } = useApp();

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white via-sand/70 to-sage/30">
      <div className="mb-4 inline-flex rounded-full bg-white/80 p-2 text-moss">
        <Sparkles className="h-5 w-5" />
      </div>
      <p className="text-sm text-ink/60">
        Good afternoon, {snapshot.profile.name}
        {mode === "demo" ? " · Demo mode" : ""}
      </p>
      <h1 className="mt-1 text-[28px] font-semibold leading-tight text-ink">
        Gentle tracking that helps answer what foods may be setting you off.
      </h1>
      <p className="mt-3 text-sm leading-6 text-ink/65">
        Keep today light. A few quick logs can sharpen your trigger patterns over time.
      </p>
    </Card>
  );
}
