import { PropsWithChildren } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingLogButton } from "@/components/navigation/floating-log-button";

export function MobileShell({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-wellness-glow pb-28">
      <div className="px-4 pt-6">{children}</div>
      <FloatingLogButton />
      <BottomNav />
    </div>
  );
}
