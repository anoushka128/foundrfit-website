create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  main_goal text not null,
  common_symptoms text[] not null default '{}',
  suspected_foods text[] not null default '{}',
  known_allergies text[] not null default '{}',
  dietary_restrictions text[] not null default '{}',
  reminders_enabled boolean not null default false,
  meals_per_day int not null default 3,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  logged_at timestamptz not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  portion_size text not null check (portion_size in ('light', 'regular', 'large')),
  location text not null check (location in ('home', 'restaurant', 'other')),
  notes text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists meal_foods (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references meals(id) on delete cascade,
  name text not null,
  category_tags text[] not null default '{}'
);

create table if not exists meal_ingredients (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references meals(id) on delete cascade,
  name text not null,
  quantity text,
  category_tags text[] not null default '{}'
);

create table if not exists symptoms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  started_at timestamptz not null,
  severity int not null check (severity between 1 and 10),
  categories text[] not null default '{}',
  duration text,
  notes text,
  timing_bucket text not null check (timing_bucket in ('immediately', 'within 1 hour', 'within 2-4 hours', 'later that day', 'next morning')),
  created_at timestamptz not null default now()
);

create table if not exists check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  logged_at timestamptz not null,
  feeling text,
  symptoms_present boolean not null default false,
  energy_level int check (energy_level between 1 and 10),
  cravings text,
  bowel_movement_today boolean,
  stress_level int check (stress_level between 1 and 10),
  sleep_hours numeric(4,1)
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  label text not null,
  reminder_time time not null,
  enabled boolean not null default true,
  trigger_after_meal_type text,
  trigger_delay_minutes int
);

create table if not exists analysis_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  subject_name text not null,
  subject_type text not null check (subject_type in ('food', 'ingredient', 'category')),
  exposures int not null default 0,
  symptom_linked_exposures int not null default 0,
  average_severity numeric(4,2) not null default 0,
  consistency numeric(4,2) not null default 0,
  time_pattern_score numeric(4,2) not null default 0,
  confidence_score numeric(4,2) not null default 0,
  weighted_score numeric(4,2) not null default 0,
  classification text not null,
  linked_symptoms text[] not null default '{}',
  summary text,
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table onboarding_preferences enable row level security;
alter table meals enable row level security;
alter table meal_foods enable row level security;
alter table meal_ingredients enable row level security;
alter table symptoms enable row level security;
alter table check_ins enable row level security;
alter table reminders enable row level security;
alter table analysis_results enable row level security;

create policy "users manage own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "users manage own onboarding" on onboarding_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own meals" on meals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own meal foods" on meal_foods
  for all using (
    exists (
      select 1 from meals
      where meals.id = meal_foods.meal_id and meals.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from meals
      where meals.id = meal_foods.meal_id and meals.user_id = auth.uid()
    )
  );

create policy "users manage own meal ingredients" on meal_ingredients
  for all using (
    exists (
      select 1 from meals
      where meals.id = meal_ingredients.meal_id and meals.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from meals
      where meals.id = meal_ingredients.meal_id and meals.user_id = auth.uid()
    )
  );

create policy "users manage own symptoms" on symptoms
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own checkins" on check_ins
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own reminders" on reminders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users manage own analysis" on analysis_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
