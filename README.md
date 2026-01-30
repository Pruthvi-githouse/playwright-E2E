# Playwright Automation Framework

A production-ready test automation framework using Playwright with Allure reporting.

## Project Structure

```
playwright-automation-project/
├── tests/
│   ├── pages/              # Page Object Models
│   │   ├── basePage.js     # Base page with common methods
│   │   └── loginPage.js    # Login page example
│   ├── utils/              # Test utilities
│   │   └── testData.js     # Test data constants
│   └── login.spec.js       # Example test file
├── results/
│   └── allure-results/     # Allure report data
├── playwright.config.js    # Playwright configuration
├── package.json            # NPM dependencies
├── .gitignore              # Git ignore rules
└── .env.example            # Environment variables template
```

## Setup Instructions

### 1. Create project folder
```bash
mkdir playwright-automation-project
cd playwright-automation-project
```

### 2. Initialize npm project
```bash
npm init -y
```

### 3. Install dependencies
```bash
npm install -D @playwright/test allure-playwright
```

### 4. Create folder structure
```bash
mkdir tests tests/pages tests/utils results results/allure-results
```

### 5. Create configuration files
- Copy `playwright.config.js`
- Copy test files and page objects
- Copy `.gitignore` and `.env.example`

## Available npm Scripts

```bash
# Run tests in headed mode (default)
npm test

# Run tests with UI debug mode
npm run test:debug

# Run tests explicitly in headed mode
npm run test:headed

# View HTML report
npm run test:report

# Generate and view Allure report
npm run allure:report
```

## Configuration Details

### playwright.config.js
- **testDir**: Points to `./tests` directory
- **headless**: Set to `false` for headed execution
- **reporters**: HTML, JUnit, and Allure reporters configured
- **retries**: Configurable retry logic
- **workers**: Single worker (optimal for POC)

### File Descriptions

| File | Purpose |
|------|---------|
| `basePage.js` | Base page object with common methods (fill, click, getText, etc.) |
| `loginPage.js` | Example page object extending BasePage for login functionality |
| `testData.js` | Centralized test data (credentials, test values) |
| `login.spec.js` | Example test file demonstrating page object usage |

## Running Tests

### Basic run
```bash
npm test
```

### Run with specific options
```bash
# Run specific test file
npx playwright test tests/login.spec.js

# Run specific test
npx playwright test -g "should successfully login"

# Run in UI mode
npx playwright test --ui

# Run with trace viewer
npx playwright test --trace on
```

## Allure Reporting

### Prerequisites
Install Allure CLI:
```bash
npm install -g allure-commandline@latest
```

### Generate and view report
```bash
npm run allure:report
```

The command will:
1. Generate HTML report from test results
2. Automatically open it in your default browser

## Environment Variables

Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

## Tips for Success

1. **Page Objects**: Keep selectors in page objects, not tests
2. **Waits**: Use explicit waits (`waitForElement`) instead of hard sleeps
3. **Assertions**: Use `expect()` for clear test outcomes
4. **Reports**: Allure automatically captures screenshots on failures
5. **CI/CD**: Set `headless: true` in CI environments

## Troubleshooting

**Allure report not generating?**
- Ensure `allure-playwright` is installed
- Check `results/allure-results` folder exists and contains JSON files

**Tests not running?**
- Verify `baseURL` in `playwright.config.js` is correct
- Check selectors match your application

**Headed mode not working?**
- Ensure `headless: false` in `playwright.config.js`
- Try `npm run test:headed`

## Next Steps

1. Update `baseURL` in `playwright.config.js`
2. Create page objects for your application
3. Add test data to `testData.js`
4. Write your test specs
5. Configure CI/CD pipeline
