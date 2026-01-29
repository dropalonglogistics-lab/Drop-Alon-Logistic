# Vercel Deployment Guide for Drop Along Logistic

## Prerequisites

- ✅ GitHub repository with latest code pushed
- ✅ Vercel account (sign up at https://vercel.com)
- ✅ Supabase project with environment variables

## Step 1: Prepare Project Files

### 1.1 Copy Vercel Configuration

Copy the Vercel configuration files to your project root:

```powershell
# Copy vercel.json to project root
Copy-Item "C:\Users\ADMIN\.gemini\antigravity\brain\3f8d92e9-8d9d-4e4e-a6e0-9f43aafb04f4\vercel_config\vercel.json" "c:\Users\ADMIN\.gemini\antigravity\brain\09d06520-f01c-4859-a43c-03a6ec19d84a\Drop Along Logistic\vercel.json"

# Copy .vercelignore to project root
Copy-Item "C:\Users\ADMIN\.gemini\antigravity\brain\3f8d92e9-8d9d-4e4e-a6e0-9f43aafb04f4\vercel_config\.vercelignore" "c:\Users\ADMIN\.gemini\antigravity\brain\09d06520-f01c-4859-a43c-03a6ec19d84a\Drop Along Logistic\.vercelignore"
```

### 1.2 Commit and Push Configuration

```powershell
cd "c:\Users\ADMIN\.gemini\antigravity\brain\09d06520-f01c-4859-a43c-03a6ec19d84a\Drop Along Logistic"
git add vercel.json .vercelignore
git commit -m "Add Vercel deployment configuration"
git push
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `Drop-Along-Logistic` or similar
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://glkhyjouhgdncwapihsn.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsa2h5am91aGdkbmN3YXBpaHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNDE2NjksImV4cCI6MjA4NDYxNzY2OX0.SbtzRQHSUmu9pjmj9kmD1bvPaIRs61WbzVV_Y7mij00` |

   > **Note**: These values are from your `.env.local` file

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-3 minutes)
   - You'll get a URL like `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd "c:\Users\ADMIN\.gemini\antigravity\brain\09d06520-f01c-4859-a43c-03a6ec19d84a\Drop Along Logistic"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? drop-along-logistic
# - Directory? ./web
# - Override settings? No

# For production deployment
vercel --prod
```

## Step 3: Configure Supabase for Production

### 3.1 Add Vercel URL to Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**
4. Add your Vercel URL to:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: Add `https://your-project.vercel.app/auth/callback`

### 3.2 Run Storage Migration (If Not Done)

1. Go to **SQL Editor** in Supabase
2. Create a new query
3. Paste the contents of `web/supabase/migrations/20260130000000_storage_setup.sql`
4. Run the query
5. Verify the `avatars` bucket was created in **Storage**

## Step 4: Verify Deployment

### 4.1 Check Build Logs

- In Vercel dashboard, click on your deployment
- Check the "Deployment" tab for any errors
- Review build logs if deployment failed

### 4.2 Test Production Site

Visit your Vercel URL and test:

- ✅ Homepage loads correctly
- ✅ Dark mode works
- ✅ Responsive design on mobile/desktop
- ✅ Sign up creates new account
- ✅ Login works with credentials
- ✅ Profile page displays user info
- ✅ Profile editing and image upload works
- ✅ Routes page loads data from Supabase
- ✅ Search functionality works

## Step 5: Set Up Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

## Environment Variables Management

### Update Environment Variables

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Add, edit, or delete variables
4. Redeploy for changes to take effect

### Best Practices

- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel dashboard for production secrets
- ✅ Use different Supabase projects for dev/prod
- ✅ Rotate API keys regularly

## Troubleshooting

### Build Fails

**Error**: `Module not found`
**Solution**: Ensure all dependencies are in `package.json`, run `npm install` locally first

**Error**: `Environment variable not found`
**Solution**: Add missing variables in Vercel dashboard → Settings → Environment Variables

### Runtime Errors

**Error**: `Failed to fetch routes`
**Solution**: 
1. Check Supabase URL and anon key are correct
2. Verify database has been seeded with route data
3. Check RLS policies allow public read access

**Error**: `Avatar upload fails`
**Solution**:
1. Run storage migration SQL in Supabase
2. Verify `avatars` bucket exists and is public
3. Check RLS policies on storage.objects

### Performance Issues

**Slow page loads**
- Enable Vercel Analytics
- Check Supabase query performance
- Add database indexes if needed
- Consider implementing caching

## Monitoring

### Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Monitor:
   - Page views
   - Response times
   - Error rates
   - Geographic distribution

### Supabase Logs

1. Go to Supabase Dashboard
2. Navigate to "Logs" section
3. Monitor:
   - API requests
   - Database queries
   - Authentication events
   - Storage operations

## Rollback

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click "..." → "Promote to Production"
4. Previous version becomes live immediately

## Next Steps After Deployment

1. ✅ Set up custom domain
2. ✅ Enable Vercel Analytics
3. ✅ Configure error monitoring (e.g., Sentry)
4. ✅ Set up automated backups for Supabase
5. ✅ Create staging environment
6. ✅ Set up CI/CD tests
7. ✅ Monitor performance and optimize

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Issues**: Create issues in your repository

---

## Quick Reference

### Useful Commands

```powershell
# Local development
npm run dev

# Build locally
npm run build

# Deploy to Vercel
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls
```

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **Your Production Site**: https://your-project.vercel.app
- **GitHub Repository**: https://github.com/your-username/Drop-Along-Logistic

---

**🎉 Your Drop Along Logistic app is now ready for production deployment!**
