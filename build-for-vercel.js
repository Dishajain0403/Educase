const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.blue}Starting Vercel-specific build process...${colors.reset}\n`);

// Step 1: Run the standard build process
console.log(`${colors.yellow}Step 1: Building the React application...${colors.reset}`);
execSync('npm run build', { stdio: 'inherit' });
console.log(`${colors.green}✓ Build complete${colors.reset}\n`);

// Step 2: Create or ensure the 'dist' directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Step 3: Copy the _redirects file to the dist directory
console.log(`${colors.yellow}Step 2: Setting up routing for Vercel...${colors.reset}`);
const redirectsSource = path.join(__dirname, 'client', 'public', '_redirects');
const redirectsDest = path.join(distDir, '_redirects');

try {
  fs.copyFileSync(redirectsSource, redirectsDest);
  console.log(`${colors.cyan}  Copied _redirects file to dist directory${colors.reset}`);
} catch (error) {
  console.error(`  Could not copy _redirects file: ${error.message}`);
}

// Step 4: Create Vercel.json in the dist directory if it doesn't exist
const vercelConfigPath = path.join(distDir, 'vercel.json');
if (!fs.existsSync(vercelConfigPath)) {
  const vercelConfig = {
    "routes": [
      { "handle": "filesystem" },
      { "src": "/.*", "dest": "/index.html" }
    ]
  };
  
  fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
  console.log(`${colors.cyan}  Created vercel.json configuration${colors.reset}`);
}

console.log(`\n${colors.bright}${colors.green}Build for Vercel completed successfully!${colors.reset}`);
console.log(`${colors.dim}You can now deploy the 'dist' directory to Vercel.${colors.reset}`);