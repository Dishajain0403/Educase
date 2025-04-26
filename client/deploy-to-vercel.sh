#!/bin/bash

echo "🚀 Preparing for Vercel deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "⚠️ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Building project..."
npm run build

echo "🔗 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete! Check the URL above to access your site."
echo "📝 Remember to test all routes:"
echo "  - Homepage: https://your-project.vercel.app/"
echo "  - Sign Up: https://your-project.vercel.app/signup"
echo "  - Login: https://your-project.vercel.app/login"
echo "  - Profile: https://your-project.vercel.app/profile"