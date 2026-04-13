import { MobileShell } from "@/components/mobile-shell";
import { CheckInForm } from "@/components/logging/checkin-form";

export default function CheckInPage() {
  return (
    <MobileShell>
      <div className="space-y-4 pb-8">
        <CheckInForm />
      </div>
    </MobileShell>
  );
}
