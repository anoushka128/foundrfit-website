import { Suspense } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { LogScreen } from "@/components/logging/log-screen";

export default function LogPage() {
  return (
    <MobileShell>
      <div className="pb-8">
        <Suspense fallback={<div className="rounded-3xl bg-white p-4 text-sm text-slate-500">Loading log tools...</div>}>
          <LogScreen />
        </Suspense>
      </div>
    </MobileShell>
  );
}
