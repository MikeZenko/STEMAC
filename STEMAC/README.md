# STEM Central Asia Website

This is the official website for STEM Central Asia initiative. The site is built with React, Vite, and Tailwind CSS.

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment on Vercel

This project is configured for seamless deployment on Vercel. Here's how to deploy:

### Method 1: Using Vercel Dashboard

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Vercel will automatically detect the framework (Vite)
6. Configure your project settings if needed:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
7. Click "Deploy"

### Method 2: Using Vercel CLI

```bash
# Login to Vercel (if not already logged in)
npx vercel login

# Deploy to production
pnpm deploy
```

### Configuration

The project includes:
- `vercel.json` - Vercel-specific configuration
- `.vercelignore` - Files to exclude from deployment

## Project Structure

- `/src` - Application source code
- `/public` - Static assets
- `/dist` - Production build output

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
