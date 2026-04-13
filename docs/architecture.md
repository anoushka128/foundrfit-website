# GutTrigger Architecture And Implementation Plan

## Product principle

Everything in GutTrigger should help answer one question:

What specific foods are most likely causing discomfort?

That means the product is optimized for:

- very fast logging
- clear time relationships between meals and symptoms
- cautious pattern detection
- calm, premium UX that encourages daily use

## Practical stack choice

- Next.js + TypeScript
  Best balance of speed, maintainability, route organization, and Vercel deployment.
- Tailwind CSS
  Lets the UI feel polished quickly without heavy styling overhead.
- Supabase
  Covers auth, Postgres, storage, and row-level security in one service.
- Recharts
  Enough for simple mobile-friendly trend visualizations.

Prisma is intentionally omitted in v1 because it adds another abstraction layer before it is necessary. Supabase SQL plus typed app models is the leaner path to shipping.

## App architecture

### Frontend

- `app/layout.tsx`
  Global shell and metadata.
- `app/page.tsx`
  Dashboard.
- `app/log/page.tsx`
  Fast logging hub.
- `app/check-in/page.tsx`
  Lightweight wellness check-in.
- `app/insights/page.tsx`
  Trigger analysis and summaries.
- `app/timeline/page.tsx`
  Chronological pattern view.
- `app/safety/page.tsx`
  Medical guardrails.
- `app/login/page.tsx`
  Login.
- `app/signup/page.tsx`
  Signup.
- `app/onboarding/page.tsx`
  Onboarding steps.

### Shared UI components

- `components/mobile-shell.tsx`
  Mobile-first viewport and bottom spacing.
- `components/navigation/*`
  Bottom nav and sticky action button.
- `components/ui/*`
  Reusable primitives.
- `components/dashboard/*`
  Dashboard cards and summary modules.
- `components/logging/*`
  Meal, symptom, and check-in capture surfaces.
- `components/insights/*`
  Summaries and scoring table.
- `components/timeline/*`
  Timeline renderer.
- `components/charts/*`
  Recharts wrappers.

### Domain logic

- `lib/types.ts`
  Shared product and analysis types.
- `lib/mock-data.ts`
  Seeded demo data.
- `lib/analysis.ts`
  Trigger scoring and AI-style summary logic.
- `lib/supabase.ts`
  Browser client bootstrap.

### Backend and data

- `supabase/schema.sql`
  Auth-connected relational schema and policies.

## Page structure

### Dashboard

- Hero card
- Today counts
- Quick actions
- Weekly summary
- Possible trigger foods
- Safe foods
- Severity trend chart

### Logging

- Meal logging with quick, medium, and detailed modes
- Symptom capture with timing and severity
- Check-in module

### Insights

- Plain-English summaries
- Trigger score list
- Symptom trends
- Category-specific patterns

### Timeline

- Meals
- Symptoms
- Check-ins
- Bowel movement entries

### Safety

- Clear non-diagnostic disclaimer
- Serious-symptom escalation guidance

## Database model

Main entities:

- User profile
- Onboarding preferences
- Meals
- Meal foods
- Meal ingredients
- Symptoms
- Check-ins
- Reminders
- Analysis results

Design principles:

- ingredients are separated from foods to allow coarse and detailed logging
- analysis results are persisted so they can be recalculated asynchronously later
- row-level security keeps records private to each user

## Trigger analysis engine

Each food or ingredient receives:

- exposure count
- symptom-linked exposure count
- average linked severity
- consistency ratio
- timing score
- confidence score
- weighted score
- classification

### Suggested improvement path

Version 1 uses simple observational scoring. Later versions can add:

- ingredient group rollups
- Bayesian weighting
- meal confounder handling
- restaurant uncertainty multipliers
- symptom-category-specific risk scoring
- elimination and reintroduction experiments

## Build sequence

1. Scaffold core app shell and mobile design system.
2. Define Supabase schema and shared TypeScript domain types.
3. Seed realistic data for believable UI states.
4. Build dashboard, logging, insights, timeline, and safety pages.
5. Implement modular trigger scoring and cautious summary generation.
6. Add real Supabase auth and persistence.
7. Add reminders, uploads, export flows, and experiment modes.
