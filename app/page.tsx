import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  Clock3,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { LogoMark } from "@/components/foundrfit/logo-mark";

const problemCards = [
  {
    title: "Networking is slow and random",
    text: "Founders still rely on events, DMs, and weak-intent intros that rarely surface the right partner.",
    icon: Search
  },
  {
    title: "You don’t know who to trust",
    text: "It is hard to evaluate seriousness, working style, and commitment before you invest real time.",
    icon: ShieldCheck
  },
  {
    title: "You waste time on the wrong people",
    text: "Too many conversations look promising at first and fall apart once expectations become clear.",
    icon: Clock3
  }
];

const featureCards = [
  {
    title: "AI compatibility matching",
    text: "Match on skills, personality, and commitment instead of surface-level overlap.",
    icon: BrainCircuit
  },
  {
    title: "Verified, serious founders",
    text: "A higher-signal network built for people who actually want to build something real.",
    icon: BadgeCheck
  },
  {
    title: "Clear fit scoring",
    text: "See where you align before you spend weeks exploring the wrong partnership.",
    icon: Check
  },
  {
    title: "Built-in messaging",
    text: "Start conversations with the context you need to move faster and smarter.",
    icon: MessageSquareText
  }
];

const steps = [
  {
    title: "Create your profile",
    text: "Share your background, goals, strengths, and what you are looking for.",
    icon: Users
  },
  {
    title: "Get matched",
    text: "FoundrFit evaluates compatibility across skills, personality, and commitment.",
    icon: Sparkles
  },
  {
    title: "Connect",
    text: "Reach out to the highest-fit founders with more confidence and context.",
    icon: MessageSquareText
  },
  {
    title: "Start building",
    text: "Move from founder search to actual momentum with a stronger early partnership.",
    icon: ArrowRight
  }
];

const testimonials = [
  {
    quote: "Matched in 4 days — now building a fintech startup together.",
    name: "Maya Chen",
    role: "Student founder",
    category: "Fintech, Boston",
    image: "/public/testimonials/maya-chen.svg".replace("/public", "")
  },
  {
    quote: "The compatibility report showed exactly where we aligned before committing.",
    name: "Arjun Patel",
    role: "First-time founder",
    category: "B2B SaaS, Austin",
    image: "/public/testimonials/arjun-patel.svg".replace("/public", "")
  },
  {
    quote: "Saved me months of trial and error finding the right co-founder.",
    name: "Leah Brooks",
    role: "Solo founder",
    category: "Climate tech, Seattle",
    image: "/public/testimonials/leah-brooks.svg".replace("/public", "")
  }
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    detail: "/month",
    description: "A simple way to create your profile and start exploring early matches.",
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
    description: "For active founders who want better visibility and faster connection.",
    featured: true,
    features: [
      "Unlimited matches",
      "Advanced compatibility scoring",
      "Unlimited messaging",
      "See who liked your profile"
    ]
  },
  {
    name: "Pro",
    price: "$25",
    detail: "/month",
    description: "For founders who want premium access, credibility, and more reach.",
    features: [
      "Everything in Plus",
      "Verified founder badge",
      "Featured profile placement",
      "Exclusive founder events"
    ]
  }
];

function SectionIntro({
  eyebrow,
  title,
  text,
  centered,
  dark,
  compact
}: {
  eyebrow: string;
  title: string;
  text: string;
  centered?: boolean;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${dark ? "text-blue-100" : "text-[#2d678f]"}`}>
        {eyebrow}
      </p>
      <h2 className={`font-semibold tracking-tight sm:text-4xl ${compact ? "mt-3 text-[2.4rem] leading-tight" : "mt-4 text-3xl"} ${dark ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      <p className={`${compact ? "mt-3 text-base leading-7" : "mt-4 text-lg leading-8"} ${dark ? "text-slate-300" : "text-slate-600"}`}>{text}</p>
    </div>
  );
}

function ProductVisual() {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/78 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:max-w-[620px] lg:ml-auto">
      <div className="rounded-[28px] border border-slate-100 bg-[#fbfdff] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Top match</p>
            <h3 className="mt-3 text-[2rem] font-semibold text-slate-950">Compatibility Score</h3>
          </div>
          <div className="rounded-2xl bg-[#edf5ff] p-3 text-[#2d678f]">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-5xl font-semibold tracking-tight text-slate-950">92%</div>
            <p className="mt-2 text-sm text-slate-500">High-fit founder match</p>
          </div>
          <div className="rounded-full bg-[#e6f4ea] px-3 py-1 text-xs font-semibold text-[#2f7a43]">
            Strong alignment
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[
            ["Skills overlap", "94%"],
            ["Personality fit", "91%"],
            ["Commitment level", "92%"]
          ].map(([label, score]) => (
            <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{label}</span>
                <span className="font-semibold text-slate-900">{score}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#3e86b7] to-[#61b56a]"
                  style={{ width: score }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] bg-[#f5f9fc] p-4">
          <p className="text-sm font-medium text-slate-600">Why this match works</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Complementary skill sets", "Aligned ambition", "Compatible working style"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-hidden text-slate-900">
      <section className="relative">
        <div className="hero-mesh calm-hero absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-2 sm:px-10 lg:px-12">
          <header className="flex items-center justify-between py-2">
            <a href="#top" className="flex items-center gap-3">
              <LogoMark className="h-16 w-16 shrink-0" />
              <div>
                <p className="text-xl font-semibold tracking-tight text-slate-950">FoundrFit</p>
                <p className="text-base text-slate-500">AI co-founder matching</p>
              </div>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              <a className="text-sm font-medium text-slate-600 transition hover:text-[#2d678f]" href="#problem">
                Problem
              </a>
              <a className="text-sm font-medium text-slate-600 transition hover:text-[#2d678f]" href="#solution">
                Features
              </a>
              <a className="text-sm font-medium text-slate-600 transition hover:text-[#2d678f]" href="#pricing">
                Pricing
              </a>
              <a
                href="#final-cta"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get Matched
              </a>
            </nav>
          </header>

          <div id="top" className="grid items-center gap-8 pt-2 lg:-mt-2 lg:grid-cols-[1fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-[#2d678f] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Early access for college entrepreneurs and early founders
              </div>

              <h1 className="mt-2 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-[4rem] lg:leading-[1.01]">
                Find the Right Co-Founder in Days
                <span className="text-slate-400"> — </span>
                <span className="bg-gradient-to-r from-[#2d678f] to-[#5ca067] bg-clip-text text-transparent">
                  Not Months
                </span>
              </h1>

              <p className="mt-2 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stop wasting time on the wrong people. Get matched with founders who actually fit.
              </p>

              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#final-cta"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d678f] px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_34px_rgba(45,103,143,0.22)] transition hover:bg-[#255775]"
                >
                  Find My Co-Founder
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-slate-700 backdrop-blur transition hover:border-slate-300 hover:text-slate-950"
                >
                  See How It Works
                </a>
              </div>

              <p className="mt-3 text-sm font-medium text-slate-500">
                Takes 2 minutes to get your first matches
              </p>
            </div>

            <div className="lg:-mt-2">
              <ProductVisual />
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="section-surface-a py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Problem"
            title="Finding the right co-founder shouldn’t be this hard"
            text="The current founder search process is noisy, low-trust, and painfully inefficient. FoundrFit replaces randomness with higher-signal matching."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {problemCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f6fb] text-[#2d678f]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{card.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solution" className="section-surface-b py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Why Founders Choose FoundrFit"
            title="Better founder matching, with less wasted time"
            text="Everything important happens in one place: better matching, higher-signal profiles, clearer fit scoring, and faster conversations."
            centered
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f6fb] text-[#2d678f]">
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

      <section id="how-it-works" className="section-surface-c py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
          <SectionIntro
            eyebrow="How It Works"
            title="A straightforward path from profile to partnership"
            text="Each step is designed to reduce guesswork and help founders move toward stronger matches faster."
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="relative rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2d678f] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                  {index < steps.length - 1 ? (
                    <div className="absolute right-[-18px] top-10 hidden h-px w-9 bg-slate-200 xl:block" />
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Testimonials"
            title="Real founder feedback, not generic social proof"
            text="Early users care about speed, fit clarity, and wasting less time on the wrong conversations."
            dark
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Swap these placeholder portrait assets in /public/testimonials/ with final founder photos when available. */}
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur"
              >
                <p className="text-xl font-semibold leading-8 text-white">“{testimonial.quote}”</p>

                <div className="mt-7 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} headshot`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-300">{testimonial.role}</p>
                    <p className="text-sm text-slate-400">{testimonial.category}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section-surface-a py-12">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Pricing"
            title="Simple plans for founders at every stage"
            text="Free to start, easy to explore, and built to grow with founders who are ready to move faster."
            centered
            compact
          />

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative rounded-[30px] border p-6 shadow-[0_12px_38px_rgba(15,23,42,0.06)] ${
                  plan.featured
                    ? "border-[#2d678f] bg-[#2d678f] text-white"
                  : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                {plan.featured ? (
                  <div className="absolute right-6 top-6">
                    <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2d678f]">
                      Most Popular
                    </span>
                  </div>
                ) : (
                  <div className="h-0" />
                )}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{plan.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl font-semibold">{plan.price}</span>
                      <span className={plan.featured ? "text-blue-100" : "text-slate-500"}>{plan.detail}</span>
                    </div>
                  </div>
                </div>

                <p className={`mt-4 text-sm leading-7 ${plan.featured ? "text-blue-50" : "text-slate-600"}`}>
                  {plan.description}
                </p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                          plan.featured ? "bg-white/20 text-white" : "bg-[#eef6ef] text-[#3f8a4f]"
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
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-white text-[#2d678f] hover:bg-slate-100"
                      : "bg-slate-950 text-white hover:bg-slate-800"
                  }`}
                >
                  Start Matching
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
 
      <section id="final-cta" className="mx-auto max-w-6xl px-6 pb-24 pt-4 sm:px-10 lg:px-12">
        <div className="rounded-[36px] bg-gradient-to-br from-[#2d678f] to-[#5ca067] px-8 py-16 text-white shadow-[0_24px_72px_rgba(45,103,143,0.18)] sm:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-tight">
              Your co-founder is out there — don’t waste months finding them.
            </h2>
            <p className="mt-5 text-lg leading-8 text-blue-50">
              Join early founders building smarter startups with better matches from the start.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#top"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#2d678f] transition hover:bg-slate-100"
              >
                Create My Profile
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View Pricing
              </a>
            </div>
            <p className="mt-5 text-sm text-blue-100">Join early founders building smarter startups</p>
          </div>
        </div>
      </section>
    </main>
  );
}
