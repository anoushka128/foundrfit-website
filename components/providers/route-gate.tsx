"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/components/providers/app-provider";

const publicRoutes = new Set(["/", "/login", "/signup"]);

export function RouteGate({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const { authLoading, initialized, isAuthenticated, snapshot } = useApp();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authLoading || !initialized) return;

    const isPublic = publicRoutes.has(pathname);
    const isOnboarding = pathname === "/onboarding";

    if (!isAuthenticated && !isPublic) {
      setRedirecting(true);
      router.replace("/login");
      return;
    }

    if (isAuthenticated && !snapshot.onboardingCompleted && (isPublic || !isOnboarding)) {
      setRedirecting(true);
      router.replace("/onboarding");
      return;
    }

    if (isAuthenticated && snapshot.onboardingCompleted && (pathname === "/login" || pathname === "/signup" || pathname === "/onboarding")) {
      setRedirecting(true);
      router.replace("/");
      return;
    }
    setRedirecting(false);
  }, [authLoading, initialized, isAuthenticated, pathname, router, snapshot.onboardingCompleted]);

  return (
    <>
      {redirecting ? (
        <div className="fixed inset-x-0 top-0 z-[100] mx-auto max-w-md px-4 pt-4">
          <div className="rounded-full bg-white/90 px-4 py-2 text-center text-xs text-ink/60 shadow-card backdrop-blur">
            Redirecting...
          </div>
        </div>
      ) : null}
      {children}
    </>
  );
}
