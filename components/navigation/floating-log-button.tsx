"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export function FloatingLogButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-24 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-mist shadow-soft"
      aria-label="Quick log"
    >
      <Plus className="h-6 w-6" />
    </Link>
  );
}
