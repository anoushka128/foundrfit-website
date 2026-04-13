import {
  ArrowRight,
  Check,
  CircleHelp,
  Mail,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Users
} from "lucide-react";
import { LogoMark } from "@/components/foundrfit/logo-mark";
import { WaitlistForm } from "@/components/foundrfit/waitlist-form";

const problemPoints = [
  {
    title: "Networking is slow and random",
    icon: Network
  },
  {
    title: "You don’t know who to trust",
    icon: CircleHelp
  },
  {
    title: "You waste time on the wrong people",
    icon: TimerReset
  }
];

const steps = [
  "Create Profile",
  "Get Matched",
  "Connect",
  "Start Building"
];

const benefits = [
  "AI-powered matching",
  "Better co-founder fit",
  "Stronger teams",
  "Higher startup success"
];

const comparison = {
  oldWay: ["Networking platforms", "No compatibility data", "Random connections"],
  foundrFit: ["AI-powered matching", "Verified founders", "Built for outcomes"]
};

const pricingPlans = [
  {
    name: "Basic",
    price: "$0/month",
    description: "A lightweight way to start exploring possible co-founder matches.",
    features: [
      "Limited daily matches",
      "Basic compatibility insights",
      "Limited messaging"
    ]
  },
  {
    name: "Plus",
    price: "$10/month",
    description: "For founders who want deeper insights and more ways to connect.",
    featured: true,
    features: [
      "Unlimited matches",
      "Advanced compatibility insights",
      "Unlimited messaging",
      "See who likes you"
    ]
  },
  {
    name: "Pro",
    price: "$25/month",
    description: "For serious builders who want visibility, trust, and premium access.",
    features: [
      "Everything in Plus",
      "Founder verification badge",
      "Featured placement",
      "Exclusive events"
    ]
  }
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#015aa1]">{children}</p>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden text-slate-900">
      <section id="top" className="mx-auto max-w-7xl px-6 pb-20 pt-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark className="h-11 w-11 shrink-0" />
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-950">FoundrFit</p>
              <p className="text-sm text-slate-500">Founders. Find your Fit.</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]" href="#problem">
              Problem
            </a>
            <a
              className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]"
              href="#how-it-works"
            >
              How it works
            </a>
            <a className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]" href="#pricing">
              Pricing
            </a>
            <a
              href="#contact"
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Join the Waitlist
            </a>
          </nav>
        </header>

        <div className="grid items-center gap-12 pt-14 lg:grid-cols-2 lg:pt-20">
          <div className="min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-[#015aa1] shadow-sm">
              <Users className="h-4 w-4" />
              AI-powered matching for serious founders
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.02]">
              Find the right co-founder faster.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              AI-powered co-founder matching built for serious founders.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#015aa1] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#014a86]"
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Learn How It Works
              </a>
            </div>
          </div>

          <div className="min-w-0 rounded-[2rem] border border-blue-100 bg-white p-6 shadow-2xl shadow-blue-100/70 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950 p-6 text-white sm:col-span-2">
                <p className="text-sm uppercase tracking-[0.18em] text-blue-200">FoundrFit</p>
                <h2 className="mt-3 text-2xl font-semibold">Founders. Find your Fit.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                  Built to help founders move past random networking and toward stronger startup
                  partnerships.
                </p>
              </div>
              <div className="rounded-3xl bg-blue-50 p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#015aa1]/10 text-[#015aa1]">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">Focused matching</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Less noise, better fit</p>
              </div>
              <div className="rounded-3xl bg-green-50 p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#30a045]/10 text-[#30a045]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">Founder quality</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Built for outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <SectionEyebrow>Problem</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Why is finding a co-founder so hard?
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Traditional founder networking is fragmented, inconsistent, and hard to evaluate. A
              great match can take months to find, and the wrong one can slow everything down.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {problemPoints.map((point) => {
              const Icon = point.icon;

              return (
              <article
                key={point.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#015aa1]/10 to-[#30a045]/10 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-base font-medium leading-7 text-slate-700">{point.title}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white/80 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              How FoundrFit Works
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#015aa1] text-base font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="h-px flex-1 bg-slate-200 ml-4" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{step}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {index === 0 && "Set up your background, goals, and startup interests."}
                  {index === 1 && "Receive AI-powered matches based on fit and founder profile data."}
                  {index === 2 && "Reach out to promising matches and start real conversations."}
                  {index === 3 && "Turn strong connections into momentum and start building together."}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Why Founders Choose FoundrFit
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#30a045]/10 text-[#30a045]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-base font-medium text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <SectionEyebrow>Why FoundrFit</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Why FoundrFit vs. the Alternatives
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold text-slate-100">Old Way</h3>
              <div className="mt-6 grid gap-4">
                {comparison.oldWay.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#30a045]/30 bg-gradient-to-br from-[#015aa1]/25 to-[#30a045]/25 p-8">
              <h3 className="text-2xl font-semibold text-white">FoundrFit</h3>
              <div className="mt-6 grid gap-4">
                {comparison.foundrFit.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Pricing
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] border p-8 shadow-sm ${
                plan.featured
                  ? "border-[#015aa1] bg-[#015aa1] text-white shadow-blue-200"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className={`mt-3 text-3xl font-semibold ${plan.featured ? "text-white" : "text-slate-950"}`}>
                    {plan.price}
                  </p>
                </div>
                {plan.featured ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-50">
                    Popular
                  </span>
                ) : null}
              </div>

              <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-blue-50" : "text-slate-600"}`}>
                {plan.description}
              </p>

              <div className="mt-8 grid gap-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.featured ? "bg-white/20 text-white" : "bg-[#30a045]/10 text-[#30a045]"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <p className={plan.featured ? "text-blue-50" : "text-slate-600"}>{feature}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#015aa1] to-[#30a045] px-8 py-14 text-white shadow-2xl shadow-blue-200 sm:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
                <Mail className="h-4 w-4" />
                Join FoundrFit
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your co-founder is out there.
              </h2>
              <p className="mt-4 text-lg leading-8 text-blue-50">Be proactive, not inactive.</p>
            </div>

            <WaitlistForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 px-6 py-8 text-center text-sm text-slate-500 sm:px-10 lg:px-12">
        <div className="flex items-center justify-center gap-3">
          <LogoMark className="h-8 w-8" />
          <p className="font-semibold text-slate-700">FoundrFit</p>
        </div>
        <p className="mt-2">Founders. Find your Fit.</p>
      </footer>
    </main>
  );
}
