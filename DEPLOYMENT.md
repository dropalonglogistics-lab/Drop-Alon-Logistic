# DAL Platform Deployment Guide

## Prerequisites
- A **Supabase** project (Already set up: `glkhyjouhgdncwapihsn`)
- A **Vercel** or **Netlify** account (Vercel is recommended for Next.js)

## Environment Variables
The following variables must be configured in your deployment platform (CI/CD):

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://glkhyjouhgdncwapihsn.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_wQmAoIBYARi-bWcTY9fcQg_RRVk9eta` |

## Deployment Steps (Vercel)

1. **Connect Repository**: Push this codebase to GitHub/GitLab/Bitbucket.
2. **Create Project**: Import the repository in Vercel.
3. **Configure Settings**:
   - **Framework**: Next.js
   - **Root Directory**: `web`
4. **Environment Variables**: Add the variables listed above.
5. **Deploy**: Click Deploy. Vercel will run `npm run build` and host the application.

## Local Production Test
To verify the production build locally:
```bash
cd web
npm run build
npm run start
```

## Note on Next.js 16
Your project uses Next.js 16 (Turbopack). We have verified that the production build passes successfully. We have consolidated all source code into the `src/` directory for compatibility.