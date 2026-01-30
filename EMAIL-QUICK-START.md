╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║                  📧 EMAIL NOTIFICATION - QUICK START                          ║
║                                                                                ║
║              Add automated email reports to your CI/CD pipeline                ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝


⚡ QUICK 5-MINUTE SETUP:

1️⃣  Gmail Setup (2 minutes)
   └─ Enable 2-Step Verification: https://myaccount.google.com/security
   └─ Generate App Password: https://myaccount.google.com/apppasswords
   └─ Copy the 16-character password

2️⃣  Add GitHub Secrets (2 minutes)
   └─ Go to: https://github.com/Pruthvi-githouse/playwright-E2E/settings/secrets/actions
   └─ Add 3 secrets:
      • GMAIL_USER = your-email@gmail.com
      • GMAIL_APP_PASSWORD = abcdefghijklmnop (16 chars from step 1)
      • RECIPIENT_EMAIL = test-reports@example.com

3️⃣  Deploy & Test (1 minute)
   └─ Push code to main branch
   └─ Watch workflow run
   └─ Check email inbox for test report!


═════════════════════════════════════════════════════════════════════════════════

📊 WHAT YOU GET:

✅ Automated Email After Every Test Run
   ├─ Beautiful HTML formatted report
   ├─ Test metrics (total, passed, failed, skipped)
   ├─ Pass rate percentage with progress bar
   ├─ Direct link to GitHub Actions workflow
   └─ Timestamp of execution

✅ Works On Both Success & Failure
   ├─ Email sent regardless of test outcome
   ├─ Status badge shows PASS ✅ or FAIL ❌
   └─ Detailed metrics in all cases

✅ Easy Configuration
   ├─ 3 GitHub Secrets
   ├─ No code changes needed
   ├─ Continues pipeline even if email fails


═════════════════════════════════════════════════════════════════════════════════

🏗️ ARCHITECTURE:

GitHub Actions Workflow
         ↓
    Run Tests
         ↓
  Generate Reports
         ↓
Parse Test Results ← JSON files from allure-results/
         ↓
Create Email Content ← HTML formatting with metrics
         ↓
Connect to Gmail SMTP ← Using GitHub Secrets
         ↓
Send Email to Recipient
         ↓
Pipeline Completes


═════════════════════════════════════════════════════════════════════════════════

📧 EMAIL PREVIEW:

┌────────────────────────────────────────────┐
│ From: Playwright CI/CD <your-email@gmail>  │
│ To: test-reports@example.com               │
│ Subject: Playwright Automation Test Status │
│         - PASS ✅                          │
├────────────────────────────────────────────┤
│                                            │
│  🎭 Playwright Test Report                 │
│     ✅ PASS                                │
│                                            │
│  Metrics:                                  │
│  ┌─────────────┬────────────┐             │
│  │ Total: 5    │ Passed: 5  │             │
│  │ Failed: 0   │ Skipped: 0 │             │
│  └─────────────┴────────────┘             │
│                                            │
│  Success Rate: 100% ██████████████        │
│                                            │
│  Details:                                  │
│  • Total Tests: 5                          │
│  • ✅ Passed: 5                            │
│  • ❌ Failed: 0                            │
│  • ⏭️ Skipped: 0                           │
│                                            │
│  [View Full Report on GitHub]              │
│                                            │
│  Sent: January 30, 2026, 10:45 AM         │
└────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════

🔑 THE 3 GITHUB SECRETS EXPLAINED:

┌──────────────────────────────────────┐
│ 1. GMAIL_USER                        │
│    ├─ Your Gmail address             │
│    ├─ Example: your-email@gmail.com  │
│    └─ Used to authenticate & send    │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 2. GMAIL_APP_PASSWORD                │
│    ├─ 16-character app-specific pwd  │
│    ├─ Generated at myaccount.google   │
│    ├─ NOT your Gmail password!        │
│    └─ More secure than password      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ 3. RECIPIENT_EMAIL                   │
│    ├─ Where to send test reports     │
│    ├─ Can be same as GMAIL_USER      │
│    ├─ Or completely different        │
│    └─ Example: qa-team@company.com   │
└──────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════

🔧 FILES INVOLVED:

┌─────────────────────────────────────────────────┐
│ 📄 .github/workflows/playwright-tests.yml       │
│    ├─ Step 10: Install nodemailer              │
│    ├─ Step 11: Send Test Report Email          │
│    ├─ Uses GitHub Secrets:                     │
│    │  • ${{ secrets.GMAIL_USER }}              │
│    │  • ${{ secrets.GMAIL_APP_PASSWORD }}      │
│    │  • ${{ secrets.RECIPIENT_EMAIL }}         │
│    └─ Calls: node scripts/sendTestReport.js    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 📄 scripts/sendTestReport.js                    │
│    ├─ Parses allure-results/ JSON files        │
│    ├─ Counts: passed, failed, skipped tests    │
│    ├─ Generates beautiful HTML email           │
│    ├─ Connects to Gmail SMTP (nodemailer)      │
│    ├─ Sends email with test summary            │
│    └─ Handles errors gracefully                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 📄 package.json                                 │
│    └─ Dependencies:                            │
│       • nodemailer (for email sending)         │
│       • playwright (for tests)                 │
│       • allure-playwright (for reporting)      │
└─────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════

📋 STEP-BY-STEP SETUP:

Step 1: Enable Gmail 2-Step Verification
────────────────────────────────────────
1. Visit: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow setup wizard
4. Confirm with phone/authenticator


Step 2: Get App Password
─────────────────────────
1. Visit: https://myaccount.google.com/apppasswords
2. Select:
   - App: Mail
   - Device: Windows Computer
3. Google generates 16-char password
4. Copy it (without spaces)


Step 3: Add GitHub Secrets
───────────────────────────
1. Visit: https://github.com/Pruthvi-githouse/playwright-E2E
2. Go: Settings → Secrets and variables → Actions
3. Create secret:
   - Name: GMAIL_USER
   - Value: your-email@gmail.com
4. Create secret:
   - Name: GMAIL_APP_PASSWORD
   - Value: abcdefghijklmnop
5. Create secret:
   - Name: RECIPIENT_EMAIL
   - Value: test-reports@example.com


Step 4: Push Code
──────────────────
1. Git commit changes:
   git add .
   git commit -m "Add email notifications"
   git push origin main

2. Workflow triggers automatically

3. Watch: GitHub → Actions tab

4. Check email inbox after ~2 minutes


═════════════════════════════════════════════════════════════════════════════════

⚡ USAGE:

Default Behavior:
├─ Email sent after EVERY test run
├─ Sent to RECIPIENT_EMAIL
├─ Includes full test metrics
├─ Works even if tests fail
└─ Continues pipeline if email fails


═════════════════════════════════════════════════════════════════════════════════

🎯 SAMPLE TEST RESULTS EMAIL:

┌─────────────────────────────────────────────────┐
│ ✉️  RECEIVED EMAIL                              │
├─────────────────────────────────────────────────┤
│                                                 │
│ From: Playwright CI/CD <your@gmail.com>         │
│ To: qa-team@company.com                         │
│ Date: Wed, Jan 30, 2026, 10:45 AM              │
│                                                 │
│ ──────────────────────────────────────────────  │
│                                                 │
│ Subject: Playwright Automation Test Status     │
│          - PASS ✅                             │
│                                                 │
│ ──────────────────────────────────────────────  │
│                                                 │
│ 🎭 PLAYWRIGHT TEST REPORT                      │
│ ✅ PASS                                        │
│                                                 │
│ Test Execution Summary                         │
│ ─────────────────────────                     │
│ Your Playwright automation tests have           │
│ completed. See the details below:              │
│                                                 │
│ METRICS:                                        │
│ ┌─────────────┬─────────────┐                 │
│ │ Total: 5    │ Passed: 5   │                 │
│ │ Failed: 0   │ Skipped: 0  │                 │
│ └─────────────┴─────────────┘                 │
│                                                 │
│ PASS RATE: 100%                                │
│ ████████████████████████████ 100%              │
│                                                 │
│ DETAILED BREAKDOWN:                            │
│ • Total Tests: 5                               │
│ • ✅ Passed: 5                                │
│ • ❌ Failed: 0                                │
│ • ⏭️ Skipped: 0                               │
│ • Success Rate: 100%                           │
│                                                 │
│ [View Full Report on GitHub]                   │
│                                                 │
│ ────────────────────────────────────────────   │
│ Sent: Wed Jan 30 10:45:23 2026                 │
│ Repository: Pruthvi-githouse/playwright-E2E   │
│                                                 │
│ This is an automated email from your           │
│ Playwright CI/CD Pipeline                      │
│                                                 │
└─────────────────────────────────────────────────┘


═════════════════════════════════════════════════════════════════════════════════

🆘 QUICK TROUBLESHOOTING:

Problem: Email not received
├─ ✓ Check GMAIL_USER is correct
├─ ✓ Check GMAIL_APP_PASSWORD (not Gmail password!)
├─ ✓ Check 2-Step Verification enabled
├─ ✓ Check spam folder
└─ ✓ Check workflow logs for errors

Problem: "Invalid login" error
├─ ✓ Regenerate App Password at myaccount.google
├─ ✓ Update GMAIL_APP_PASSWORD secret
└─ ✓ Re-run workflow

Problem: Email step not running
├─ ✓ Check workflow status: GitHub → Actions
├─ ✓ Check if Step 10 (Install nodemailer) ran
└─ ✓ View logs for error messages


═════════════════════════════════════════════════════════════════════════════════

📚 RELATED DOCS:

- EMAIL-SETUP-GUIDE.md ..................... Detailed setup with screenshots
- .github/workflows/playwright-tests.yml ... Workflow configuration
- scripts/sendTestReport.js ................ Email notification script
- package.json ............................ Dependencies


═════════════════════════════════════════════════════════════════════════════════

✨ That's it! You now have automated email test reports! ✨

═════════════════════════════════════════════════════════════════════════════════
