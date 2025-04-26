# Vercel Deployment Guide for PopX UI Assignment

This guide provides step-by-step instructions for deploying the PopX UI assignment to Vercel.

## Deployment Steps

### 1. Prepare Your Repository

For the cleanest deployment, you should push just the `client` directory to your GitHub repository. However, if you've already pushed the entire project, you can specify the client directory during deployment.

### 2. Connect to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
2. Go to your Vercel dashboard and click "Add New" → "Project"
3. Import your GitHub repository

### 3. Configure Project Settings

When configuring your Vercel project, use these settings:

- **Project Name**: `popx-ui` (or any name you prefer)
- **Framework Preset**: `Vite`
- **Root Directory**: `client` (important - specify this to use only the client directory!)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default for Vite)
- **Install Command**: `npm install` (default)

### 4. Environment Variables

No environment variables are required for this UI-only project.

### 5. Deploy

Click "Deploy" and wait for the deployment process to complete.

### 6. Testing Your Deployment

After deployment, test the following routes:

- Homepage: `https://your-project-name.vercel.app/`
- Sign Up: `https://your-project-name.vercel.app/signup`
- Login: `https://your-project-name.vercel.app/login`
- Profile: `https://your-project-name.vercel.app/profile`

All routes should work correctly without any 404 errors.

### 7. Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your Vercel project settings
2. Click on "Domains"
3. Add your custom domain and follow the instructions

## How It Works

This setup works because:

1. We've configured `vercel.json` with a rewrite rule that redirects all routes to `index.html`
2. The React router (Wouter) handles client-side routing
3. The Vite configuration in `client/vite.config.ts` is simplified for deployment

## Troubleshooting

If you encounter a 404 error on routes other than the homepage:

1. Make sure the `vercel.json` file is properly located in the `client` directory
2. Check that your Vercel project is configured to use the `client` directory as root
3. Try adding a `_redirects` file to the `client/public` directory with the content:
   ```
   /* /index.html 200
   ```

If you have other issues, check the Vercel deployment logs for detailed error messages.

---

*Note: This UI project is focused on pixel-perfect design implementation rather than backend functionality. All form submissions and state changes are handled client-side without any actual API calls.*