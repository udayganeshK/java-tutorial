# Manual MkDocs Build & Deploy Instructions

Follow these steps to build your MkDocs site locally and deploy it to GitHub Pages.

## Prerequisites
- Python 3.7+ installed on your machine
- Git installed and configured

## Step 1: Install MkDocs and Material Theme

Open PowerShell and run:
```powershell
python -m pip install mkdocs mkdocs-material
```

Verify installation:
```powershell
mkdocs --version
```

## Step 2: Build the Site Locally

Navigate to your project directory:
```powershell
cd C:\Users\SAILS-DM214\worksapce\java-tutorial
```

Build the site:
```powershell
mkdocs build
```

This creates a `_site/` folder containing the built HTML, CSS, and JS files.

## Step 3: Preview the Site (Optional)

To preview locally before pushing:
```powershell
mkdocs serve
```

Then open http://localhost:8000 in your browser. Press `Ctrl+C` to stop the server.

## Step 4: Configure GitHub Pages

1. Go to your GitHub repository: https://github.com/udayganeshK/java-tutorial
2. Click **Settings** > **Pages**
3. Under **Source**, select the **main** branch and set the folder to **/_site**
4. Click **Save**

## Step 5: Commit and Push the Build Output

After building, commit the `_site/` folder to git:
```powershell
cd C:\Users\SAILS-DM214\worksapce\java-tutorial
git add _site/
git commit -m "Build: MkDocs generated site"
git push origin main
```

## Step 6: Verify Deployment

Wait a few seconds, then visit:
https://udayganeshk.github.io/java-tutorial/

Your site should now display with proper formatting and working tabs!

## Workflow for Future Updates

Every time you update your documentation:
1. Edit markdown files in `/docs/`
2. Run `mkdocs build`
3. Commit and push: `git add _site/ && git commit -m "Update: ..." && git push origin main`

Alternatively, add a `.gitignore` entry to ignore `_site/` and set up GitHub Actions for automatic builds (ask if you want this).
