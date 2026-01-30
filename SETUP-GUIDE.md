# Playwright Automation Setup - Complete Guide

## Project Created At
`C:\playwright-automation-project`

## ✅ Project Structure

```
playwright-automation-project/
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── playwright.config.js         # Playwright configuration
├── package.json                 # Dependencies (Playwright, Allure)
├── package-lock.json            # Lock file (already installed)
├── README.md                     # Full documentation
├── tests/
│   ├── login.spec.js           # Example test file
│   ├── pages/
│   │   ├── basePage.js         # Base page object (common methods)
│   │   └── loginPage.js        # Login page example
│   └── utils/
│       └── testData.js         # Test data constants
├── node_modules/               # Dependencies (auto-generated)
└── results/
    └── allure-results/         # Allure report data (auto-generated)
```

---

## 📋 NPM Commands - Quick Reference

```bash
# Run tests (headed browser, default)
npm test

# Run tests in UI debug mode
npm run test:debug

# Explicitly run tests in headed mode
npm run test:headed

# View HTML report
npm run test:report

# Generate and view Allure report
npm run allure:report

# Run specific test file
npx playwright test tests/login.spec.js

# Run specific test by name
npx playwright test -g "should successfully login"

# Run with trace viewer
npx playwright test --trace on

# Run in UI mode (interactive)
npx playwright test --ui
```

---

## 🔧 File Explanations

### **playwright.config.js** - Main Configuration
```javascript
- headless: false           → Runs browser visibly (headed mode)
- testDir: './tests'        → Where test files are located
- reporter: [...]           → Enables 3 reporters:
    • HTML report
    • JUnit XML report
    • Allure reporting
- workers: 1                → Single worker (good for POC)
- retries: 0                → No auto-retries (set to 2 in CI)
- use: {...}                → Default browser settings
    • screenshot: only-on-failure
    • video: retain-on-failure
    • trace: on-first-retry
```

### **tests/pages/basePage.js** - Reusable Page Object
```javascript
Base class for all page objects providing:
- goto(path)                → Navigate to URL
- fill(selector, text)      → Fill input fields
- click(selector)           → Click elements
- getText(selector)         → Get element text
- waitForElement(selector)  → Wait for visibility
- isVisible(selector)       → Check if visible
- takeScreenshot(name)      → Capture screenshots
```

### **tests/pages/loginPage.js** - Page Object Example
```javascript
Extends BasePage with login-specific methods:
- login(username, password) → Perform login flow
- getErrorMessage()         → Get error text
- isErrorVisible()          → Check error visibility
```

### **tests/utils/testData.js** - Test Data
```javascript
Centralized test data:
- validUser:        { username, password }
- invalidUser:      { username, password }
- emptyCredentials: { username, password }
```

### **tests/login.spec.js** - Example Test File
```javascript
3 example tests demonstrating:
- Page object usage
- Assertions with expect()
- beforeEach hooks
- Allure auto-integration
```

---

## 🚀 Quick Start (After Setup)

### 1. Update configuration
```bash
# Edit playwright.config.js
# Change baseURL to your app: https://your-app.com
```

### 2. Create page objects for your app
```bash
# Example: tests/pages/dashboardPage.js
# Extend BasePage and add selectors/methods
```

### 3. Write your tests
```bash
# Example: tests/dashboard.spec.js
# Use page objects in your tests
```

### 4. Run tests
```bash
npm test
```

### 5. View Allure reports
```bash
npm run allure:report
```

---

## ⚙️ Installed Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.48.0 | Test runner & assertions |
| `allure-playwright` | ^2.13.2 | Allure reporting integration |

---

## 📊 Allure Reporting

### Prerequisites (First Time Only)
```bash
npm install -g allure-commandline@latest
```

### Generate Reports
```bash
npm run allure:report
```

This will:
1. Collect test results from `results/allure-results/`
2. Generate HTML report in `results/allure-report/`
3. Open it automatically in your browser

### What Allure Captures
- ✅ Test execution timeline
- ✅ Pass/fail statistics  
- ✅ Screenshots on failure
- ✅ Video recordings
- ✅ Logs & traces
- ✅ Detailed test steps

---

## 🎯 Best Practices

| Practice | Why | Example |
|----------|-----|---------|
| **Page Objects** | Maintainability | Keep selectors in page classes, not tests |
| **Test Data** | Consistency | Centralize in `testData.js` |
| **Explicit Waits** | Reliability | Use `waitForElement()` not `wait(5000)` |
| **Assertions** | Clarity | Use `expect()` for readable assertions |
| **Single Responsibility** | Clarity | Each test should verify one feature |
| **Descriptive Names** | Understanding | `test('should show error on invalid login')` |

---

## 🐛 Troubleshooting

### **Tests don't run**
```bash
# Check if Playwright is installed
npm ls @playwright/test

# Reinstall if needed
npm install
```

### **Headed mode not working**
```bash
# Verify in playwright.config.js:
headless: false  // Should be this, not true
```

### **Allure report not generating**
```bash
# Check if allure-playwright is installed
npm ls allure-playwright

# Ensure results folder exists
mkdir -p results/allure-results

# Check for test result files
ls results/allure-results/  # Should have .json files
```

### **Selectors not matching**
```bash
# Use Playwright Inspector
npx playwright test --debug

# Or test selector in UI mode
npx playwright test --ui
```

---

## 📚 Additional Resources

- [Playwright Docs](https://playwright.dev)
- [Playwright Testing](https://playwright.dev/docs/api/class-test)
- [Allure Reporting](https://allurereport.org)
- [Page Object Model](https://playwright.dev/docs/pom)

---

## ✨ What's Next?

1. ✅ Update `baseURL` in `playwright.config.js`
2. ✅ Create page objects for your application
3. ✅ Add test cases in `tests/` directory
4. ✅ Run tests with `npm test`
5. ✅ Generate reports with `npm run allure:report`
6. ✅ Integrate into CI/CD pipeline

---

**Setup Date:** January 30, 2026  
**Playwright Version:** 1.58.0  
**Status:** ✅ Production-Ready
