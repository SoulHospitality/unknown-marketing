-- UNKNOWN Marketing Solution — Supabase schema
-- Run in Supabase SQL editor when credentials are ready.

create extension if not exists "pgcrypto";

-- Projects / case studies
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client text not null,
  industry text not null,
  services text[] default '{}',
  filters text[] default '{}',
  cover_image text,
  challenge text,
  objective text,
  strategy text,
  idea text,
  execution text,
  results jsonb default '[]',
  gallery text[] default '{}',
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  short_description text,
  description text,
  offerings text[] default '{}',
  process text[] default '{}',
  faqs jsonb default '[]',
  published boolean default true,
  sort_order int default 0
);

create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  capabilities text[] default '{}',
  visual text,
  published boolean default true
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  category text,
  cover_image text,
  author text,
  date date,
  content text,
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  bio text,
  photo text,
  sort_order int default 0,
  published boolean default true
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  logo text,
  published boolean default true
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text,
  position text,
  company text,
  published boolean default true
);

create table if not exists site_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  verified boolean default false,
  sort_order int default 0
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  industry text,
  website text,
  location text,
  needs text[] default '{}',
  description text,
  budget text,
  timeline text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text,
  location text,
  type text,
  description text,
  open boolean default true
);

-- RLS
alter table projects enable row level security;
alter table services enable row level security;
alter table industries enable row level security;
alter table articles enable row level security;
alter table team_members enable row level security;
alter table clients enable row level security;
alter table testimonials enable row level security;
alter table site_stats enable row level security;
alter table inquiries enable row level security;
alter table jobs enable row level security;

-- Public read for published content
create policy "Public read projects" on projects for select using (published = true);
create policy "Public read services" on services for select using (published = true);
create policy "Public read industries" on industries for select using (published = true);
create policy "Public read articles" on articles for select using (published = true);
create policy "Public read team" on team_members for select using (published = true);
create policy "Public read clients" on clients for select using (published = true);
create policy "Public read testimonials" on testimonials for select using (published = true);
create policy "Public read stats" on site_stats for select using (verified = true);
create policy "Public read jobs" on jobs for select using (open = true);

-- Anyone can submit inquiries
create policy "Public insert inquiries" on inquiries for insert with check (true);

-- Authenticated admins full access
create policy "Admin all projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admin all services" on services for all using (auth.role() = 'authenticated');
create policy "Admin all industries" on industries for all using (auth.role() = 'authenticated');
create policy "Admin all articles" on articles for all using (auth.role() = 'authenticated');
create policy "Admin all team" on team_members for all using (auth.role() = 'authenticated');
create policy "Admin all clients" on clients for all using (auth.role() = 'authenticated');
create policy "Admin all testimonials" on testimonials for all using (auth.role() = 'authenticated');
create policy "Admin all stats" on site_stats for all using (auth.role() = 'authenticated');
create policy "Admin all inquiries" on inquiries for all using (auth.role() = 'authenticated');
create policy "Admin all jobs" on jobs for all using (auth.role() = 'authenticated');
