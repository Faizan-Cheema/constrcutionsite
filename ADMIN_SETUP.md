# Admin Panel Setup

This guide walks you through setting up the content management admin panel.

## 1. Cloudinary (for Portfolio images)

1. Go to [cloudinary.com](https://cloudinary.com) and create an account or use an existing one.
2. In the Dashboard, copy **Cloud Name**, **API Key**, and **API Secret**.
3. Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Portfolio images can be uploaded via the admin panel (Edit Portfolio → Upload to Cloudinary) or you can paste any image URL. Each portfolio item can also have an optional **redirect link** (e.g. project page, social profile).

## 2. Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a project (or use an existing one).
2. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

## 3. Run the Database Migration

1. In Supabase Dashboard, open **SQL Editor**.
2. Copy the contents of `supabase/migrations/001_site_content.sql`.
3. Run the script. This creates the `site_content` table and seeds it with default content.

## 4. Create an Admin User

1. In Supabase Dashboard, go to **Authentication → Users**.
2. Click **Add user → Create new user**.
3. Enter an email and password (this is your admin login).
4. Save the credentials.

## 5. Access the Admin Panel

- **Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin) (after login)

Edit any section (Hero, Services, Portfolio, About, Contact, Footer) and click **Save**. Changes appear on the live site immediately.
