# Vercel Deployment Guide

This guide provides instructions on how to deploy this PopX UI assignment to Vercel without encountering 404 errors.

## Pre-Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deployment to Vercel**:

   When deploying to Vercel, follow these specific settings:

   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

3. **Configure Vercel Settings**:

   After deploying, add these settings in the Vercel dashboard:

   a. Go to your project in the Vercel dashboard
   b. Navigate to Project Settings > General
   c. Under "Build & Development Settings", ensure:
      - Framework Preset: `Other`
      - Build Command: `npm run build`
      - Output Directory: `dist`
   d. Navigate to Project Settings > Git
      - Production Branch: Set to your main branch (`main` or `master`)

4. **Configure Rewrites in the Vercel Dashboard**:

   a. In the Vercel dashboard, go to Project Settings > Rewrites
   b. Add the following rewrite:
      - Source: `/(.*)`
      - Destination: `/index.html`
      - Status: 200
   c. Save the changes

## Troubleshooting 404 Errors

If you still encounter 404 errors:

1. **Manual Fix**:
   
   Create a `vercel.json` file in your project root with the following content:

   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

2. **Redeploy**:
   
   After adding this file, redeploy your project:

   ```bash
   vercel --prod
   ```

## Testing the Deployment

After deployment, test all routes in your application:

1. Main page: `https://your-vercel-app.vercel.app/`
2. Signup: `https://your-vercel-app.vercel.app/signup`
3. Login: `https://your-vercel-app.vercel.app/login`
4. Profile: `https://your-vercel-app.vercel.app/profile`

All routes should render correctly without 404 errors.

## Important Files for Vercel Deployment

The repository already includes these important configuration files:

1. `vercel.json` - Contains the rewrite rules for proper routing
2. `client/public/_redirects` - Helps with routing on Netlify (also works for some Vercel configurations)
3. `static.json` - Used by some static hosting platforms

---

*Note: This is a static UI implementation that doesn't require backend functionality. The focus is on precise pixel-perfect recreation of the Adobe XD designs.*