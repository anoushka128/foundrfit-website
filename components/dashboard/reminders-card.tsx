"use client";

import { BellRing } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useApp } from "@/components/providers/app-provider";

export function RemindersCard() {
  const { snapshot, toggleReminder } = useApp();

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sand text-ink">
          <BellRing className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-ink/55">Reminders</p>
          <h2 className="text-lg font-semibold text-ink">Gentle prompts that support consistency</h2>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {snapshot.reminders.map((reminder) => (
          <div key={reminder.id} className="flex items-center justify-between rounded-[22px] bg-sand/50 p-4">
            <div>
              <p className="text-sm font-medium text-ink">{reminder.label}</p>
              <p className="text-xs text-ink/50">{reminder.time}</p>
            </div>
            <button
              type="button"
              onClick={() => void toggleReminder(reminder.id)}
              className={`h-7 w-12 rounded-full p-1 transition-colors ${
                reminder.enabled ? "bg-espresso" : "bg-oat"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-white transition-transform ${
                  reminder.enabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
