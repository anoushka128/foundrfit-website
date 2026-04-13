import Link from "next/link";
import type { Route } from "next";
import { ClipboardCheck, type LucideIcon, PlusCircle, Salad } from "lucide-react";
import { Card } from "@/components/ui/card";

const actions: { href: Route; label: string; icon: LucideIcon; caption: string }[] = [
  { href: "/log?type=meal" as Route, label: "Log Meal", icon: Salad, caption: "Under 30 seconds" },
  { href: "/log?type=symptom" as Route, label: "Log Symptom", icon: PlusCircle, caption: "Severity + timing" },
  { href: "/check-in", label: "Check In", icon: ClipboardCheck, caption: "How you feel now" }
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.label} href={action.href as Route}>
            <Card className="h-full rounded-[24px] p-4 text-center">
              <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sand text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-ink">{action.label}</p>
              <p className="mt-1 text-xs leading-5 text-ink/50">{action.caption}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
