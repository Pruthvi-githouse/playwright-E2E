/**
 * Email Notification Script for Playwright Test Results
 * Parses allure-results and sends email with test summary
 * 
 * Usage: node scripts/sendTestReport.js
 * 
 * Required Environment Variables:
 * - GMAIL_USER: Gmail address (e.g., your-email@gmail.com)
 * - GMAIL_PASSWORD: Gmail App Password (16 characters)
 * - RECIPIENT_EMAIL: Email to send results to
 */

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Get environment variables
const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || '';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || '';
const STAKEHOLDER_EMAIL = process.env.STAKEHOLDER_EMAIL || '';
const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || 'https://github.com';
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || '';
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID || '';

// Validate required env vars
if (!GMAIL_USER || !GMAIL_PASSWORD || (!RECIPIENT_EMAIL && !STAKEHOLDER_EMAIL)) {
  console.error('❌ Missing required environment variables:');
  console.error('   - GMAIL_USER');
  console.error('   - GMAIL_PASSWORD');
  console.error('   - RECIPIENT_EMAIL or STAKEHOLDER_EMAIL (at least one required)');
  process.exit(1);
}

/**
 * Parse test results from allure-results JSON files
 */
function parseTestResults() {
  const resultsDir = path.join(process.cwd(), 'allure-results');
  
  if (!fs.existsSync(resultsDir)) {
    console.warn('⚠️  allure-results directory not found');
    return { total: 0, passed: 0, failed: 0, skipped: 0, status: 'UNKNOWN' };
  }

  let total = 0;
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  try {
    const files = fs.readdirSync(resultsDir);
    
    files.forEach(file => {
      if (file.endsWith('-result.json')) {
        try {
          const filePath = path.join(resultsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const result = JSON.parse(content);

          total++;
          
          if (result.status === 'passed') {
            passed++;
          } else if (result.status === 'failed') {
            failed++;
          } else if (result.status === 'skipped') {
            skipped++;
          }
        } catch (err) {
          console.warn(`⚠️  Failed to parse ${file}: ${err.message}`);
        }
      }
    });
  } catch (err) {
    console.warn(`⚠️  Failed to read allure-results: ${err.message}`);
  }

  const status = failed === 0 ? 'PASS ✅' : 'FAIL ❌';

  return { total, passed, failed, skipped, status };
}

/**
 * Create HTML email content
 */
function createEmailBody(results) {
  const workflowUrl = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
  const passPercentage = results.total > 0 
    ? ((results.passed / results.total) * 100).toFixed(2) 
    : 0;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      margin-top: 10px;
      font-size: 18px;
    }
    .status-pass {
      background-color: #4caf50;
      color: white;
    }
    .status-fail {
      background-color: #f44336;
      color: white;
    }
    .content {
      padding: 30px 20px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .metric {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }
    .metric-value {
      font-size: 28px;
      font-weight: bold;
      color: #667eea;
    }
    .metric-label {
      font-size: 14px;
      color: #666;
      margin-top: 5px;
    }
    .metric-passed { border-left-color: #4caf50; }
    .metric-passed .metric-value { color: #4caf50; }
    
    .metric-failed { border-left-color: #f44336; }
    .metric-failed .metric-value { color: #f44336; }
    
    .metric-skipped { border-left-color: #ff9800; }
    .metric-skipped .metric-value { color: #ff9800; }
    
    .metric-total { border-left-color: #2196f3; }
    .metric-total .metric-value { color: #2196f3; }

    .progress-bar {
      width: 100%;
      height: 20px;
      background-color: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      margin: 15px 0;
    }
    .progress-fill {
      height: 100%;
      background-color: #4caf50;
      text-align: center;
      color: white;
      font-size: 12px;
      line-height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .summary {
      background-color: #f0f7ff;
      border-left: 4px solid #2196f3;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .button {
      display: inline-block;
      background-color: #667eea;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      font-weight: bold;
    }
    .button:hover {
      background-color: #5568d3;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #e0e0e0;
    }
    .timestamp {
      color: #666;
      font-size: 13px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎭 Playwright Test Report</h1>
      <div class="status-badge ${results.status === 'PASS ✅' ? 'status-pass' : 'status-fail'}">
        ${results.status}
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Summary -->
      <div class="summary">
        <strong>Test Execution Summary</strong>
        <p>Your Playwright automation tests have completed. See the details below:</p>
      </div>

      <!-- Metrics Grid -->
      <div class="metrics">
        <div class="metric metric-total">
          <div class="metric-value">${results.total}</div>
          <div class="metric-label">Total Tests</div>
        </div>
        <div class="metric metric-passed">
          <div class="metric-value">${results.passed}</div>
          <div class="metric-label">Passed Tests</div>
        </div>
        <div class="metric metric-failed">
          <div class="metric-value">${results.failed}</div>
          <div class="metric-label">Failed Tests</div>
        </div>
        <div class="metric metric-skipped">
          <div class="metric-value">${results.skipped}</div>
          <div class="metric-label">Skipped Tests</div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div>
        <strong>Pass Rate: ${passPercentage}%</strong>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${passPercentage}%;">
            ${passPercentage > 5 ? passPercentage + '%' : ''}
          </div>
        </div>
      </div>

      <!-- Detailed Results -->
      <div class="summary">
        <strong>Detailed Breakdown</strong>
        <ul style="margin: 10px 0;">
          <li><strong>Total Tests:</strong> ${results.total}</li>
          <li><strong>✅ Passed:</strong> ${results.passed}</li>
          <li><strong>❌ Failed:</strong> ${results.failed}</li>
          <li><strong>⏭️ Skipped:</strong> ${results.skipped}</li>
          <li><strong>Success Rate:</strong> ${passPercentage}%</li>
        </ul>
      </div>

      <!-- GitHub Actions Link & Allure Dashboard -->
      ${GITHUB_RUN_ID ? `
      <div style="text-align: center; margin-top: 30px;">
        <p style="margin: 10px 0;">
          <a href="${workflowUrl}" class="button" style="background-color: #2196f3;">View GitHub Actions Run</a>
        </p>
        ${GITHUB_REPOSITORY ? `
        <p style="margin: 10px 0;">
          <a href="https://${GITHUB_REPOSITORY.split('/')[0]}.github.io/${GITHUB_REPOSITORY.split('/')[1]}/" class="button" style="background-color: #4caf50;">View Allure Dashboard</a>
        </p>
        ` : ''}
      </div>
      ` : ''}

      <div class="timestamp">
        Sent at: ${new Date().toLocaleString()}
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin: 0;">
        This is an automated email from your Playwright CI/CD Pipeline
      </p>
      <p style="margin: 5px 0 0 0;">
        Repository: ${GITHUB_REPOSITORY || 'N/A'}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send email using Gmail SMTP
 */
async function sendEmail(results) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD, // Use App Password, not regular password
      },
    });

    // Email content
    const emailBody = createEmailBody(results);
    const emailSubject = `Playwright Automation Test Status - ${results.status}`;

    // Combine recipients
    const recipients = [RECIPIENT_EMAIL, STAKEHOLDER_EMAIL].filter(Boolean).join(',');

    // Send email
    const info = await transporter.sendMail({
      from: `"Playwright CI/CD" <${GMAIL_USER}>`,
      to: recipients,
      subject: emailSubject,
      html: emailBody,
      text: `
Playwright Test Report
========================

Status: ${results.status}
Total Tests: ${results.total}
Passed: ${results.passed}
Failed: ${results.failed}
Skipped: ${results.skipped}

View full report on GitHub: ${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   To: ${RECIPIENT_EMAIL}`);
    console.log(`   Subject: ${emailSubject}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error(`   Error: ${error.message}`);
    
    // Print helpful debugging info
    if (error.message.includes('Invalid login')) {
      console.error('\n   Troubleshooting:');
      console.error('   - Check GMAIL_USER is correct');
      console.error('   - Check GMAIL_PASSWORD is an App Password (16 chars)');
      console.error('   - Verify 2-Step Verification is enabled on Gmail account');
    }
    
    return false;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n📧 Playwright Test Report - Email Notification\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Parse results
  console.log('\n📊 Parsing test results...');
  const results = parseTestResults();
  
  console.log('\n📈 Test Results Summary:');
  console.log(`   Total Tests: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   Status: ${results.status}`);
  
  // Send email
  console.log('\n📧 Sending email notification...');
  const success = await sendEmail(results);
  
  if (success) {
    console.log('\n✅ Email notification sent successfully!');
    console.log(`   Recipient: ${RECIPIENT_EMAIL}`);
    process.exit(0);
  } else {
    console.log('\n❌ Failed to send email notification');
    process.exit(1);
  }
}

// Run main
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
