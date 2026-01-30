# GitHub Actions Workflow - Technical Reference

## File Structure

```
your-repo/
├── .github/
│   └── workflows/
│       └── playwright-tests.yml    ← CI/CD Pipeline (THIS FILE)
├── tests/
├── package.json
└── playwright.config.js
```

---

## YAML File Breakdown

### **1. Workflow Name**
```yaml
name: Playwright Tests with Allure Report
```
- Displayed in GitHub Actions UI
- Shows in workflow history

### **2. Trigger (on:)**
```yaml
on:
  push:
    branches: [main]
```
- Runs when code is pushed to main branch
- Can be extended to multiple branches, schedules, or pull requests

### **3. Jobs Definition**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
```
- Defines job named "test"
- Runs on Ubuntu latest container
- GitHub provides the runner automatically

### **4. Matrix Strategy (Optional)**
```yaml
strategy:
  fail-fast: false
  matrix:
    node-version: [18.x]
```
- Can run tests on multiple Node versions
- `fail-fast: false` means all versions run even if one fails

### **5. Steps (The Actual Work)**

Each step is a task in the pipeline:

```yaml
steps:
  - name: Step Name
    run: command to execute
    # or
    uses: action/from/marketplace@version
```

---

## Each Step Explained

### **Step: Checkout Code**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```
- Action from GitHub marketplace
- Clones your repository into the runner
- `fetch-depth: 0` gets full history for better reporting

### **Step: Setup Node.js**
```yaml
- name: Setup Node.js ${{ matrix.node-version }}
  uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```
- Action sets up Node.js environment
- `cache: 'npm'` caches node_modules for faster runs
- `${{ matrix.node-version }}` uses variable from matrix

### **Step: Install Dependencies**
```yaml
- name: Install dependencies
  run: npm ci
```
- `npm ci` (clean install) is better than `npm install` for CI/CD
- Uses exact versions from package-lock.json
- More reliable and deterministic

### **Step: Install Browsers**
```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps
```
- Downloads Chromium, Firefox, WebKit
- `--with-deps` installs system libraries
- Required for headless test execution

### **Step: Run Tests**
```yaml
- name: Run Playwright tests
  run: npm test
  continue-on-error: true
```
- Executes all tests in headless mode
- `continue-on-error: true` means:
  - Even if tests fail, next steps run
  - Reports still generated for debugging
  - Pipeline doesn't stop prematurely

### **Step: Generate Allure**
```yaml
- name: Generate Allure Report
  if: always()
  run: |
    npm install -g allure-commandline
    allure generate allure-results --clean -o allure-report
```
- Installs Allure CLI globally
- Processes test data from `allure-results/`
- Creates HTML dashboard in `allure-report/`
- `if: always()` runs even if previous steps failed

### **Step: Upload Artifacts**
```yaml
- name: Upload Allure Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report/
    retention-days: 30
```
- Saves `allure-report/` folder as downloadable artifact
- `name: allure-report` is the artifact identifier
- `retention-days: 30` keeps it for 30 days (free tier limit)
- `if: always()` ensures upload even if tests failed

### **Step: Print Summary**
```yaml
- name: Test Summary
  if: always()
  run: |
    echo "======================================"
    echo "✅ CI/CD Pipeline Completed"
    # ... more output ...
```
- Displays helpful summary in logs
- Shows where to find downloaded artifacts

---

## Context Variables Explained

### **${{ matrix.node-version }}**
- References value from `strategy.matrix`
- Current value: `18.x`
- Can be extended to test multiple versions

### **always()**
- Special condition: runs regardless of previous step status
- Useful for cleanup, reporting, artifact uploads

---

## Artifact Configuration Details

```yaml
uses: actions/upload-artifact@v3
with:
  name: allure-report              # Artifact identifier
  path: allure-report/             # What to upload
  retention-days: 30               # How long to keep (free: max 90)
```

**Multiple Artifacts:**
The workflow uploads 3 artifacts:
1. **allure-report** (main dashboard) - 30 days
2. **playwright-report** (quick debug) - 7 days
3. **allure-results** (raw data) - 7 days

---

## Error Handling Strategy

The workflow uses these patterns:

### **continue-on-error: true**
```yaml
- name: Run Playwright tests
  run: npm test
  continue-on-error: true
```
- Tests can fail, pipeline continues
- Reports still generated

### **if: always()**
```yaml
- name: Generate Allure Report
  if: always()
```
- Runs even if previous steps failed
- Ensures reports available even on failure

**Result:** Professional reports always available for analysis

---

## Performance Considerations

### **Caching**
```yaml
cache: 'npm'
```
- First run: ~30s to install dependencies
- Cached runs: ~5s to restore dependencies
- Huge time savings on subsequent runs

### **Parallel Testing (Optional)**
```yaml
matrix:
  node-version: [16.x, 18.x, 20.x]
```
- Can run tests on 3 Node versions simultaneously
- GitHub provides separate runners
- Good for compatibility testing

---

## Customization Examples

### **Add Schedule (Run Daily)**
```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Every day at 2 AM UTC
```

### **Add Pull Request Trigger**
```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### **Run Specific Tests Only**
```yaml
- name: Run smoke tests
  run: npx playwright test --grep @smoke
```

### **Multiple Branches**
```yaml
on:
  push:
    branches: [main, develop, staging]
```

---

## Environment Variables (If Needed)

```yaml
env:
  NODE_ENV: test
  CI: true

jobs:
  test:
    steps:
      - run: echo ${{ env.NODE_ENV }}
```

---

## Secrets (For Sensitive Data)

```yaml
- name: Login to service
  run: |
    echo ${{ secrets.API_KEY }}
    echo ${{ secrets.DATABASE_URL }}
```

Access secrets in GitHub → Settings → Secrets → Actions

---

## GitHub Actions Marketplace

The workflow uses official actions:
- `actions/checkout@v4` - Get code
- `actions/setup-node@v4` - Setup Node.js
- `actions/upload-artifact@v3` - Store artifacts

Find more: https://github.com/marketplace?type=actions

---

## Log Output

When workflow runs, you see:
```
✓ Run Playwright tests
  ├─ 📍 Step 1: Navigating to login page...
  ├─ ✅ Step 1: Login page loaded
  ├─ 📍 Step 2: Logging in...
  ├─ ✅ Step 2: Logged in successfully
  └─ ... (more output)
```

Click any step to see full output and debug issues.

---

## Status Badges

Add to README.md:
```markdown
![Tests](https://github.com/your-username/repo-name/actions/workflows/playwright-tests.yml/badge.svg)
```

Shows workflow status on GitHub repo.

---

## Cost Considerations (GitHub Free Tier)

- **Included:** 2,000 minutes per month
- **Per workflow:** ~2.5 min per run
- **Runs per month:** ~800 (unlimited pushes)
- **Result:** Very generous for small teams

---

## Monitoring & Debugging

### **View Workflow Runs:**
1. Repository → Actions tab
2. Click on workflow name
3. See all runs (success/failure)

### **View Detailed Logs:**
1. Click on run
2. Click on job ("test")
3. Click on step to expand output

### **Download Artifacts:**
1. Click on run
2. Scroll to Artifacts section
3. Click download button

---

## Next Steps

1. ✅ Review this workflow file
2. ✅ Customize if needed (branches, schedule, etc.)
3. ✅ Commit and push to main
4. ✅ Watch it run in Actions tab
5. ✅ Download Allure report from artifacts

---

**This workflow is production-ready and follows GitHub Actions best practices!** ✨
