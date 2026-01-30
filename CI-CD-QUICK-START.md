# 🚀 CI/CD Pipeline - Quick Start Guide

## ⚡ WHAT WAS CREATED

**File:** `.github/workflows/playwright-tests.yml`

A complete GitHub Actions pipeline that:
1. ✅ Triggers on every push to main branch
2. ✅ Installs dependencies
3. ✅ Runs Playwright tests in headless mode
4. ✅ Generates Allure report
5. ✅ Stores report as artifact

---

## 📥 HOW TO USE

### **Step 1: Commit and Push**
```bash
git add .github/
git commit -m "Add Playwright CI/CD pipeline"
git push origin main
```

### **Step 2: Watch Pipeline Run**
1. Go to GitHub repository
2. Click **Actions** tab
3. See workflow running automatically

### **Step 3: Download Allure Report**
1. Click on the workflow run
2. Scroll down to **Artifacts** section
3. Download **allure-report**
4. Unzip and open `index.html` in browser

---

## 📊 PIPELINE STEPS

```
Code Push → Tests Run → Allure Report Generated → Artifacts Stored
```

### **Each Run Produces:**
- ✅ Allure Report (professional dashboard)
- ✅ Playwright Report (quick debug)
- ✅ Test Results JSON (raw data)

---

## 🎯 KEY FEATURES

✅ **Automatic** - Runs on every push to main  
✅ **Headless** - No GUI, faster execution  
✅ **Reports** - Beautiful Allure dashboard  
✅ **Artifacts** - 30-day storage  
✅ **Logging** - Detailed step-by-step logs  

---

## 📈 EXECUTION FLOW

```
TRIGGER: Push to main
   ↓
CHECKOUT: Get your code
   ↓
SETUP: Install Node.js
   ↓
INSTALL: npm ci (install dependencies)
   ↓
BROWSERS: Install Playwright browsers
   ↓
TESTS: Run npm test (headless)
   ↓
REPORT: Generate Allure report
   ↓
ARTIFACTS: Store all reports
   ↓
DONE: Ready to download ✅
```

---

## ⏱️ TYPICAL TIMING

- First Run: ~2.5 minutes
- Subsequent Runs: ~1-2 minutes (with caching)

---

## 📥 DOWNLOAD INSTRUCTIONS

### **From GitHub UI:**
1. Repository → **Actions** tab
2. Click latest workflow run
3. Scroll to **Artifacts**
4. Download **allure-report**

### **View Report Locally:**
```bash
# Unzip downloaded file
unzip allure-report.zip

# Open in browser
# Windows: start allure-report/index.html
# Mac: open allure-report/index.html
# Linux: firefox allure-report/index.html
```

---

## 🔍 WHAT YOU'LL SEE

### **In GitHub Actions:**
- ✅ Green checkmark = All tests passed
- ❌ Red X = Some tests failed
- 📊 Artifacts available for download
- 📝 Detailed logs for each step

### **In Allure Report:**
- Overview dashboard with metrics
- Test suite results
- Execution timeline
- Categories and filters
- Screenshots & videos of failures

---

## ⚙️ CUSTOMIZATION OPTIONS

### **Run on Multiple Branches:**
Edit `playwright-tests.yml`:
```yaml
on:
  push:
    branches: [main, develop]  # Add branches here
```

### **Run on Schedule:**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

### **Run Specific Tests:**
```yaml
- name: Run smoke tests
  run: npx playwright test --grep @smoke
```

---

## 🆘 TROUBLESHOOTING

### **Pipeline not running?**
- Verify file is in `.github/workflows/playwright-tests.yml`
- Check branch is `main`
- Wait 1-2 minutes for GitHub to detect changes

### **Tests failing?**
- Click on workflow run
- Check test output in logs
- Download Playwright Report for details

### **Artifact not showing?**
- Ensure tests completed (even failed tests create artifacts)
- Wait a moment for upload to finish
- Refresh the page

---

## 📋 PIPELINE YAML SUMMARY

The workflow file contains:
- **Trigger:** Push to main branch
- **Environment:** Ubuntu latest + Node.js 18.x
- **10 Steps:**
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Install Playwright browsers
  5. Run tests (headless)
  6. Generate Allure report
  7. Upload Allure report (30-day retention)
  8. Upload Playwright report (7-day retention)
  9. Upload test results (7-day retention)
  10. Print summary

---

## 🎯 NEXT STEPS

1. ✅ Review file: `.github/workflows/playwright-tests.yml`
2. ✅ Commit and push to main branch
3. ✅ Go to GitHub Actions tab
4. ✅ Download Allure report from artifacts
5. ✅ Share report with team

---

## 📚 MORE INFO

See **CI-CD-PIPELINE.md** for:
- Detailed step explanations
- Customization options
- Advanced configurations
- Troubleshooting guide

---

## ✨ YOU'RE READY!

Your pipeline is configured and waiting for first push.

```bash
git push origin main
```

Then watch it run in GitHub Actions! 🚀

---

**Happy automated testing!**
