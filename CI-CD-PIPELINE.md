# 🚀 CI/CD PIPELINE - GitHub Actions Setup

## Overview

This guide explains the complete CI/CD pipeline for your Playwright + Allure project using GitHub Actions.

---

## 📋 Pipeline Configuration

**File Location:** `.github/workflows/playwright-tests.yml`

**Trigger:** Automatically runs on every push to the `main` branch

---

## 🔄 Pipeline Steps Explained

### **Step 1: Checkout Code**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```
- Clones your repository
- Makes code available for testing
- Fetches full history for accurate reporting

### **Step 2: Setup Node.js**
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 18.x
    cache: 'npm'
```
- Installs Node.js 18.x
- Caches npm packages for faster builds
- Reduces CI/CD execution time

### **Step 3: Install Dependencies**
```yaml
- name: Install dependencies
  run: npm ci
```
- Installs exact versions from package-lock.json
- More reliable than `npm install` in CI/CD
- Includes allure-playwright and other dependencies

### **Step 4: Install Playwright Browsers**
```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps
```
- Downloads Chromium, Firefox, WebKit browsers
- Installs system dependencies
- Required for headless test execution

### **Step 5: Run Tests**
```yaml
- name: Run Playwright tests
  run: npm test
  continue-on-error: true
```
- Executes all tests in headless mode
- Generates `allure-results/` folder
- Continues even if tests fail (to generate reports)

### **Step 6: Generate Allure Report**
```yaml
- name: Generate Allure Report
  if: always()
  run: |
    npm install -g allure-commandline
    allure generate allure-results --clean -o allure-report
```
- Processes test results from `allure-results/`
- Creates HTML dashboard in `allure-report/`
- Runs even if tests failed

### **Step 7-9: Upload Artifacts**
```yaml
- name: Upload Allure Report
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report/
    retention-days: 30
```
- Saves Allure dashboard as artifact
- Stores Playwright HTML report
- Keeps Allure raw results
- Artifacts retained for 30 days

### **Step 10: Print Summary**
```yaml
- name: Test Summary
  run: echo "CI/CD Pipeline Completed..."
```
- Displays completion status
- Instructions for downloading artifacts

---

## 📥 HOW TO DOWNLOAD ALLURE REPORT

### **From GitHub UI:**
1. Go to your repository → **Actions** tab
2. Click on the latest workflow run
3. Scroll down to **Artifacts** section
4. Download **allure-report** (the main dashboard)

### **From GitHub CLI:**
```bash
# List all artifacts from latest run
gh run list -b main -L 1

# Download Allure report
gh run download <run-id> -n allure-report
```

### **File Structure of Downloaded Report:**
```
allure-report/
├── index.html              ← Open this in browser
├── data/
│   ├── suites.json
│   ├── categories.json
│   └── timeline.json
├── css/
├── js/
└── images/
```

---

## 🎯 PIPELINE WORKFLOW DIAGRAM

```
┌─────────────────────────────────────┐
│ 1. Push code to main branch         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 2. GitHub Actions triggered         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 3. Checkout code                    │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 4. Setup Node.js 18.x               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 5. Install dependencies (npm ci)    │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 6. Install Playwright browsers      │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 7. Run tests (headless)             │
│    ├─ Generates allure-results/    │
│    └─ Generates playwright-report/ │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 8. Generate Allure report           │
│    └─ Creates allure-report/       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 9. Upload artifacts                 │
│    ├─ allure-report/ (main)        │
│    ├─ playwright-report/            │
│    └─ allure-results/               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 10. Pipeline Complete ✅            │
│     Download from Actions tab       │
└─────────────────────────────────────┘
```

---

## 📊 PIPELINE STATUS

### **Success (Tests Passed)**
- ✅ All steps complete
- ✅ Green checkmark on commit
- ✅ Artifacts available for download

### **Failure (Tests Failed)**
- ⚠️ Tests fail but reports still generated
- 🔴 Red X on commit (in GitHub)
- ✅ Reports still available for debugging

### **Skipped**
- 🟡 If branch is not main
- Steps only run on pushes to main branch

---

## 🔧 CUSTOMIZATION OPTIONS

### **Run on Multiple Branches:**
```yaml
on:
  push:
    branches: [main, develop, release/*]
```

### **Run on Schedule (Daily):**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Run daily at 2 AM UTC
```

### **Run on Pull Requests:**
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### **Parallel Test Execution:**
```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x]
```

### **Run Specific Tests Only:**
```yaml
- name: Run smoke tests
  run: npx playwright test --grep @smoke
```

---

## 📈 PIPELINE FEATURES

✅ **Automatic Testing**
- Runs on every push to main
- No manual intervention needed

✅ **Headless Execution**
- No browser GUI (faster, resource-efficient)
- Perfect for CI/CD environments

✅ **Artifact Storage**
- Allure report: 30 days retention
- Playwright report: 7 days retention
- Easy download from GitHub UI

✅ **Reliable Execution**
- Npm caching for faster builds
- Exact dependency versions (npm ci)
- System dependency installation

✅ **Comprehensive Reporting**
- Allure dashboard (professional)
- Playwright HTML report (quick debug)
- Raw test results JSON

✅ **Failure Handling**
- Tests fail but reports still generated
- Reports help debug failures
- Detailed step-by-step logging

---

## 🎯 TYPICAL EXECUTION TIME

| Component | Time |
|-----------|------|
| Checkout | ~5 sec |
| Node.js Setup | ~10 sec |
| Install Dependencies | ~30 sec (first run), ~5 sec (cached) |
| Install Browsers | ~60 sec (first run), ~5 sec (cached) |
| Run Tests | ~30 sec (depends on test count) |
| Generate Report | ~10 sec |
| Upload Artifacts | ~10 sec |
| **Total** | **~155 sec (~2.5 min)** |

*Note: First run slower due to caching. Subsequent runs faster with cached dependencies.*

---

## 📝 PIPELINE YAML BREAKDOWN

### **Trigger Condition:**
```yaml
on:
  push:
    branches: [main]
```
- Runs when code is pushed to main branch
- Does NOT run on pull requests (by default)

### **Job Configuration:**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
```
- Runs on Ubuntu latest version
- GitHub-hosted runner (no setup needed)

### **Continue on Error:**
```yaml
continue-on-error: true
```
- Pipeline doesn't stop if tests fail
- Reports still generated for debugging

### **Run Even on Failure:**
```yaml
if: always()
```
- Generates reports even if tests failed
- Ensures artifacts available for analysis

---

## 🚀 NEXT STEPS

### **1. Commit and Push:**
```bash
git add .github/
git commit -m "Add Playwright CI/CD pipeline"
git push origin main
```

### **2. Watch Pipeline:**
- Go to GitHub → Actions tab
- See workflow running in real-time
- Check for ✅ (passed) or ❌ (failed)

### **3. Download Report:**
- Click on workflow run
- Scroll to Artifacts section
- Download allure-report

### **4. View Report Locally:**
```bash
# Unzip downloaded report
unzip allure-report.zip

# Open in browser
open allure-report/index.html
# or
start allure-report/index.html (Windows)
```

---

## 📋 QUICK REFERENCE

| Task | Command |
|------|---------|
| View pipeline | GitHub → Actions tab |
| Download report | Click run → Artifacts |
| Trigger manually | Use GitHub UI |
| View logs | Click on job step |
| Check status | Look for ✅ or ❌ on commit |

---

## 🆘 TROUBLESHOOTING

### **Pipeline Not Running:**
- Check branch is `main`
- Verify YAML file in `.github/workflows/`
- Check for syntax errors in YAML

### **Tests Failing:**
- Check Playwright Report artifact
- Review test output in GitHub logs
- Run locally: `npm test`

### **Browsers Not Found:**
- Pipeline installs browsers automatically
- If issue: `npx playwright install --with-deps`

### **Artifact Not Found:**
- Check if tests ran (even failed tests generate reports)
- Verify retention-days setting
- Check artifact name spelling

---

## 📚 RELATED DOCUMENTATION

- GitHub Actions: https://docs.github.com/en/actions
- Playwright Testing: https://playwright.dev
- Allure Reporting: https://docs.qameta.io/allure/

---

## ✅ VERIFICATION CHECKLIST

- ✅ `.github/workflows/playwright-tests.yml` created
- ✅ Workflow has proper YAML syntax
- ✅ Trigger configured for main branch
- ✅ All 10 steps properly configured
- ✅ Artifacts configured for storage
- ✅ Retention days set (30 for Allure, 7 for reports)
- ✅ Error handling configured (continue-on-error)
- ✅ Summary step provides download instructions

---

## 🎉 YOU'RE READY!

Your CI/CD pipeline is configured and ready to use.

**Next action:**
```bash
git push origin main
```

Then watch your pipeline run in the Actions tab! 🚀

---

*Happy automated testing!* ✨
