const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/loginPage');
const { agentMakerCredentials } = require('./utils/transactionTestData');

test.describe('Card Balance - Get Statement Workflow', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should complete card balance and get statement workflow', async ({ page }) => {
    // ============ STEP 1: Navigate to login page ============
    console.log('📍 Step 1: Navigating to login page...');
    await loginPage.navigateToLogin();
    
    // Verify login page is loaded
    const isEmailInputVisible = await loginPage.isEmailInputVisible();
    expect(isEmailInputVisible).toBeTruthy();
    console.log('✅ Step 1: Login page loaded');

    // ============ STEP 2: Login with credentials ============
    console.log('📍 Step 2: Logging in with email and password...');
    await loginPage.fillEmail(agentMakerCredentials.email);
    await loginPage.fillPassword(agentMakerCredentials.password);
    await loginPage.clickLogin();

    // Wait for navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForLoadState('networkidle');
    console.log('✅ Step 2: Logged in successfully');

    // ============ STEP 3: Skip password setup modal ============
    console.log('📍 Step 3: Handling password setup modal...');
    const doItLaterBtn = page.getByRole('button', { name: 'Do it Later' });
    if (await doItLaterBtn.isVisible().catch(() => false)) {
      await doItLaterBtn.click();
      await page.waitForLoadState('networkidle');
      console.log('✅ Step 3: Clicked "Do it Later" on password setup modal');
    } else {
      console.log('ℹ️ Step 3: Password setup modal not visible');
    }

    // ============ STEP 4: Navigate to Card Balance ============
    console.log('📍 Step 4: Clicking on "Card Balance"...');
    const cardBalanceLink = page.getByRole('link', { name: 'Card Balance' });
    
    // Wait for navigation link to be visible
    await cardBalanceLink.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    
    if (await cardBalanceLink.isVisible().catch(() => false)) {
      await cardBalanceLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForLoadState('networkidle');
      console.log('✅ Step 4: Navigated to Card Balance page');
    } else {
      throw new Error('Card Balance link not found');
    }

    // Verify we're on Card Balance page
    const currentUrl = page.url();
    expect(currentUrl).toContain('/card-balance');
    console.log('✅ Step 4: Confirmed on Card Balance page');

    // ============ STEP 5: Enter Card Number ============
    console.log('📍 Step 5: Entering card number...');
    const cardNumberInput = page.getByRole('textbox', { name: 'Card Number' });
    
    // Wait for input to be visible
    await cardNumberInput.waitFor({ state: 'visible', timeout: 10000 });
    await cardNumberInput.fill('5417780001000184');
    
    // Verify card number was entered
    const enteredCardNumber = await cardNumberInput.inputValue();
    expect(enteredCardNumber).toBe('5417780001000184');
    console.log('✅ Step 5: Card number entered: 5417780001000184');

    // ============ STEP 6: Click Get Statement ============
    console.log('📍 Step 6: Clicking "Get Statement" button...');
    const getStatementBtn = page.getByRole('button', { name: 'Get Statement' });
    await getStatementBtn.click();
    
    // Wait for statement to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Step 6: Clicked "Get Statement" button');

    // Verify statement is displayed
    const latestTransactionHeading = page.getByRole('heading', { name: /latest transaction/i });
    const isStatementVisible = await latestTransactionHeading.isVisible().catch(() => false);
    expect(isStatementVisible).toBeTruthy();
    console.log('✅ Step 6: Statement displayed successfully');

    // ============ STEP 7: Logout ============
    console.log('📍 Step 7: Logging out...');
    const logoutBtn = page.getByRole('button', { name: 'Logout' });
    await logoutBtn.click();

    // Wait for logout confirmation dialog
    await page.waitForTimeout(1000);
    
    // Click Confirm on logout dialog
    const confirmBtn = page.getByRole('button', { name: 'Confirm' });
    if (await confirmBtn.isVisible().catch(() => false)) {
      await confirmBtn.click();
      console.log('✅ Step 7a: Confirmed logout');
    }

    // Wait for redirect to login page
    await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForLoadState('networkidle');
    
    // Verify we're back on login page
    const finalUrl = page.url();
    expect(finalUrl).toContain('/login');
    console.log('✅ Step 7b: Logged out successfully and returned to login page');

    // ============ VERIFICATION ============
    console.log('\n✅ COMPLETE - Card Balance workflow successfully executed');
    console.log('Workflow Summary:');
    console.log('  1. Logged in with: ohmmacker1@gmail.com');
    console.log('  2. Skipped password setup modal');
    console.log('  3. Navigated to Card Balance');
    console.log('  4. Entered card number: 5417780001000184');
    console.log('  5. Retrieved card statement');
    console.log('  6. Successfully logged out');
  });
});
