# PopX UI Assignment

This project is a pixel-perfect implementation of UI designs from an Adobe XD file. The implementation focuses on exact visual replication of the provided design mockups, including all styling details, text, and layout.

## Pages Implemented

1. **Welcome Page** - Initial landing page with options to create an account or login
2. **Sign Up Page** - Form for creating a new account with all required fields
3. **Login Page** - Form for existing users to sign in
4. **Profile Page** - User profile display after successful login/signup

## Technology Stack

- React.js with TypeScript
- Vite for fast development and optimized builds
- TailwindCSS for styling
- Wouter for client-side routing
- React Hook Form for form handling
- Zod for form validation

## Deployment Instructions

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push this directory to a GitHub repository
2. Connect to Vercel and select the repository
3. Configure as follows:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (current directory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click Deploy

### Option 2: Deploy via Vercel CLI

From this directory, run:

```bash
# Make the deployment script executable
chmod +x deploy-to-vercel.sh

# Run the deployment script
./deploy-to-vercel.sh
```

For more detailed instructions, see the [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) file.

## Development

To run this project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## UI Implementation Notes

- The UI exactly matches the provided design mockups pixel-for-pixel
- All fonts, colors, spacing, and text content match the original design
- The implementation is focused on the frontend only (no backend functionality)
- Interactive elements like buttons navigate between pages as shown in the mockups

## License

This project is created as a design assignment.