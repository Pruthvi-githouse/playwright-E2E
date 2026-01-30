╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║           📧 GMAIL SETUP FOR CI/CD EMAIL NOTIFICATIONS                        ║
║                                                                                ║
║              Step-by-Step Guide to Configure Email Notifications              ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝


═════════════════════════════════════════════════════════════════════════════════

⚠️ IMPORTANT: This requires Gmail Account with 2-Step Verification enabled!

═════════════════════════════════════════════════════════════════════════════════


## 📋 STEP 1: Enable 2-Step Verification on Gmail

1. Go to: https://myaccount.google.com/security
2. In the left sidebar, click "Security"
3. Under "How you sign in to Google", find "2-Step Verification"
4. Click on it and follow the prompts to enable it
5. You'll receive codes on your phone or through authenticator app


═════════════════════════════════════════════════════════════════════════════════

## 🔑 STEP 2: Generate Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select:
   - App: Mail
   - Device: Windows Computer (or your device type)
3. Google will generate a 16-character password
4. Copy this password (you'll need it in Step 3)
5. Keep this password safe! It's like a master key for your email.

Example: abcd efgh ijkl mnop (without spaces: abcdefghijklmnop)


═════════════════════════════════════════════════════════════════════════════════

## 🔐 STEP 3: Add Secrets to GitHub Repository

Now add 3 secrets to your GitHub repository:

### **Secret 1: GMAIL_USER**
- Name: `GMAIL_USER`
- Value: Your Gmail address (e.g., your-email@gmail.com)

### **Secret 2: GMAIL_APP_PASSWORD**
- Name: `GMAIL_APP_PASSWORD`
- Value: The 16-character password from Step 2 (without spaces)

### **Secret 3: RECIPIENT_EMAIL**
- Name: `RECIPIENT_EMAIL`
- Value: Email where you want to receive test reports
  - Can be same as GMAIL_USER or different email
  - Can be multiple emails separated by comma (if your script supports it)

### How to Add Secrets to GitHub:

1. Go to your repository: https://github.com/Pruthvi-githouse/playwright-E2E
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter Name: `GMAIL_USER`
5. Enter Value: your-email@gmail.com
6. Click **Add secret**
7. Repeat for `GMAIL_APP_PASSWORD` and `RECIPIENT_EMAIL`

Visual Guide:
```
GitHub Repo
  └─ Settings
     └─ Secrets and variables
        └─ Actions
           └─ New repository secret
              ├─ GMAIL_USER = your-email@gmail.com
              ├─ GMAIL_APP_PASSWORD = abcdefghijklmnop
              └─ RECIPIENT_EMAIL = test-reports@example.com
```


═════════════════════════════════════════════════════════════════════════════════

## 📧 STEP 4: How Workflow Uses the Secrets

The GitHub Actions workflow will:

1. Install `nodemailer` package
2. Read secrets from GitHub (encrypted, never exposed)
3. Connect to Gmail SMTP server
4. Parse test results from `allure-results/`
5. Send formatted email with test summary
6. Include link to GitHub Actions workflow

Flow:
```
Test Execution
     ↓
Parse Results (allure-results/*.json)
     ↓
Read GitHub Secrets (GMAIL_USER, GMAIL_APP_PASSWORD, RECIPIENT_EMAIL)
     ↓
Connect to Gmail SMTP (smtp.gmail.com:587)
     ↓
Generate HTML Email with test metrics
     ↓
Send Email via GMAIL_USER to RECIPIENT_EMAIL
```


═════════════════════════════════════════════════════════════════════════════════

## 📊 What the Email Contains

The email will include:

```
Subject: Playwright Automation Test Status - PASS ✅ (or FAIL ❌)

Body (HTML formatted):
├─ Header with status badge (PASS ✅ / FAIL ❌)
├─ Summary box with test execution details
├─ 4-Column metrics:
│  ├─ Total Tests
│  ├─ Passed Tests ✅
│  ├─ Failed Tests ❌
│  └─ Skipped Tests ⏭️
├─ Pass Rate percentage with progress bar
├─ Detailed breakdown list
├─ Link to full report on GitHub
└─ Timestamp of email send time
```


═════════════════════════════════════════════════════════════════════════════════

## 🔧 STEP 5: Verify Installation

1. Ensure `nodemailer` is installed in package.json:
   ```bash
   npm list nodemailer
   ```

2. Check script exists:
   ```bash
   scripts/sendTestReport.js
   ```

3. Verify workflow has email steps:
   ```
   .github/workflows/playwright-tests.yml
   ```


═════════════════════════════════════════════════════════════════════════════════

## 🚀 STEP 6: Trigger First Test Run

1. Make a commit and push to main branch
2. Go to GitHub → Actions tab
3. Watch workflow execute
4. Step 11 "Send Test Report Email" will run
5. Check your email inbox (it may go to spam, check there too!)

Example command:
```bash
git add .
git commit -m "Add email notification to CI/CD"
git push origin main
```


═════════════════════════════════════════════════════════════════════════════════

## ✅ Sample Email Content

**Subject:**
```
Playwright Automation Test Status - PASS ✅
```

**From:**
```
Playwright CI/CD <your-email@gmail.com>
```

**To:**
```
test-reports@example.com
```

**Body (HTML with styling):**
```
╔═══════════════════════════════════════╗
║  🎭 Playwright Test Report            ║
║  ✅ PASS                               ║
╚═══════════════════════════════════════╝

Test Execution Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Metrics:
┌──────────────┐  ┌──────────────┐
│   Total      │  │   Passed     │
│      5       │  │      5       │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│   Failed     │  │   Skipped    │
│      0       │  │      0       │
└──────────────┘  └──────────────┘

Pass Rate: 100%
████████████████████████████ 100%

Detailed Breakdown:
• Total Tests: 5
• ✅ Passed: 5
• ❌ Failed: 0
• ⏭️ Skipped: 0
• Success Rate: 100%

[View Full Report on GitHub]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent at: January 30, 2026, 10:45:23 AM
Repository: Pruthvi-githouse/playwright-E2E
```


═════════════════════════════════════════════════════════════════════════════════

## 🆘 TROUBLESHOOTING

### Email Not Sending

**Error: "Invalid login"**
- ✓ Check GMAIL_USER is your actual Gmail address
- ✓ Check GMAIL_APP_PASSWORD is 16 characters (without spaces)
- ✓ Verify you generated app password, not using Gmail password
- ✓ Check 2-Step Verification is enabled on your Gmail

**Error: "550-5.7.1 Invalid credentials"**
- ✓ Go to: https://myaccount.google.com/apppasswords
- ✓ Regenerate app password
- ✓ Update GMAIL_APP_PASSWORD secret in GitHub
- ✓ Re-run workflow

**Error: "Less secure app access"**
- ✓ This uses OAuth/App Password - secure method
- ✓ No need to enable "Less secure apps"
- ✓ Gmail should recognize nodemailer

**Email goes to spam**
- ✓ Check spam folder
- ✓ Mark as "Not spam" to train Gmail filter
- ✓ Gmail may flag bulk/auto-generated emails initially

### Script Errors

**Error: "allure-results directory not found"**
- ✓ Tests must run first (Step 5 in workflow)
- ✓ Check if tests are passing/failing
- ✓ Email step should still execute

**Error: "nodemailer not found"**
- ✓ Check Step 10 (Install nodemailer) ran
- ✓ Verify package.json has nodemailer
- ✓ Check workflow logs for npm install errors


═════════════════════════════════════════════════════════════════════════════════

## 📱 Alternative: Gmail Allow Less Secure Apps

If App Password doesn't work:

1. Go to: https://myaccount.google.com/lesssecureapps
2. Enable "Allow less secure apps"
3. Use GMAIL_PASSWORD instead of App Password

⚠️ Note: This method is less secure. Prefer App Password approach.


═════════════════════════════════════════════════════════════════════════════════

## 🔐 Security Best Practices

✅ ALWAYS use GitHub Secrets for:
   - GMAIL_USER
   - GMAIL_APP_PASSWORD
   - RECIPIENT_EMAIL

❌ NEVER:
   - Commit passwords to git
   - Print secrets in logs
   - Share secrets in code
   - Use Gmail account password (use App Password instead)

✅ DO:
   - Use GitHub Secrets encryption
   - Rotate App Password periodically
   - Use 2-Step Verification
   - Monitor workflow logs for errors


═════════════════════════════════════════════════════════════════════════════════

## 📞 Quick Reference

Gmail Security Settings: https://myaccount.google.com/security
App Passwords: https://myaccount.google.com/apppasswords
GitHub Secrets: https://github.com/YOUR_REPO/settings/secrets/actions
Workflow Log: https://github.com/YOUR_REPO/actions

SMTP Details:
├─ Server: smtp.gmail.com
├─ Port: 587
├─ Security: TLS
└─ Auth: OAuth (via nodemailer)


═════════════════════════════════════════════════════════════════════════════════

✨ You're all set! Next push to main will trigger email notifications! ✨

═════════════════════════════════════════════════════════════════════════════════
