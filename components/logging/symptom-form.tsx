"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { useApp } from "@/components/providers/app-provider";
import { SymptomCategory, SymptomTiming } from "@/lib/types";

const symptomOptions = [
  "bloating",
  "stomach pain",
  "gas",
  "nausea",
  "reflux",
  "diarrhea",
  "constipation",
  "fatigue",
  "brain fog",
  "itching",
  "rash",
  "headache",
  "swelling",
  "throat tightness",
  "wheezing",
  "trouble breathing",
  "swelling of lips/tongue",
  "fainting",
  "severe rash",
  "other"
];

export function SymptomForm() {
  const { addSymptom } = useApp();
  const [startedAt, setStartedAt] = useState(new Date().toISOString().slice(0, 16));
  const [selected, setSelected] = useState<SymptomCategory[]>(["bloating"]);
  const [severity, setSeverity] = useState(4);
  const [duration, setDuration] = useState("1 hour");
  const [timing, setTiming] = useState<SymptomTiming>("within 1 hour");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAlert("");
    setMessage("");
    const result = await addSymptom({
      startedAt: new Date(startedAt).toISOString(),
      severity,
      categories: selected,
      duration,
      notes,
      timing
    });
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Symptom logged.");
    if (result.alert) setAlert(result.alert);
    setNotes("");
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/55">Symptom log</p>
          <h2 className="text-lg font-semibold text-ink">Capture the important details quickly</h2>
        </div>
        <Chip label="1-10 severity" tone="warm" />
      </div>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-ink/55">When did it start?</span>
          <input
            className="h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink outline-none"
            type="datetime-local"
            value={startedAt}
            onChange={(e) => setStartedAt(e.target.value)}
          />
        </label>
        <div className="rounded-[24px] bg-sand/55 p-4">
          <p className="mb-3 text-sm font-medium text-ink">Common symptom tags</p>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="border-0 bg-transparent p-0"
                onClick={() =>
                  setSelected((current) =>
                    current.includes(option as SymptomCategory)
                      ? current.filter((item) => item !== option)
                      : [...current, option as SymptomCategory]
                  )
                }
              >
                <Chip
                  label={option}
                  tone={selected.includes(option as SymptomCategory) ? "warm" : "default"}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">
            Severity
            <input
              className="mt-2 w-full"
              type="range"
              min={1}
              max={10}
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
            />
            <span className="text-xs text-ink/55">{severity}/10</span>
          </label>
          <label className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink">
            Timing
            <select
              className="mt-2 w-full border-0 bg-transparent outline-none"
              value={timing}
              onChange={(e) => setTiming(e.target.value as SymptomTiming)}
            >
              <option value="immediately">Immediately</option>
              <option value="within 1 hour">Within 1 hour</option>
              <option value="within 2-4 hours">Within 2-4 hours</option>
              <option value="later that day">Later that day</option>
              <option value="next morning">Next morning</option>
            </select>
          </label>
        </div>
        <Input placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div className="rounded-2xl bg-[#f8edea] p-4 text-sm leading-6 text-[#7c4238]">
          <div className="mb-2 flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            Safety guardrail
          </div>
          If you log throat tightness, wheezing, trouble breathing, fainting, or swelling of lips or tongue,
          show a calm urgent-care alert right away.
        </div>
        {error ? <p className="text-sm text-[#9f4135]">{error}</p> : null}
        {message ? <p className="text-sm text-moss">{message}</p> : null}
        {alert ? <p className="text-sm font-medium text-[#9f4135]">{alert}</p> : null}
        <Button className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save symptom"}
        </Button>
      </form>
    </Card>
  );
}
