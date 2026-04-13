"use client";

import { TimelineList } from "@/components/timeline/timeline-list";

export function TimelineScreen() {
  return (
    <div className="space-y-4 pb-8">
      <div>
        <p className="text-sm text-ink/55">Timeline</p>
        <h1 className="text-[30px] font-semibold leading-tight text-ink">
          See meals, symptoms, check-ins, and bowel habits in one flow.
        </h1>
      </div>
      <TimelineList />
    </div>
  );
}
