# GitHub Pages - Allure Report Hosting Setup

Complete guide to host and publish Playwright Allure reports on GitHub Pages.

---

## 📊 What This Does

✅ Automatically generates Allure HTML reports after test runs  
✅ Deploys reports to GitHub Pages (free hosting)  
✅ Makes reports publicly accessible via unique URL  
✅ Includes Allure dashboard link in email notifications  
✅ Updates reports on every test run  

**Result:** Professional interactive test dashboard accessible from anywhere

---

## 🔗 Your Allure Dashboard URL

Your Allure report will be hosted at:

```
https://{github-username}.github.io/{repository-name}/
```

**Example for this project:**

```
https://Pruthvi-githouse.github.io/playwright-E2E/
```

---

## ✅ Setup Steps

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Click **Save**

![GitHub Pages Settings](https://docs.github.com/assets/cb-47681/images/help/pages/pages-settings-branch-selection.png)

**Expected Result:** Green checkmark ✅ showing "Your site is published at..."

### Step 2: Verify Workflow Permissions

GitHub Pages requires write access. The workflow already includes:

```yaml
permissions:
  contents: write      # Can write to repo
  pages: write         # Can deploy to Pages
  id-token: write      # Can create deployment tokens
```

✅ These are already configured in `.github/workflows/allure-report-deploy.yml`

### Step 3: Verify Allure CLI Installation

The workflow installs Allure CLI globally:

```bash
npm install -g allure-commandline --save-dev
```

This command is already in the workflow - no manual action needed.

### Step 4: Configure Email with Dashboard URL

The email script automatically constructs your Allure URL from the repository name:

```javascript
const ALLURE_DASHBOARD_URL = GITHUB_REPOSITORY 
  ? `https://${GITHUB_REPOSITORY.split('/')[0]}.github.io/${GITHUB_REPOSITORY.split('/')[1]}/`
  : '';
```

Example:
- Repository: `Pruthvi-githouse/playwright-E2E`
- URL: `https://Pruthvi-githouse.github.io/playwright-E2E/`

---

## 🚀 Workflow Execution Flow

### When Tests Run:

1. **Tests Execute** (Playwright runs tests)
   - Output: `allure-results/` directory with JSON files

2. **Allure Report Generated** (15-20 seconds)
   - Command: `allure generate allure-results --clean -o allure-report`
   - Output: `allure-report/` directory with HTML + assets

3. **GitHub Pages Deploy** (30-60 seconds)
   - Action: `peaceiris/actions-gh-pages@v3`
   - Destination: `gh-pages` branch
   - Public URL: https://[username].github.io/[repo]/

4. **Email Sent** (with dashboard link)
   - Includes clickable "View Allure Dashboard" button
   - Shows direct URL to hosted report

---

## 📧 Email Report Features

### What You'll Receive:

```
From: Playwright CI/CD
Subject: Playwright Automation Test Status - PASS ✅

[Professional HTML Email]

Test Status: PASS ✅

Test Metrics:
├─ Total Tests: 12
├─ Passed: 12 (100%)
├─ Failed: 0
└─ Skipped: 0

[Button: 📊 View Allure Dashboard]
  └─ Links to: https://[username].github.io/[repo]/

[Button: View GitHub Actions Run]
  └─ Links to: GitHub workflow details

Dashboard URL: https://[username].github.io/[repo]/
```

---

## 🔍 Accessing the Dashboard

### Method 1: Click Email Link
- Click "📊 View Allure Dashboard" button in email
- Opens live report instantly

### Method 2: Manual URL
- Copy URL from email
- Paste in browser: `https://[username].github.io/[repo]/`

### Method 3: GitHub Repository
1. Go to GitHub repo
2. Click **Settings** → **Pages**
3. See "Your site is published at: [URL]"
4. Click link to open

---

## 📊 Allure Dashboard Features

Once hosted, you get:

✅ **Test History**
- View all historical test runs
- Compare pass/fail trends over time

✅ **Interactive Timeline**
- See when tests ran
- Duration of each run

✅ **Detailed Test Results**
- Click each test to see:
  - Full logs
  - Step-by-step execution
  - Failure messages
  - Screenshots
  - Video recordings

✅ **Statistics**
- Pass rate percentage
- Test duration
- Failure statistics
- Test categories

✅ **Shareable**
- Share dashboard URL with team
- No authentication required
- Accessible 24/7

---

## 🛠️ Troubleshooting

### ❌ Dashboard Not Found (404 Error)

**Problem:** "This page doesn't exist"

**Solutions:**

1. **Check Pages is Enabled**
   ```
   Settings → Pages → Should show green checkmark
   ```

2. **Wait 2-3 Minutes**
   - GitHub Pages deployment takes time
   - Refresh page after 2-3 minutes

3. **Check gh-pages Branch Exists**
   ```bash
   git branch -a
   # Should show: remotes/origin/gh-pages
   ```

4. **Run Tests Again to Generate Report**
   ```bash
   npm test
   # Then wait for workflow to complete
   ```

### ❌ Blank/Empty Dashboard

**Problem:** Dashboard loads but shows no data

**Solutions:**

1. **Verify Allure Results Generated**
   - Check workflow logs for: "Allure report generated"
   - Verify `allure-results/` has files

2. **Check Report HTML Generated**
   - Workflow should show: `allure generate allure-results --clean -o allure-report`
   - Should create `allure-report/index.html`

3. **Wait for Deployment**
   - Dashboard can take 1-2 minutes to appear
   - GitHub Pages needs time to publish

### ❌ Email Shows Wrong URL

**Problem:** Email shows incomplete or wrong Allure URL

**Solutions:**

1. **Check GITHUB_REPOSITORY Environment Variable**
   - Workflow file shows: `${{ github.repository }}`
   - Should auto-populate as: `username/repo`

2. **Manual Fix if Needed**
   - Edit `.github/workflows/playwright-tests.yml`
   - Change email step environment:
     ```yaml
     - name: Send Test Report Email
       env:
         GITHUB_REPOSITORY: username/playwright-E2E
     ```

3. **Check Email Script**
   - Verify in `scripts/sendTestReport.js`:
   ```javascript
   const ALLURE_DASHBOARD_URL = GITHUB_REPOSITORY 
     ? `https://${GITHUB_REPOSITORY.split('/')[0]}.github.io/${GITHUB_REPOSITORY.split('/')[1]}/`
     : '';
   ```

### ❌ Workflow Fails During Deploy

**Problem:** Workflow shows red X at "Deploy to GitHub Pages" step

**Solutions:**

1. **Check Permissions**
   - Verify workflow has:
     ```yaml
     permissions:
       contents: write
       pages: write
       id-token: write
     ```

2. **Enable GitHub Pages**
   - Settings → Pages → Source should be `gh-pages` branch
   - Otherwise deployment will fail

3. **Check Allure Report Generated**
   - Must complete before deploy step
   - Check workflow logs for errors in "Generate Allure report" step

---

## 📋 Verification Checklist

Before first deployment:

- [ ] Repository Settings → Pages → Enabled for gh-pages branch
- [ ] GitHub token has write permissions (automatic in private repos)
- [ ] Workflow file has correct permissions section
- [ ] `npm test` runs and creates `allure-results/`
- [ ] Allure CLI can be installed globally
- [ ] Email script includes ALLURE_DASHBOARD_URL variable

After first test run:

- [ ] Workflow completes successfully (green checkmark)
- [ ] `gh-pages` branch exists in repository
- [ ] Page loads at https://[username].github.io/[repo]/
- [ ] Shows test results/timeline
- [ ] Email includes clickable dashboard button
- [ ] Dashboard URL appears in email footer

---

## 🔄 Continuous Updates

**How reports stay fresh:**

1. Each test run generates new Allure results
2. Workflow regenerates HTML report
3. Report deployed to GitHub Pages
4. Old report automatically replaced
5. Dashboard always shows latest results

**Timeline:**
- Tests run every hour (configurable)
- Report generated: 15-20 seconds
- Deployed to GitHub Pages: 30-60 seconds
- Email sent: Immediately after deployment
- Total time: ~2-3 minutes from test start to email

---

## 📁 File Structure

```
playwright-automation-project/
├── .github/
│   └── workflows/
│       ├── playwright-tests.yml          # ← Runs tests hourly
│       └── allure-report-deploy.yml      # ← Deploys to GitHub Pages
├── scripts/
│   └── sendTestReport.js                 # ← Sends email with dashboard link
├── allure-results/                       # ← Generated after tests
│   └── [result JSON files]
└── allure-report/                        # ← Generated HTML report
    ├── index.html
    ├── css/
    ├── js/
    └── data/
```

---

## 🎯 Example URLs

### This Project:

**Repository:**
```
https://github.com/Pruthvi-githouse/playwright-E2E
```

**Allure Dashboard:**
```
https://Pruthvi-githouse.github.io/playwright-E2E/
```

**GitHub Actions Workflow:**
```
https://github.com/Pruthvi-githouse/playwright-E2E/actions
```

### Generic Format:

**Repository:**
```
https://github.com/{username}/{repo-name}
```

**Allure Dashboard:**
```
https://{username}.github.io/{repo-name}/
```

---

## 🔒 Privacy & Access

### Who Can See It?

**Public Repository:**
- ✅ Dashboard is publicly accessible
- ✅ Anyone with URL can view
- ✅ No authentication required

**Private Repository:**
- ✅ Pages are still public by default
- ✅ Can restrict to GitHub organization
- ✅ Setting: Settings → Pages → Restrict access

### Security Notes:

- ✅ Test results are safe to share (no credentials)
- ✅ GitHub Pages uses HTTPS (encrypted)
- ✅ No login credentials in reports
- ⚠️ Avoid committing secrets to repo
- ⚠️ Test data might expose internal URLs/information

---

## 📞 Support & Documentation

### Allure Documentation
- https://docs.qameta.io/allure/

### GitHub Pages Docs
- https://docs.github.com/en/pages

### Playwright Docs
- https://playwright.dev/

### Allure CLI Commands
```bash
# Generate report
allure generate allure-results --clean -o allure-report

# View report locally
allure serve allure-results

# Clear results
allure clean
```

---

## 🎉 Success Indicators

✅ **Setup Complete When:**

1. Settings → Pages shows green checkmark
2. `gh-pages` branch appears in repository
3. First workflow run completes without errors
4. Dashboard loads at https://[username].github.io/[repo]/
5. Email includes "📊 View Allure Dashboard" button
6. Clicking dashboard link opens live report

---

## 🚀 Next Steps

1. ✅ Enable GitHub Pages (if not already done)
2. ✅ Commit and push updated workflow files:
   ```bash
   git add .github/workflows/allure-report-deploy.yml
   git add scripts/sendTestReport.js
   git commit -m "Enhance GitHub Pages deployment and email reporting"
   git push origin main
   ```

3. ✅ Trigger a test run:
   - GitHub Actions → "Playwright Tests with Allure Reporting" → "Run workflow"
   - Or wait for hourly automatic run

4. ✅ Check workflow completion:
   - Actions tab should show green checkmark
   - Should take 3-5 minutes total

5. ✅ Access dashboard:
   - Visit: https://[username].github.io/[repo]/
   - Or click link in email

6. ✅ Share with team:
   - Send dashboard URL to stakeholders
   - Everyone can view without authentication

---

**Created:** GitHub Copilot  
**Last Updated:** February 2, 2026  
**Status:** ✅ Ready to Deploy
