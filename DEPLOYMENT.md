# Deployment Guide for Pokémon Weight Calculator

This document provides instructions on how to deploy the Pokémon Weight Calculator application to various hosting platforms.

## Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository for this project
2. Push your code to the repository
3. Enable GitHub Pages in your repository settings:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - GitHub will use the workflow file at `.github/workflows/deploy.yml` to build and deploy your site

Your site will be available at: `https://[your-username].github.io/pokemon-weight-calculator/`

## Option 2: Netlify

1. Sign up for a Netlify account at [netlify.com](https://www.netlify.com/)
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Build your project: `npm run build`
4. Deploy to Netlify: `netlify deploy --prod --dir=dist`
5. Follow the interactive prompts to complete the deployment

## Option 3: Vercel

1. Sign up for a Vercel account at [vercel.com](https://vercel.com/)
2. Install the Vercel CLI: `npm install -g vercel`
3. Deploy to Vercel: `vercel --prod`
4. Follow the interactive prompts to complete the deployment

## Option 4: Surge

1. Install Surge: `npm install -g surge`
2. Build your project: `npm run build`
3. Deploy to Surge: `cd dist && surge`
4. Follow the interactive prompts to complete the deployment

## Manual Deployment

If you want to host the application on your own server:

1. Build the project: `npm run build`
2. The build output will be in the `dist` directory
3. Upload the contents of the `dist` directory to your web server
