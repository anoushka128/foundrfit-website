import Link from "next/link";
import type { Route } from "next";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  cta,
  href
}: {
  title: string;
  description: string;
  cta: string;
  href: Route;
}) {
  return (
    <Card className="text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink/58">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-espresso px-4 text-sm font-medium text-mist shadow-card"
      >
        {cta}
      </Link>
    </Card>
  );
}
