#!/bin/bash

# Build the app
npm run build

# Move to the build directory
cd dist

# Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch .nojekyll

# Create a CNAME file if you have a custom domain
# echo "your-custom-domain.com" > CNAME

# Initialize Git in the build directory
git init

# Add all files to Git
git add .

# Commit the files
git commit -m "Deploy to GitHub Pages"

# Add the GitHub repository as a remote
# Replace USERNAME with your GitHub username and REPO with your repository name
echo "Enter your GitHub username:"
read username
echo "Enter your repository name (e.g., pokemon-weight-calculator):"
read repo

git remote add origin https://github.com/$username/$repo.git

# Force push to the gh-pages branch
git push -f origin master:gh-pages

# Clean up
cd ..
echo "Deployed to https://$username.github.io/$repo/"
