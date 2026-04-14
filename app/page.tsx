import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChartColumnIncreasing,
  Check,
  Clock3,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import { LogoMark } from "@/components/foundrfit/logo-mark";

const problemCards = [
  {
    title: "Networking is slow and random",
    text: "Warm intros and events rarely surface the right operator-builder fit when momentum matters.",
    icon: Search
  },
  {
    title: "You don’t know who to trust",
    text: "Profiles can look great on paper, but commitment and working style are harder to verify.",
    icon: ShieldCheck
  },
  {
    title: "You waste time on the wrong people",
    text: "Founders lose weeks chasing conversations that were never strong matches to begin with.",
    icon: Clock3
  }
];

const featureCards = [
  {
    title: "AI-powered compatibility matching",
    text: "Match on practical founder chemistry, not just surface-level interests.",
    icon: BrainCircuit
  },
  {
    title: "Verified, serious founders",
    text: "Designed for people who are actually ready to build, commit, and move.",
    icon: BadgeCheck
  },
  {
    title: "Deep compatibility scoring",
    text: "Skills, personality, and commitment are weighted into one clear fit score.",
    icon: ChartColumnIncreasing
  },
  {
    title: "Built-in messaging tools",
    text: "Start the conversation instantly with context on why the match makes sense.",
    icon: MessageSquareText
  }
];

const steps = [
  {
    title: "Create your profile",
    text: "Share your background, startup goals, strengths, and what kind of co-founder you need.",
    icon: Users
  },
  {
    title: "Get matched",
    text: "FoundrFit scans compatibility across skills, personality, and founder commitment.",
    icon: Sparkles
  },
  {
    title: "Connect",
    text: "Reach out to high-fit founders with a clearer sense of alignment before you talk.",
    icon: MessageSquareText
  },
  {
    title: "Start building",
    text: "Turn better founder chemistry into faster decisions and stronger startup momentum.",
    icon: ArrowRight
  }
];

const benefits = [
  {
    stat: "Days, not months",
    text: "Find a co-founder faster with higher-signal matching from day one.",
    icon: Clock3
  },
  {
    stat: "Better alignment",
    text: "Reduce founder mismatch by evaluating fit before you invest time.",
    icon: Check
  },
  {
    stat: "Higher upside",
    text: "Stronger co-founder fit gives early teams a better shot at lasting execution.",
    icon: ChartColumnIncreasing
  },
  {
    stat: "Less wasted effort",
    text: "Stop chasing low-fit conversations and focus on the people who actually match.",
    icon: Search
  }
];

const testimonials = [
  {
    quote: "Matched in 4 days — we’re already building.",
    name: "Maya Chen",
    role: "Student founder, fintech",
    initials: "MC"
  },
  {
    quote: "The compatibility report showed exactly where we aligned.",
    name: "Arjun Patel",
    role: "First-time founder, B2B SaaS",
    initials: "AP"
  },
  {
    quote: "This saved me months of trial and error.",
    name: "Leah Brooks",
    role: "Solo founder, climate tech",
    initials: "LB"
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    detail: "/month",
    description: "Perfect for getting started and exploring your first high-fit matches.",
    features: [
      "Create your founder profile",
      "Limited weekly matches",
      "Basic compatibility insights",
      "Starter messaging access"
    ]
  },
  {
    name: "Plus",
    price: "$10",
    detail: "/month",
    description: "For founders actively searching and ready to connect faster.",
    featured: true,
    features: [
      "Unlimited matches",
      "Advanced compatibility reports",
      "Unlimited messaging",
      "See who liked your profile"
    ]
  },
  {
    name: "Pro",
    price: "$25",
    detail: "/month",
    description: "For serious founders who want visibility, trust, and premium access.",
    features: [
      "Everything in Plus",
      "Verified founder badge",
      "Featured profile placement",
      "Exclusive founder events"
    ]
  }
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#015aa1]">
      {children}
    </p>
  );
}

function CompatibilityOrb() {
  return (
    <div className="glass-card floating-card relative overflow-hidden rounded-[28px] border border-white/50 p-5 shadow-[0_24px_80px_rgba(1,90,161,0.18)]">
      <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-gradient-to-r from-[#015aa1]/15 to-[#30a045]/15 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Compatibility
          </p>
          <div className="mt-4 flex items-end gap-2">
            <span className="score-pop text-6xl font-semibold tracking-tight text-slate-950">92%</span>
            <span className="mb-2 rounded-full bg-[#dff4e5] px-3 py-1 text-xs font-semibold text-[#1d7f38]">
              High fit
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-[#eff5ff] p-3 text-[#015aa1]">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {[
          ["Skills overlap", "94%"],
          ["Working style", "90%"],
          ["Commitment level", "92%"]
        ].map(([label, score]) => (
          <div key={label} className="rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>{label}</span>
              <span className="font-semibold text-slate-900">{score}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#015aa1] to-[#30a045]"
                style={{ width: score }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingAvatar({
  name,
  role,
  initials,
  className
}: {
  name: string;
  role: string;
  initials: string;
  className?: string;
}) {
  return (
    <div className={`glass-card absolute rounded-3xl border border-white/60 p-3 shadow-xl ${className ?? ""}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#015aa1] to-[#30a045] text-sm font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function ProductMiniCard({
  title,
  eyebrow,
  children,
  className
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`glass-card rounded-[30px] border border-white/60 p-6 shadow-xl ${className ?? ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">{title}</h3>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden text-slate-900">
      <section className="relative isolate">
        <div className="hero-mesh absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between py-4">
            <a href="#top" className="flex items-center gap-3">
              <LogoMark className="h-12 w-12 shrink-0" />
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-950">FoundrFit</p>
                <p className="text-sm text-slate-500">AI co-founder matching</p>
              </div>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              <a className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]" href="#problem">
                Problem
              </a>
              <a className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]" href="#solution">
                Solution
              </a>
              <a
                className="text-sm font-medium text-slate-600 transition hover:text-[#015aa1]"
                href="#pricing"
              >
                Pricing
              </a>
              <a
                href="#final-cta"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Get Matched
              </a>
            </nav>
          </header>

          <div id="top" className="grid items-center gap-16 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:pt-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-[#015aa1] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                For college entrepreneurs and early-stage founders
              </div>

              <h1 className="mt-7 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]">
                Find the Right Co-Founder in Days
                <span className="bg-gradient-to-r from-[#015aa1] to-[#30a045] bg-clip-text text-transparent">
                  {" "}
                  Not Months
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                AI-powered matching based on skills, personality, and commitment.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#final-cta"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#015aa1] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(1,90,161,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#014a86]"
                >
                  Get Matched
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                >
                  See How It Works
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#30a045]" />
                  AI-powered compatibility
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#30a045]" />
                  Serious founder network
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#30a045]" />
                  Built for startup outcomes
                </div>
              </div>
            </div>

            <div className="relative min-h-[620px]">
              <div className="absolute left-12 top-20 hidden h-px w-28 bg-gradient-to-r from-[#015aa1]/50 to-transparent lg:block" />
              <div className="absolute right-16 top-28 hidden h-px w-24 bg-gradient-to-l from-[#30a045]/50 to-transparent lg:block" />

              <FloatingAvatar
                name="Nina Park"
                role="Product founder"
                initials="NP"
                className="float-slow left-0 top-8 hidden w-[230px] lg:block"
              />
              <FloatingAvatar
                name="Leo Santos"
                role="Technical co-founder"
                initials="LS"
                className="float-slower right-0 top-0 hidden w-[235px] lg:block"
              />
              <FloatingAvatar
                name="Aria Kim"
                role="Growth founder"
                initials="AK"
                className="float-slow bottom-10 left-8 hidden w-[220px] lg:block"
              />

              <div className="mx-auto max-w-[520px] pt-20">
                <CompatibilityOrb />

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <ProductMiniCard eyebrow="Match Reason" title="Founder fit summary">
                    <div className="space-y-3">
                      {[
                        "Complementary skill sets",
                        "Aligned work ethic",
                        "Shared startup ambition"
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between rounded-2xl bg-white/75 px-4 py-3 ring-1 ring-slate-100"
                        >
                          <span className="text-sm text-slate-700">{item}</span>
                          <BadgeCheck className="h-4 w-4 text-[#30a045]" />
                        </div>
                      ))}
                    </div>
                  </ProductMiniCard>

                  <ProductMiniCard eyebrow="Messaging" title="Start the conversation">
                    <div className="space-y-3">
                      <div className="rounded-2xl bg-[#f2f7ff] px-4 py-3 text-sm text-slate-700">
                        You both care about fast execution and B2B SaaS.
                      </div>
                      <div className="ml-8 rounded-2xl bg-[#ebf7ee] px-4 py-3 text-sm text-slate-700">
                        Great. Want to compare product and technical priorities this week?
                      </div>
                      <div className="flex items-center gap-2 pt-2 text-xs font-medium text-[#015aa1]">
                        <MessageSquareText className="h-4 w-4" />
                        Conversation started
                      </div>
                    </div>
                  </ProductMiniCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <SectionEyebrow>Problem</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Finding the right co-founder shouldn’t be this hard
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {problemCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="group rounded-[30px] border border-slate-200 bg-white/75 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(1,90,161,0.12)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#015aa1]/10 to-[#30a045]/10 text-slate-800 transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{card.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="solution" className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(238,246,255,0.72)_100%)]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Solution</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Meet FoundrFit
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="glass-card rounded-[28px] border border-white/60 p-6 shadow-lg transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#015aa1]/10 text-[#015aa1]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            A simple path from profile to partnership
          </h2>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#015aa1] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                {index < steps.length - 1 ? (
                  <div className="hidden xl:block">
                    <div className="absolute right-[-24px] top-10 h-px w-12 bg-gradient-to-r from-[#015aa1]/40 to-[#30a045]/40" />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why founders choose FoundrFit
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.stat}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#8bd5ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{benefit.stat}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <SectionEyebrow>Social Proof</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Early founders already see the difference
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="glass-card rounded-[30px] border border-white/60 p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-1 text-[#f5b83d]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-xl font-semibold leading-8 text-slate-950">
                “{testimonial.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#015aa1] to-[#30a045] text-sm font-semibold text-white">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(1,90,161,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(48,160,69,0.08),transparent_30%)]" />
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
          <div className="max-w-2xl">
            <SectionEyebrow>Product Preview</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Designed to feel like a real founder workflow
            </h2>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[1.05fr_0.95fr_0.95fr]">
            <ProductMiniCard eyebrow="Profile Setup" title="Build your founder profile">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-slate-100">
                  <p className="text-sm font-medium text-slate-500">Looking for</p>
                  <p className="mt-1 font-semibold text-slate-950">Technical co-founder</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Product strategy", "B2B SaaS", "10+ hrs/week", "NYC / remote"].map((tag) => (
                    <div key={tag} className="rounded-2xl bg-[#f6f9fc] px-4 py-3 text-sm text-slate-700">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </ProductMiniCard>

            <ProductMiniCard eyebrow="Matching" title="Review high-fit founders">
              <div className="space-y-3">
                {[
                  ["Ariana M.", "92% match"],
                  ["Daniel S.", "88% match"],
                  ["Ibrahim R.", "86% match"]
                ].map(([name, score], index) => (
                  <div key={name} className="rounded-2xl bg-white/80 p-4 ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#015aa1] to-[#30a045] text-xs font-semibold text-white">
                          {name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{name}</p>
                          <p className="text-xs text-slate-500">Stage-compatible founder</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          index === 0
                            ? "bg-[#dff4e5] text-[#1d7f38]"
                            : "bg-[#eef4ff] text-[#015aa1]"
                        }`}
                      >
                        {score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ProductMiniCard>

            <ProductMiniCard eyebrow="Messaging" title="Start high-context conversations">
              <div className="space-y-3">
                <div className="rounded-2xl bg-[#f3f8ff] px-4 py-3 text-sm text-slate-700">
                  We both care about fast MVP shipping and complementary roles.
                </div>
                <div className="ml-6 rounded-2xl bg-[#edf8ef] px-4 py-3 text-sm text-slate-700">
                  I can lead product and GTM if you own engineering.
                </div>
                <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-100">
                  Want to do a 20-minute founder fit call this week?
                </div>
              </div>
            </ProductMiniCard>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Start free, upgrade when you’re ready
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[32px] border p-8 shadow-lg transition duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-[#015aa1] bg-gradient-to-br from-[#015aa1] to-[#0e6dbb] text-white shadow-[0_24px_70px_rgba(1,90,161,0.22)]"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-semibold">{plan.price}</span>
                    <span className={plan.featured ? "text-blue-100" : "text-slate-500"}>{plan.detail}</span>
                  </div>
                </div>
                {plan.featured ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <p className={`mt-5 text-sm leading-7 ${plan.featured ? "text-blue-50" : "text-slate-600"}`}>
                {plan.description}
              </p>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.featured ? "bg-white/20 text-white" : "bg-[#30a045]/10 text-[#30a045]"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <p className={plan.featured ? "text-blue-50" : "text-slate-700"}>{feature}</p>
                  </div>
                ))}
              </div>

              <a
                href="#final-cta"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-[#015aa1] hover:bg-slate-100"
                    : "bg-slate-950 text-white hover:bg-slate-800"
                }`}
              >
                Start Free
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="final-cta" className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-10 lg:px-12">
        <div className="overflow-hidden rounded-[36px] bg-gradient-to-br from-[#015aa1] via-[#0b6eb6] to-[#30a045] px-8 py-16 text-white shadow-[0_30px_90px_rgba(1,90,161,0.28)] sm:px-12">
          <div className="absolute" />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
                Final CTA
              </p>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-tight">
                Your co-founder is out there — don’t waste months finding them.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-blue-50">
                Join early founders building smarter startups with better matches from the start.
              </p>
            </div>

            <div className="glass-card rounded-[30px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <div className="rounded-[24px] bg-white p-6 text-slate-900 shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#015aa1]">
                  Create Profile
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Start your founder search</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Share your details and get ready to unlock smarter founder matching.
                </p>

                <form className="mt-6 grid gap-4">
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#015aa1] focus:ring-4 focus:ring-[#015aa1]/10"
                    placeholder="Your name"
                  />
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#015aa1] focus:ring-4 focus:ring-[#015aa1]/10"
                    placeholder="Email address"
                    type="email"
                  />
                  <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#015aa1] focus:ring-4 focus:ring-[#015aa1]/10">
                    <option>Looking for a technical co-founder</option>
                    <option>Looking for a business co-founder</option>
                    <option>Exploring founder matches</option>
                  </select>
                  <button
                    className="rounded-full bg-[#015aa1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#014a86]"
                    type="button"
                  >
                    Create Your Profile
                  </button>
                </form>

                <p className="mt-4 text-xs text-slate-500">
                  Join early founders building smarter startups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
