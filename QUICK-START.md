# ALLURE REPORTING - QUICK START CARD

## 🎯 THE ONE COMMAND YOU NEED:

```bash
npm run test:allure
```

**What it does:**
1. ✅ Runs all tests
2. ✅ Generates Allure report
3. ✅ Opens dashboard in browser automatically

**Result:** Professional test dashboard showing stats, timeline, and results

---

## 📊 YOUR DASHBOARD WILL SHOW:

```
┌─────────────────────────────────────┐
│ OVERVIEW                            │
├─────────────────────────────────────┤
│ Total: 1 test                       │
│ ✅ Passed: 1 (100%)                 │
│ ❌ Failed: 0 (0%)                   │
│ Duration: 10.9 seconds              │
│                                     │
│ [Pie Chart] [Timeline Graph]        │
└─────────────────────────────────────┘
```

Click on test for: screenshots, videos, console logs, errors

---

## ⚡ OTHER USEFUL COMMANDS:

```bash
npm run test:cardBalance        # Run specific test
npm run allure:serve            # Live dashboard with trends
npm run allure:report           # Generate report only
npm run allure:open             # View existing report
npm test                        # Run tests (no report)
```

---

## 📚 WHICH DOCUMENTATION TO READ:

| Situation | File | Time |
|-----------|------|------|
| Don't know where to start | START-HERE.md | 5 min |
| Need commands while working | ALLURE-QUICK-REFERENCE.md | 5 min |
| Want complete explanation | ALLURE-SETUP.md | 20 min |
| Need technical details | PLAYWRIGHT-CONFIG-EXPLAINED.md | 15 min |

---

## ✅ VERIFY EVERYTHING IS WORKING:

```bash
# See the dashboard
npm run test:allure

# You should see:
# ✓ Tests running in browser
# ✓ Browser opens with Allure dashboard
# ✓ Dashboard shows: Overview, Suites, Timeline, Categories
```

---

## 🎯 REPORT SECTIONS:

- **Overview** - Test stats & metrics
- **Suites** - Individual tests & results
- **Timeline** - Execution sequence
- **Categories** - Grouped by status/severity
- **Attachments** - Screenshots, videos, logs

---

## 🚀 NEXT:

1. Run: `npm run test:allure`
2. Explore the dashboard
3. Click on tests to see details
4. Read START-HERE.md for more info

---

**That's it! You're ready to use Allure reporting.** ✨
