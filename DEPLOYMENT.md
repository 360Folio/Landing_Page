# Deployment Guide - SocialPeak Landing Page

This guide walks you through deploying the SocialPeak landing page to your GitHub account using GitHub Pages.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Create GitHub Repository](#create-github-repository)
3. [Push Code to GitHub](#push-code-to-github)
4. [Enable GitHub Pages](#enable-github-pages)
5. [Configure Custom Domain (Optional)](#configure-custom-domain-optional)
6. [Verify Deployment](#verify-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance & Updates](#maintenance--updates)

---

## Prerequisites

Before you start, ensure you have:

- ✅ A GitHub account ([Sign up here](https://github.com/signup) if needed)
- ✅ Git installed on your computer ([Download](https://git-scm.com/))
- ✅ All three project files ready:
  - `index.html`
  - `styles.css`
  - `script.js`

### Verify Git Installation

Open PowerShell or Command Prompt and run:

```powershell
git --version
```

You should see a version number. If not, install Git from https://git-scm.com/

---

## Create GitHub Repository

### Step 1: Create New Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Log in to your account
3. Click the **+** icon in the top-right corner
4. Select **New repository**

### Step 2: Configure Repository Settings

Fill in the repository details:

| Field | Value |
|-------|-------|
| **Repository name** | `landing-page` (or your preferred name) |
| **Description** | `SocialPeak - Social Media Marketing Landing Page` |
| **Visibility** | Public (required for free GitHub Pages) |
| **Initialize repository** | ❌ Do NOT check "Add a README file" |
| **.gitignore** | None |
| **License** | None (optional) |

Click **Create repository**

### Step 3: Copy Repository URL

After creating, you'll see the repository page. Copy the HTTPS URL (e.g., `https://github.com/YOUR_USERNAME/landing-page.git`)

---

## Push Code to GitHub

### Step 1: Initialize Local Git Repository

Navigate to your project directory in PowerShell:

```powershell
cd D:\Roomi\ClaudeWork\Landing_Page
```

Initialize git (if not already done):

```powershell
git init
```

### Step 2: Add Remote Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Verify the remote was added:

```powershell
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git (push)
```

### Step 3: Stage Your Files

Add all project files to git:

```powershell
git add index.html styles.css script.js
```

Verify the files are staged:

```powershell
git status
```

You should see:
```
On branch master
Changes to be committed:
  new file:   index.html
  new file:   styles.css
  new file:   script.js
```

### Step 4: Create Initial Commit

```powershell
git commit -m "Initial commit: Add SocialPeak landing page"
```

### Step 5: Push to GitHub

Push your code to GitHub:

```powershell
git branch -M main
git push -u origin main
```

**First time pushing?** Git may prompt you to authenticate:
- If using HTTPS: Enter your GitHub username and a [Personal Access Token](https://github.com/settings/tokens) (or password)
- If using SSH: Make sure your SSH key is configured

### Verify Push Success

Go to your GitHub repository URL (e.g., `https://github.com/YOUR_USERNAME/landing-page`) and confirm you see your files.

---

## Enable GitHub Pages

### Step 1: Access Repository Settings

1. Navigate to your GitHub repository
2. Click the **Settings** tab
3. In the left sidebar, scroll down and click **Pages**

### Step 2: Configure GitHub Pages

Under "Build and deployment":

| Setting | Value |
|---------|-------|
| **Source** | Deploy from a branch |
| **Branch** | Select `main` |
| **Folder** | Select `/ (root)` |

Click **Save**

### Step 3: Wait for Deployment

GitHub will build and deploy your site. You'll see a blue banner:

```
Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Note:** First deployment may take 1-2 minutes. Refresh the page to see the updated status.

---

## Configure Custom Domain (Optional)

If you want to use a custom domain (e.g., `socialpeak.com`):

### Step 1: Purchase Domain

Purchase a domain from:
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare
- Other registrar of your choice

### Step 2: Configure DNS Records

In your domain registrar's DNS settings, add these records:

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**For www subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### Step 3: Add Custom Domain to GitHub

1. Go to your repository **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `socialpeak.com`)
3. Click **Save**
4. Check the **Enforce HTTPS** checkbox once it appears

**Wait 15-30 minutes** for DNS to propagate.

---

## Verify Deployment

### Check GitHub Pages URL

Visit your GitHub Pages URL:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Or if using custom domain:
```
https://yourdomain.com
```

### Verify All Features Work

- [ ] Navigation menu loads
- [ ] Hamburger menu works on mobile
- [ ] Smooth scrolling to sections
- [ ] ROI Calculator calculates correctly
- [ ] FAQ accordion expands/collapses
- [ ] All images load
- [ ] Buttons and links are clickable
- [ ] Responsive design works on mobile

---

## Troubleshooting

### Site Not Live Yet

**Problem:** Getting a 404 error or "coming soon" message

**Solution:**
- Wait 1-2 minutes and refresh the page
- Check that your default branch is set to `main` in Settings → Branches
- Verify `index.html` is in the repository root (not in a subdirectory)

### Images Not Loading

**Problem:** Images appear broken on GitHub Pages

**Solution:**
- Images are loaded from Unsplash CDN - verify internet connection
- Check browser console for 404 errors (F12 → Console tab)
- Test on different browser

### Custom Domain Not Working

**Problem:** Custom domain shows 404 or isn't resolving

**Solution:**
1. Verify DNS records are correct (can take 15-30 minutes to propagate)
2. In GitHub Settings → Pages, ensure HTTPS is enforced
3. Check that CNAME file exists in repository (GitHub creates this automatically)
4. Restart your browser or clear cache (Ctrl+Shift+Del)

### Scripts Not Running

**Problem:** ROI Calculator or menu toggle not working

**Solution:**
1. Check browser console for JavaScript errors (F12 → Console)
2. Verify `script.js` is in the repository root
3. Ensure file paths in `index.html` are correct:
   - `<link rel="stylesheet" href="styles.css">`
   - `<script src="script.js"></script>`

### Push to GitHub Fails

**Problem:** `git push` command fails with authentication error

**Solution:**
- **Using HTTPS:** Create a [Personal Access Token](https://github.com/settings/tokens):
  1. Go to GitHub Settings → Developer settings → Personal access tokens
  2. Click "Generate new token"
  3. Select scopes: `repo` and `gist`
  4. Copy the token and use it as your password when git prompts
  
- **Using SSH:** [Set up SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

## Maintenance & Updates

### Making Updates to Your Site

After deployment, to make changes:

1. **Edit files locally:**
   ```powershell
   # Make changes to index.html, styles.css, or script.js
   ```

2. **Stage and commit changes:**
   ```powershell
   git add .
   git commit -m "Update: [describe your changes]"
   ```

3. **Push to GitHub:**
   ```powershell
   git push
   ```

4. **GitHub Pages auto-updates** (usually within 1-2 minutes)

### Useful Git Commands

```powershell
# Check status
git status

# View commit history
git log

# View remote configuration
git remote -v

# Update from GitHub (if working with others)
git pull

# Discard local changes
git checkout -- .

# View file differences
git diff
```

### Monitoring Deployment Status

Go to your repository → **Actions** tab to see deployment history and status.

---

## Performance Tips

To keep your site fast:

1. **Images:** Already optimized from Unsplash CDN
2. **Caching:** GitHub Pages automatically caches CSS/JS
3. **Minification:** Consider minifying CSS and JS for production (optional)
4. **Monitoring:** Use Google PageSpeed Insights:
   ```
   https://pagespeed.web.dev/?url=YOUR_SITE_URL
   ```

---

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-custom-domains-and-github-pages)
- [Git Documentation](https://git-scm.com/doc)
- [Personal Access Token Guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

---

## Quick Reference

### One-Line Deployment Check

After pushing, visit:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
```

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

**Last Updated:** June 9, 2026  
**Status:** Ready for Deployment ✅
