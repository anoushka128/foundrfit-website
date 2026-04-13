import { MobileShell } from "@/components/mobile-shell";
import { LogScreen } from "@/components/logging/log-screen";

export default function LogPage() {
  return (
    <MobileShell>
      <div className="pb-8">
        <LogScreen />
      </div>
    </MobileShell>
  );
}
