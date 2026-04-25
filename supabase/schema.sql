-- ============================================================
-- Sandesh AI — Database Schema (with Integrations)
-- ============================================================

create extension if not exists "uuid-ossp";

drop table if exists messages cascade;
drop table if exists conversations cascade;
drop table if exists usage cascade;
drop table if exists integrations cascade;
drop table if exists users cascade;

-- ============================================================
-- USERS
-- ============================================================
create table users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  plan        text not null default 'free'
                check (plan in ('free', 'starter', 'growth')),
  replies_used integer not null default 0,
  created_at  timestamptz not null default now(),
  
  -- AI Persona & Settings
  business_name text,
  services      text,
  pricing_info  text,
  tone          text default 'professional' check (tone in ('friendly', 'professional', 'sales'))
);

-- ============================================================
-- INTEGRATIONS
-- ============================================================
create table integrations (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references users(id) on delete cascade,
  provider       text not null check (provider in ('gmail', 'whatsapp', 'instagram')),
  access_token   text,
  refresh_token  text,
  metadata       jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique(user_id, provider)
);

-- ============================================================
-- CONVERSATIONS
-- ============================================================
create table conversations (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references users(id) on delete cascade,
  title      text,
  source     text not null default 'gmail' check (source in ('gmail', 'whatsapp', 'instagram')),
  created_at timestamptz not null default now(),
  
  -- Integrations & AI
  external_thread_id text, -- Replaces gmail_thread_id
  customer_email     text, -- Extracted for campaign targeting
  lead_status        text check (lead_status in ('HOT', 'WARM', 'COLD')),
  intent             text
);

-- ============================================================
-- MESSAGES
-- ============================================================
create table messages (
  id              uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender          text not null check (sender in ('user', 'ai', 'customer')),
  content         text not null,
  source          text not null default 'gmail' check (source in ('gmail', 'whatsapp', 'instagram')),
  created_at      timestamptz not null default now(),
  
  -- Integrations
  external_message_id text -- Replaces gmail_message_id
);

-- ============================================================
-- USAGE
-- ============================================================
create table usage (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references users(id) on delete cascade,
  replies_count integer not null default 0,
  updated_at   timestamptz not null default now(),
  unique(user_id)
);

-- ============================================================
-- CAMPAIGNS & LOGS
-- ============================================================
create table campaigns (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references users(id) on delete cascade,
  name         text not null,
  subject      text not null,
  content      text not null,
  audience     text not null check (audience in ('HOT', 'WARM', 'ALL')),
  status       text not null default 'draft' check (status in ('draft', 'sent', 'scheduled')),
  scheduled_at timestamptz,
  created_at   timestamptz not null default now()
);

create table campaign_logs (
  id           uuid primary key default uuid_generate_v4(),
  campaign_id  uuid not null references campaigns(id) on delete cascade,
  email        text not null,
  status       text not null check (status in ('sent', 'failed')),
  created_at   timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table users         enable row level security;
alter table integrations  enable row level security;
alter table conversations enable row level security;
alter table messages      enable row level security;
alter table usage         enable row level security;
alter table campaigns     enable row level security;
alter table campaign_logs enable row level security;

-- users
create policy "users: read own row" on users for select using (auth.uid() = id);
create policy "users: insert own row" on users for insert with check (auth.uid() = id);
create policy "users: update own row" on users for update using (auth.uid() = id);

-- integrations
create policy "integrations: read own" on integrations for select using (auth.uid() = user_id);
create policy "integrations: insert own" on integrations for insert with check (auth.uid() = user_id);
create policy "integrations: update own" on integrations for update using (auth.uid() = user_id);
create policy "integrations: delete own" on integrations for delete using (auth.uid() = user_id);

-- conversations
create policy "conversations: read own" on conversations for select using (auth.uid() = user_id);
create policy "conversations: insert own" on conversations for insert with check (auth.uid() = user_id);
create policy "conversations: delete own" on conversations for delete using (auth.uid() = user_id);
create policy "conversations: update own" on conversations for update using (auth.uid() = user_id);

-- messages
create policy "messages: read own conversation messages" on messages for select using (
  conversation_id in (select id from conversations where user_id = auth.uid())
);
create policy "messages: insert into own conversations" on messages for insert with check (
  conversation_id in (select id from conversations where user_id = auth.uid())
);

-- usage
create policy "usage: read own row" on usage for select using (auth.uid() = user_id);
create policy "usage: insert own row" on usage for insert with check (auth.uid() = user_id);
create policy "usage: update own row" on usage for update using (auth.uid() = user_id);

-- campaigns
create policy "campaigns: read own" on campaigns for select using (auth.uid() = user_id);
create policy "campaigns: insert own" on campaigns for insert with check (auth.uid() = user_id);
create policy "campaigns: update own" on campaigns for update using (auth.uid() = user_id);
create policy "campaigns: delete own" on campaigns for delete using (auth.uid() = user_id);

-- campaign_logs
create policy "campaign_logs: read own" on campaign_logs for select using (
  campaign_id in (select id from campaigns where user_id = auth.uid())
);
create policy "campaign_logs: insert own" on campaign_logs for insert with check (
  campaign_id in (select id from campaigns where user_id = auth.uid())
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_conversations_user_id  on conversations(user_id);
create index idx_conversations_external on conversations(external_thread_id);
create index idx_messages_conv_id       on messages(conversation_id);
create index idx_messages_external      on messages(external_message_id);
create index idx_integrations_user_id   on integrations(user_id);

-- ============================================================
-- TRIGGERS
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, plan, replies_used) values (new.id, new.email, 'free', 0) on conflict (id) do nothing;
  insert into public.usage (user_id, replies_count) values (new.id, 0) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create or replace function update_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger usage_updated_at before update on usage for each row execute function update_timestamp();
create trigger integrations_updated_at before update on integrations for each row execute function update_timestamp();

create or replace function increment_replies_used(target_user_id uuid)
returns void language sql as $$
  update users set replies_used = replies_used + 1 where id = target_user_id;
$$;
