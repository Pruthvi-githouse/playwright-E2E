# Allure Reporting Setup Guide for Playwright

## ✅ Current Status

Your project is **ready for Allure reporting**. All required packages are installed.

---

## 1️⃣ REQUIRED PACKAGES

```json
{
  "devDependencies": {
    "@playwright/test": "^1.58.0",
    "allure-playwright": "^3.4.5"
  }
}
```

**Installed Packages:**
- ✅ `allure-playwright` (^3.4.5) - Playwright reporter for Allure
  - Automatically generates `allure-results/` folder
  - Captures test results, steps, attachments, and logs
  
- ✅ `allure-commandline` (global) - CLI tool to generate & serve reports

**Installation:**
```bash
npm install --save-dev @playwright/test allure-playwright
npm install -g allure-commandline
```

---

## 2️⃣ PLAYWRIGHT CONFIG - Reporter Configuration

**File:** `playwright.config.js`

```javascript
reporter: [
  ['html'],  // Standard HTML report
  ['junit', { outputFile: 'results/junit-results.xml' }],  // JUnit XML
  ['allure-playwright']  // Allure reporter (generates allure-results/)
],
```

**What happens:**
- When tests run, `allure-playwright` captures test execution data
- Data is stored in `allure-results/` folder (auto-created)
- Each test gets a JSON file with: status, duration, steps, attachments, logs

---

## 3️⃣ HOW ALLURE-RESULTS FOLDER IS GENERATED

### Flow:
```
1. Run tests: npx playwright test
   ↓
2. allure-playwright reporter captures:
   - Test name, status (pass/fail), duration
   - Console logs, screenshots, videos
   - Test steps (from test code)
   ↓
3. Stores data in: allure-results/
   - Contains JSON files per test run
   - Contains attachment files (images, videos)
   ↓
4. Generate report: allure generate allure-results --clean -o allure-report
   - Processes JSON files from allure-results/
   - Creates HTML dashboard in allure-report/ folder
```

### Folder Structure:
```
allure-results/
├── [uuid]-result.json       (Test execution result)
├── [uuid]-testresult.json   (Test metadata)
├── attachments/
│   ├── [uuid].png           (Screenshots)
│   ├── [uuid].webm          (Videos)
│   └── [uuid].json          (Logs)
└── categories.json          (Custom categories)

allure-report/
├── index.html              (Main dashboard)
├── css/, js/, images/      (Assets)
└── data/                   (Report data)
```

---

## 4️⃣ COMMANDS - Run Tests & Generate Reports

### **Option 1: Run Tests Only**
```bash
npm test
# or with headed mode
npm run test:headed
```

### **Option 2: Run Tests + Generate Report**
```bash
npm run test:allure
# This runs: test → generate report → open in browser
```

### **Option 3: Run Specific Test**
```bash
npm run test:cardBalance
```

### **Option 4: Generate Report from Existing Results**
```bash
# If you already have allure-results/ folder from previous runs
npm run allure:report
```

### **Option 5: Serve Allure Report (Live Server)**
```bash
# Real-time report with trend history
npm run allure:serve
```

### **Option 6: Open Generated Report**
```bash
# Opens allure-report/ in browser
npm run allure:open
```

---

## 5️⃣ QUICK START - STEP BY STEP

### First Time Setup:
```bash
# 1. Run all tests and generate Allure report
npm run test:allure

# This will:
# ✅ Execute all tests in tests/ folder
# ✅ Capture results in allure-results/
# ✅ Generate HTML dashboard in allure-report/
# ✅ Auto-open report in default browser
```

### If Tests Already Ran:
```bash
# Generate report from existing results
npm run allure:report

# Then open it
npm run allure:open
```

### Development Workflow:
```bash
# Run tests and regenerate report
npm test && npm run allure:report && npm run allure:open
```

---

## 6️⃣ ALLURE REPORT SECTIONS EXPLAINED

### **📊 Overview Dashboard**
```
┌─────────────────────────────────────────┐
│ Total Tests: 12                         │
│ ✅ Passed: 10 (83%)                     │
│ ❌ Failed: 2  (17%)                     │
│ ⏭️  Skipped: 0                          │
│                                         │
│ Duration: 2m 45s                        │
│ Pass Rate: 83.3%                        │
└─────────────────────────────────────────┘
```

**Shows:**
- Total test count and execution status
- Pass/fail percentages in pie/bar chart
- Execution timeline and duration
- Test stability trends (if run multiple times)

---

### **📋 Suites**
```
Test Suite Tree:
├── Login Tests
│   ├── ✅ should have visible login form elements
│   ├── ✅ should fill login form with credentials
│
├── Card Balance Tests
│   ├── ✅ should complete card balance and get statement workflow
│
└── Transaction Tests
    ├── ✅ should successfully create a transaction
    ├── ❌ should handle validation errors
```

**Shows:**
- Hierarchical test organization
- Individual test results (pass/fail)
- Test duration
- Click to see detailed steps for each test

---

### **🏷️ Categories**
```
By Status:
├── Passed (10)
├── Failed (2)
├── Skipped (0)

By Severity:
├── Blocker (1)
├── Critical (4)
├── Major (5)
├── Minor (2)

By Epic/Feature (if tagged):
├── Authentication (2 tests)
├── Card Operations (3 tests)
└── Transactions (7 tests)
```

**Shows:**
- Test grouping by custom categories
- Filter tests by severity, feature, owner
- Custom classifications (if tagged in test code)

---

### **📈 Timeline**
```
Test Execution Timeline:
┌──────────┬──────────┬──────────┬──────────┐
│ Test 1   │ Test 2   │ Test 3   │ Test 4   │
│ 12.3s    │ 8.5s     │ 15.2s    │ 9.1s     │
└──────────┴──────────┴──────────┴──────────┘
```

**Shows:**
- Parallel/sequential test execution
- Individual test duration
- Performance bottlenecks

---

### **📎 Attachments**
Each test can have:
- 📸 Screenshots (on failure)
- 🎥 Videos (on failure)
- 📝 Console logs
- 📄 Error stack traces

Accessible by clicking on individual test

---

## 7️⃣ ENHANCE REPORTS - Add Test Steps & Categories

### Add Steps to Tests:
```javascript
const { test } = require('@playwright/test');
const allure = require('allure-playwright');

test('Login workflow', async ({ page }) => {
  await allure.step('Step 1: Navigate to login', async () => {
    await page.goto('https://...');
  });

  await allure.step('Step 2: Enter credentials', async () => {
    await page.fill('input[name="email"]', 'test@test.com');
  });

  await allure.step('Step 3: Click login', async () => {
    await page.click('button[type="submit"]');
  });
});
```

**Result in Allure:** Each step shows in test details with status & duration

### Add Categories/Tags:
```javascript
test.describe('Authentication', () => {
  test('@critical @smoke should login', async ({ page }) => {
    // test code
  });
});
```

---

## 8️⃣ YOUR CURRENT SETUP

✅ **Ready to use:**
```bash
# Run cardBalance test with Allure report
npm run test:cardBalance

# Then generate and open report
npm run allure:report && npm run allure:open
```

✅ **Scripts available:**
```json
{
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:cardBalance": "npx playwright test tests/cardBalance.spec.js --headed",
  "allure:report": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report",
  "allure:serve": "allure serve allure-results",
  "test:allure": "npx playwright test && npm run allure:report && npm run allure:open"
}
```

---

## 9️⃣ TROUBLESHOOTING

### Q: Report shows "No data"
**A:** 
```bash
# Clear old results and run again
rm -r allure-results allure-report
npm test
npm run allure:report
```

### Q: Report won't open
**A:**
```bash
# Use serve instead (keeps live data)
npm run allure:serve
# Opens at: http://localhost:4040
```

### Q: How to preserve test history?
**A:** Use `allure serve` instead of `allure open`
- Maintains trend data across runs
- Shows historical pass rates
- Tracks flaky tests

### Q: How to exclude certain tests from report?
**A:**
```javascript
test.skip('Disabled test', async ({ page }) => {
  // Won't appear in report
});
```

---

## 🎯 RECOMMENDED WORKFLOW

```bash
# Development: Run single test with Allure
npm run test:cardBalance && npm run allure:report && npm run allure:open

# Before commit: Run all tests with report
npm run test:allure

# CI/CD: Generate report with history
npm run allure:serve
```

---

**All set!** Your project is ready for professional Allure reporting. 🚀
