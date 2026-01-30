const { test } = require('@playwright/test');
const LoginPage = require('./pages/loginPage');
const { agentMakerCredentials } = require('./utils/transactionTestData');

test('Diagnose form elements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  console.log('Logging in...');
  await loginPage.navigateToLogin();
  await loginPage.fillEmail(agentMakerCredentials.email);
  await loginPage.fillPassword(agentMakerCredentials.password);
  await loginPage.clickLogin();

  await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForLoadState('networkidle');

  const doItLaterBtn = page.getByRole('button', { name: 'Do it Later' });
  if (await doItLaterBtn.isVisible().catch(() => false)) {
    await doItLaterBtn.click();
    await page.waitForLoadState('networkidle');
  }

  // Navigate to transaction page
  await page.goto('https://uat-agent.ebixcard.com/createTransaction');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  console.log('\n====== FORM ELEMENT INSPECTION ======');
  
  // Try to find all input fields
  const allInputs = await page.locator('input').count();
  console.log(`\nTotal input fields found: ${allInputs}`);
  
  // Get inputs by type
  const textInputs = await page.locator('input[type="text"]').count();
  console.log(`Text inputs: ${textInputs}`);
  
  // Try to find fields by visible text/labels
  const labels = await page.locator('label').count();
  console.log(`Labels found: ${labels}`);

  // List all visible input IDs
  console.log('\nAll visible input IDs:');
  for (let i = 0; i < Math.min(20, allInputs); i++) {
    const input = page.locator('input').nth(i);
    const id = await input.getAttribute('id').catch(() => 'NO_ID');
    const name = await input.getAttribute('name').catch(() => 'NO_NAME');
    const placeholder = await input.getAttribute('placeholder').catch(() => 'NO_PLACEHOLDER');
    console.log(`  [${i}] id="${id}" name="${name}" placeholder="${placeholder}"`);
  }

  // Try alternative selectors
  console.log('\n====== TRYING ALTERNATIVE SELECTORS ======');
  
  // Look for card number field
  const cardNumberLabel = await page.getByText(/card.?number/i).isVisible().catch(() => false);
  console.log(`Card Number label visible: ${cardNumberLabel}`);
  
  const fullNameLabel = await page.getByText(/full.?name/i).isVisible().catch(() => false);
  console.log(`Full Name label visible: ${fullNameLabel}`);
  
  const emailLabel = await page.getByText(/email/i).isVisible().catch(() => false);
  console.log(`Email label visible: ${emailLabel}`);

  // Check visible content
  const bodyText = await page.locator('body').textContent();
  const hasCardNumber = bodyText.includes('Card Number') || bodyText.includes('card number');
  const hasFullName = bodyText.includes('Full Name') || bodyText.includes('full name');
  const hasEmail = bodyText.includes('Email');
  
  console.log(`\nPage contains "Card Number": ${hasCardNumber}`);
  console.log(`Page contains "Full Name": ${hasFullName}`);
  console.log(`Page contains "Email": ${hasEmail}`);

  // Take a screenshot for manual inspection
  await page.screenshot({ path: 'diagnostic-screenshot.png', fullPage: true });
  console.log('\n📸 Screenshot saved: diagnostic-screenshot.png');

  // Get page HTML for inspection
  const html = await page.content();
  console.log('\nPage HTML length:', html.length);
  
  // Check for MUI form structures
  const hasTextField = html.includes('MuiTextField');
  const hasInputBase = html.includes('MuiInputBase');
  console.log(`Page uses MuiTextField: ${hasTextField}`);
  console.log(`Page uses MuiInputBase: ${hasInputBase}`);
});
