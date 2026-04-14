"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Clock3, Home, type LucideIcon, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/", label: "Insights", icon: BarChart3 },
  { href: "/", label: "Timeline", icon: Clock3 },
  { href: "/", label: "Safety", icon: ShieldAlert }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md border-t border-white/80 bg-mist/95 px-3 pb-5 pt-3 backdrop-blur-md">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] font-medium",
                active ? "bg-white text-ink shadow-card" : "text-ink/55"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
