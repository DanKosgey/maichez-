-- Create course_modules table
create table if not exists course_modules (
  id text primary key,
  title text not null,
  description text,
  duration text,
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  content text,
  content_type text check (content_type in ('video', 'text')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create profile_course_modules table (junction table)
create table if not exists profile_course_modules (
  profile_id uuid references profiles(id) on delete cascade,
  module_id text references course_modules(id) on delete cascade,
  completed boolean default false,
  quiz_score numeric,
  completed_at timestamp with time zone,
  primary key (profile_id, module_id)
);

-- Create validation_results table
create table if not exists validation_results (
  id uuid default uuid_generate_v4() primary key,
  journal_entry_id uuid references journal_entries(id) on delete cascade,
  rule_name text not null,
  status text check (status in ('approved', 'warning', 'rejected')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table course_modules enable row level security;
alter table profile_course_modules enable row level security;
alter table validation_results enable row level security;

-- Create policies for course_modules
create policy "Course modules are viewable by everyone."
  on course_modules for select
  using ( true );

create policy "Admins can insert course modules."
  on course_modules for insert
  with check ( exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

create policy "Admins can update course modules."
  on course_modules for update
  using ( exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

create policy "Admins can delete course modules."
  on course_modules for delete
  using ( exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

-- Create policies for profile_course_modules
create policy "Users can view own course progress."
  on profile_course_modules for select
  using ( auth.uid() = profile_id );

create policy "Users can insert own course progress."
  on profile_course_modules for insert
  with check ( auth.uid() = profile_id );

create policy "Users can update own course progress."
  on profile_course_modules for update
  using ( auth.uid() = profile_id );

create policy "Users can delete own course progress."
  on profile_course_modules for delete
  using ( auth.uid() = profile_id );

-- Create policies for validation_results
create policy "Validation results are viewable by admins."
  on validation_results for select
  using ( exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  ));

create policy "System can insert validation results."
  on validation_results for insert
  with check ( true );

-- Insert sample course modules
insert into course_modules (id, title, description, duration, level, content_type) values
  ('cm001', 'Introduction to Trading', 'Learn the fundamentals of trading', '30 min', 'beginner', 'text'),
  ('cm002', 'Risk Management', 'Master risk management techniques', '45 min', 'beginner', 'video'),
  ('cm003', 'Technical Analysis', 'Understanding charts and indicators', '60 min', 'intermediate', 'video'),
  ('cm004', 'Psychology of Trading', 'Managing emotions and mindset', '40 min', 'intermediate', 'text'),
  ('cm005', 'Advanced Strategies', 'Professional trading strategies', '90 min', 'advanced', 'video')
on conflict (id) do nothing;

-- Insert sample validation rules data
insert into validation_results (journal_entry_id, rule_name, status, notes)
select je.id, 
       case (random() * 5)::int
         when 0 then 'Trading Against Trend'
         when 1 then 'No FVG Identified'
         when 2 then 'Risk > 2% Account'
         when 3 then 'Early Entry (No Close)'
         when 4 then 'Trading News Event'
         else 'Invalid Setup'
       end as rule_name,
       case (random() * 2)::int
         when 0 then 'approved'
         when 1 then 'warning'
         else 'rejected'
       end as status,
       'Sample validation note'
from journal_entries je
limit 50
on conflict do nothing;