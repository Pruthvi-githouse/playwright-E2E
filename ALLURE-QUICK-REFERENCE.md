# Allure Reporting - Quick Reference Card

## ✅ Setup Complete!

Your Playwright project is fully configured for Allure reporting.

---

## 📦 Packages Installed

```
✅ allure-playwright@3.4.5    (Playwright reporter)
✅ allure-commandline         (CLI tool - global)
✅ @playwright/test@1.58.0    (Playwright framework)
```

---

## 🚀 Quick Commands

### **Run Tests & Generate Report (One Command)**
```bash
npm run test:allure
```
This does:
1. Executes all tests
2. Captures results in `allure-results/`
3. Generates HTML dashboard in `allure-report/`
4. Opens report in browser automatically

---

### **Run Specific Test with Report**
```bash
npm run test:cardBalance
npm run allure:report
npm run allure:open
```

---

### **Just Run Tests (No Report)**
```bash
npm test                    # Run all tests
npm run test:headed         # Run with browser visible
npm run test:debug          # Debug mode
```

---

### **Just Generate Report from Existing Results**
```bash
npm run allure:report       # Generate from allure-results/
npm run allure:open         # Open in browser
```

---

### **Live Server (Best for Trends & History)**
```bash
npm run allure:serve        # Starts at http://localhost:4040
```
- Maintains test history
- Shows trend data
- Real-time updates

---

## 📊 Report Sections

### **1. Overview Dashboard**
- **Total Tests** - Count of all tests
- **Pass Rate %** - Green for pass, red for fail
- **Execution Time** - Total duration
- **Pie Chart** - Visual pass/fail distribution

### **2. Suites**
- **Test Organization** - Organized by describe blocks
- **Individual Results** - Each test with status
- **Test Duration** - Time per test
- **Failures** - Error messages and stack traces

### **3. Timeline**
- **Execution Order** - Sequential test execution
- **Duration Bars** - Visual duration comparison
- **Bottlenecks** - Slowest tests highlighted

### **4. Categories**
- **By Status** - Passed, Failed, Skipped
- **By Severity** - If tagged in code
- **By Feature** - If organized in code

### **5. Attachments** (per test)
- **Screenshots** - On failure
- **Videos** - On failure  
- **Logs** - Console output
- **Stack Traces** - Error details

---

## 📁 Folder Structure Generated

```
playwright-automation-project/
│
├── allure-results/              ← AUTO-CREATED (test data)
│   ├── [uuid]-result.json
│   ├── [uuid]-testresult.json
│   ├── attachments/
│   │   ├── [uuid].png
│   │   └── [uuid].webm
│   └── categories.json
│
├── allure-report/               ← AUTO-CREATED (HTML dashboard)
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── data/
│   └── ...
│
├── test-results/                ← Playwright HTML report
├── results/
│   └── junit-results.xml         ← JUnit XML format
│
└── tests/
    ├── cardBalance.spec.js
    ├── createTransaction.spec.js
    ├── login.spec.js
    └── pages/

```

---

## 🔄 Flow Diagram

```
┌─────────────────────┐
│  npm run test:allure│
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────┐
│ npx playwright test      │  (Runs all tests)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ allure-results/ created  │  (Test execution data)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ allure generate          │  (Process results)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ allure-report/ created   │  (HTML dashboard)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Browser opens report     │  (View results)
└──────────────────────────┘
```

---

## 📝 Your Current Test

### **cardBalance.spec.js**
```
Test Suite: Card Balance - Get Statement Workflow
├── ✅ should complete card balance and get statement workflow
│   ├── Step 1: Navigate to login page
│   ├── Step 2: Login with credentials
│   ├── Step 3: Skip password setup modal
│   ├── Step 4: Navigate to Card Balance
│   ├── Step 5: Enter Card Number
│   ├── Step 6: Click Get Statement
│   ├── Step 7: Logout
│   │
│   └── Result: PASSED (10.9s)
```

---

## 🎯 Typical Workflow

### Day 1: Initial Setup ✅ (DONE)
```bash
npm install --save-dev @playwright/test allure-playwright
npm install -g allure-commandline
# Configure playwright.config.js (DONE ✅)
```

### Daily: Run Tests & Generate Report
```bash
# Quick check - single test
npm run test:cardBalance && npm run allure:report && npm run allure:open

# Or full suite
npm run test:allure
```

### Weekly: Review Trends
```bash
# Server with historical data
npm run allure:serve
# Open http://localhost:4040
```

---

## 🛠️ Customization Examples

### Add Test Steps to Report
```javascript
const allure = require('allure-playwright');

test('My test', async ({ page }) => {
  await allure.step('User navigates to login', async () => {
    await page.goto('...');
  });
  
  await allure.step('User enters credentials', async () => {
    await page.fill('input[name="email"]', 'test@test.com');
  });
});
```

### Tag Tests for Categories
```javascript
test('Login @critical @smoke', async ({ page }) => {
  // This test shows under "Critical" and "Smoke" categories
});
```

### Add Severity
```javascript
const allure = require('allure-playwright');

test('Payment test', async ({ page }) => {
  await allure.severity('critical');
  // This test marked as critical severity
});
```

---

## ⚡ Tips & Tricks

| Action | Command |
|--------|---------|
| Run all tests | `npm test` |
| Run with browser visible | `npm run test:headed` |
| Run specific test | `npm run test:cardBalance` |
| Generate report only | `npm run allure:report` |
| View report in browser | `npm run allure:open` |
| Live server with history | `npm run allure:serve` |
| Full workflow (1 command) | `npm run test:allure` |

---

## 📊 Report Quality Tips

1. **Add Steps** - Makes report more readable
2. **Take Screenshots** - On failures (auto in playwright.config.js)
3. **Record Videos** - On failures (auto in playwright.config.js)
4. **Use Descriptions** - Clear test names in `.describe()` and `.test()`
5. **Tag Tests** - Use @critical, @smoke, @regression for filtering
6. **Run Frequently** - Trends show up after multiple runs

---

## 🆘 Troubleshooting

### Report shows "No tests"
```bash
# Delete old results and re-run
rm -r allure-results allure-report
npm test
npm run allure:report
```

### Port 4040 already in use (for allure:serve)
```bash
# Allure will pick a different port automatically
npm run allure:serve
# Check the terminal output for the new URL
```

### Report won't open
```bash
# Try the serve method instead (more reliable)
npm run allure:serve
# Manually open http://localhost:4040
```

---

## 📚 Next Steps

1. ✅ Run your first test with Allure
   ```bash
   npm run test:cardBalance && npm run allure:report
   ```

2. ✅ Add more tests to the suite
   ```bash
   # tests/login.spec.js
   # tests/createTransaction.spec.js
   ```

3. ✅ Run full suite with report
   ```bash
   npm run test:allure
   ```

4. ✅ Use live server to track trends
   ```bash
   npm run allure:serve
   ```

---

**Your Allure reporting is ready to use!** 🎉
