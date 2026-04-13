"use client";

import { RotateCcw, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/providers/app-provider";
import { resetDemoData } from "@/lib/local-store";

export function AccountCard() {
  const router = useRouter();
  const { mode, snapshot, signOut } = useApp();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  function handleResetDemo() {
    resetDemoData();
    window.location.href = "/login";
  }

  return (
    <Card>
      <p className="text-sm text-ink/55">Account</p>
      <h2 className="text-lg font-semibold text-ink">{snapshot.profile.email}</h2>
      <p className="mt-2 text-sm text-ink/55">
        {mode === "demo"
          ? "Demo mode stores your progress in this browser so you can test the flow like a real app."
          : "Live mode is connected to Supabase."}
      </p>
      <div className="mt-4 flex gap-3">
        <Button type="button" variant="secondary" className="flex-1" onClick={() => void handleSignOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
        {mode === "demo" ? (
          <Button type="button" variant="ghost" className="flex-1" onClick={handleResetDemo}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset demo
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
