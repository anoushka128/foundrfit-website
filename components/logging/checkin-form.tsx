"use client";

import { FormEvent, useState } from "react";
import { MoonStar, Smile, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/providers/app-provider";

export function CheckInForm() {
  const { addCheckIn } = useApp();
  const [feeling, setFeeling] = useState("");
  const [energyLevel, setEnergyLevel] = useState(7);
  const [symptomsPresent, setSymptomsPresent] = useState(false);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [cravings, setCravings] = useState("");
  const [stressLevel, setStressLevel] = useState(4);
  const [bowelMovementToday, setBowelMovementToday] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const result = await addCheckIn({
      loggedAt: new Date().toISOString(),
      feeling,
      symptomsPresent,
      energyLevel,
      cravings,
      bowelMovementToday,
      stressLevel,
      sleepHours
    });
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Check-in saved.");
    setFeeling("");
    setCravings("");
  }

  return (
    <Card>
      <p className="text-sm text-ink/55">Check-in</p>
      <h2 className="text-lg font-semibold text-ink">A quick snapshot of how you feel</h2>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="How do you feel right now?"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
        />
        <div className="grid grid-cols-3 gap-3">
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            <Smile className="mb-2 h-4 w-4 text-ink" />
            Energy
            <input
              className="mt-2 w-full"
              type="range"
              min={1}
              max={10}
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
            />
          </label>
          <button
            type="button"
            onClick={() => setSymptomsPresent(!symptomsPresent)}
            className={`rounded-2xl p-3 text-left text-xs ${
              symptomsPresent ? "bg-espresso text-mist" : "bg-sand/60 text-ink/60"
            }`}
          >
            <Stethoscope className="mb-2 h-4 w-4" />
            Symptoms
          </button>
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            <MoonStar className="mb-2 h-4 w-4 text-ink" />
            Sleep
            <input
              className="mt-2 w-full"
              type="number"
              min={0}
              max={14}
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
            />
          </label>
        </div>
        <Input placeholder="Cravings" value={cravings} onChange={(e) => setCravings(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <label className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">
            Stress level
            <input
              className="mt-2 w-full"
              type="range"
              min={1}
              max={10}
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
            />
          </label>
          <button
            type="button"
            onClick={() => setBowelMovementToday(!bowelMovementToday)}
            className={`rounded-2xl px-4 py-3 text-left text-sm ${
              bowelMovementToday ? "bg-espresso text-mist" : "border border-line bg-white text-ink"
            }`}
          >
            Bowel movement today
            <p className="mt-2 text-xs opacity-75">{bowelMovementToday ? "Yes" : "Not yet"}</p>
          </button>
        </div>
        {error ? <p className="text-sm text-[#9f4135]">{error}</p> : null}
        {message ? <p className="text-sm text-moss">{message}</p> : null}
        <Button className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save check-in"}
        </Button>
      </form>
    </Card>
  );
}
