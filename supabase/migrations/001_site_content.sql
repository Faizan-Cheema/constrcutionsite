-- Site content table: stores all editable content for the one-pager
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text unique not null,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- RLS: allow public read, authenticated write
alter table public.site_content enable row level security;

create policy "Public read access" on public.site_content
  for select using (true);

create policy "Authenticated users can update" on public.site_content
  for all using (auth.role() = 'authenticated');

-- Seed default content (matches current hardcoded values)
insert into public.site_content (section, data) values
  ('hero', '{"title":"Building Your Vision","titleLine2":"From the Ground Up","subtitle":"Expert construction & renovation services in Colchester and beyond.","ctaText":"Request a Quote"}'::jsonb),
  ('services', '{"heading":"Our Services","subheading":"From new builds to finishing touches — we deliver quality at every stage.","items":[{"title":"New Builds & Extensions","description":"From foundations to roofing, we construct brand‑new homes and design thoughtful extensions to expand your living space."},{"title":"Renovations & Conversions","description":"Transform existing properties with loft conversions, ground works and comprehensive renovations tailored to your needs."},{"title":"Plumbing & Electrics","description":"Complete internal installations including plumbing, underfloor heating and electrical wiring for safe and efficient homes."},{"title":"Finishing Trades","description":"High‑quality brickwork, plastering, roofing and decorative finishes to bring your project to life with precision."}]}'::jsonb),
  ('portfolio', '{"heading":"Project Portfolio","subheading":"A selection of our recent work across residential and commercial projects.","items":[{"src":"/images/bathroom.jpg","alt":"Modern bathroom renovation"},{"src":"/images/kitchen.jpg","alt":"Stylish kitchen installation"},{"src":"/images/livingroom.jpg","alt":"Open‑plan living area"},{"src":"/images/stairs.jpg","alt":"Contemporary staircase"},{"src":"/images/groundwork.jpg","alt":"Landscaped patio and groundwork"},{"src":"/images/underfloor.jpg","alt":"Underfloor heating installation"},{"src":"/images/roof.jpg","alt":"Roofing and tiling work"},{"src":"/images/newbuild.jpg","alt":"New build under construction"}]}'::jsonb),
  ('about', '{"heading":"About Us","paragraph1":"Neza Construction Ltd is a small, family‑run company based in South London, specialising in residential and light commercial building projects. From bespoke new builds to sympathetic renovations and everything in between, our experienced team offers a complete range of services including groundwork, structural work, roofing, plumbing, electrics and finishing trades.","paragraph2":"Our mission is to deliver craftsmanship of the highest standard while maintaining transparent communication and respect for your home. We pride ourselves on building lasting relationships with clients and bringing their visions to life.","badge1":"Quality craftsmanship","badge2":"Client-focused"}'::jsonb),
  ('contact', '{"heading":"Get in Touch","introText":"Ready to start your project? We''d love to hear from you. Fill out the form below or reach out using the details below and we''ll get back to you as soon as possible.","email":"Admin@NezaConstruction.Ltd","phone":"07584045630"}'::jsonb),
  ('footer', '{"copyright":"2026 Neza Construction Ltd. All rights reserved.","socialLinks":[{"platform":"Facebook","url":"https://facebook.com"},{"platform":"YouTube","url":"https://youtube.com"},{"platform":"TikTok","url":"https://tiktok.com"},{"platform":"Instagram","url":"https://instagram.com"}]}'::jsonb)
on conflict (section) do nothing;
