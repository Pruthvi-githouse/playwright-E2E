# Playwright Config - Reporter Setup Explained

## Current Configuration ✅

**File:** `playwright.config.js`

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  
  // ========== REPORTERS CONFIGURATION ==========
  reporter: [
    ['html'],                                        // Built-in HTML report
    ['junit', { outputFile: 'results/junit-results.xml' }],  // JUnit XML (CI/CD)
    ['allure-playwright']                            // Allure reporter (MAIN)
  ],
  // ===============================================

  use: {
    baseURL: 'https://uat-agent.ebixcard.com',
    trace: 'on-first-retry',                 // Record trace on first retry
    screenshot: 'only-on-failure',          // Screenshot on failure
    video: 'retain-on-failure'              // Video on failure
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],
});
```

---

## What Each Reporter Does

### 1. **HTML Reporter** ✅ Built-in
```javascript
['html']
```

**Output:** `test-results/` folder

**Features:**
- 📊 Basic test results dashboard
- 🖼️ Screenshots on failure
- 🎥 Videos on failure
- 📈 Test timeline
- ✅ Quick pass/fail overview

**Open Report:**
```bash
npx playwright show-report
```

---

### 2. **JUnit Reporter** ✅ CI/CD Compatible
```javascript
['junit', { outputFile: 'results/junit-results.xml' }]
```

**Output:** `results/junit-results.xml`

**Features:**
- 📝 XML format (standard for CI/CD)
- 🔄 Jenkins compatible
- 🔗 GitHub Actions integration
- 📊 Test metrics for reporting

**Used By:**
- Jenkins
- GitHub Actions
- GitLab CI
- Azure Pipelines

**Format Example:**
```xml
<testsuites>
  <testsuite name="Card Balance - Get Statement Workflow" tests="1" failures="0">
    <testcase name="should complete card balance and get statement workflow" 
              classname="cardBalance.spec.js" time="10.9"/>
  </testsuite>
</testsuites>
```

---

### 3. **Allure Reporter** ✅ Professional Dashboard
```javascript
['allure-playwright']
```

**Output:** `allure-results/` folder

**Features:**
- 🎨 Professional dashboard
- 📊 Detailed analytics
- 🔍 Test categorization
- 📈 Trend analysis
- 🎯 Custom categories
- 📎 Attachments per test
- ⏱️ Performance metrics
- 🔄 Historical data

**Generated Files:**
```
allure-results/
├── [uuid]-result.json          (Test result)
├── [uuid]-testresult.json      (Test metadata)
├── attachments/
│   ├── [uuid].png              (Screenshot)
│   ├── [uuid].webm             (Video)
│   └── [uuid].json             (Logs)
└── categories.json             (Categories)
```

**Generate Report:**
```bash
allure generate allure-results --clean -o allure-report
```

**View Report:**
```bash
allure open allure-report
# or
allure serve allure-results    # With trends
```

---

## How Allure Captures Data

### Step 1: Test Execution
```javascript
test('My test', async ({ page }) => {
  await page.goto('...');        // Action
  await page.fill('...', 'text'); // Action
  await page.click('...');        // Action
});
```

### Step 2: Allure Captures
```
✅ Test name
✅ Test status (pass/fail)
✅ Execution time
✅ Full page object interactions
✅ Console logs
✅ Screenshots (on failure)
✅ Videos (on failure)
✅ Error messages
```

### Step 3: Store in allure-results/
```
allure-results/
├── [uuid]-result.json
│   {
│     "uuid": "abc123",
│     "name": "should complete card balance...",
│     "fullName": "Card Balance - Get Statement Workflow should complete...",
│     "status": "PASSED",
│     "stage": "finished",
│     "start": 1706564400000,
│     "stop": 1706564410900,
│     "duration": 10900,
│     "steps": [],
│     "attachments": [
│       {
│         "name": "stdout",
│         "source": "[uuid].json",
│         "type": "application/json"
│       }
│     ]
│   }
```

### Step 4: Generate Report
```bash
allure generate allure-results --clean -o allure-report
```

**Processing:**
1. Read all JSON files from `allure-results/`
2. Process attachments from `attachments/` folder
3. Calculate statistics
4. Build HTML dashboard in `allure-report/`

### Step 5: View Report
```
allure-report/
├── index.html                  (Dashboard)
├── data/
│   ├── suites.json
│   ├── categories.json
│   └── timeline.json
├── css/ (styling)
├── js/ (interactivity)
└── images/ (assets)
```

---

## Configuration Options for Allure

### Default (Recommended)
```javascript
reporter: [
  ['allure-playwright']
]
```

### Custom Output Directory
```javascript
reporter: [
  ['allure-playwright', {
    outputFolder: 'custom-allure-results'
  }]
]
```

### Multiple Reporters (Current Setup)
```javascript
reporter: [
  ['html'],                                    // Quick view
  ['junit', { outputFile: 'results/junit-results.xml' }],  // CI/CD
  ['allure-playwright']                        // Professional
]
```

**Why all three?**
- `html` - Quick local testing
- `junit` - CI/CD pipelines
- `allure` - Professional reporting & trends

---

## Complete Workflow

```
┌──────────────────────────────┐
│ npm run test:allure          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ npx playwright test          │
│ (runs all tests)             │
└──────────┬───────────────────┘
           │
    ┌──────┴──────┬─────────┐
    ▼             ▼         ▼
┌────────┐  ┌─────────┐  ┌──────────┐
│HTML    │  │JUnit    │  │Allure    │
│Results │  │XML      │  │Results   │
└────────┘  └─────────┘  └──────────┘
    │           │             │
    ▼           ▼             ▼
test-results/ results/ allure-results/


Then:
┌──────────────────────────────┐
│ npm run allure:report        │
│ (generate HTML from results) │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ allure-report/ (HTML)        │
│ Professional dashboard       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ npm run allure:open          │
│ (open in browser)            │
└──────────────────────────────┘
```

---

## Your Current Setup Summary

✅ **Reporters Configured:**
- HTML (Local quick check)
- JUnit (CI/CD integration)
- Allure Playwright (Professional reporting)

✅ **Scripts Added:**
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

✅ **Packages Installed:**
- `@playwright/test` - Test framework
- `allure-playwright` - Reporter
- `allure-commandline` - CLI (global)

---

## Ready to Use!

```bash
# Run tests and view professional Allure report
npm run test:allure
```

Done! 🚀
