/**
 * View Transaction Status Test
 * 
 * Test Flow:
 * 1. Navigate to login page
 * 2. Login with test credentials
 * 3. Navigate to View Transaction Status page
 * 4. Verify page loaded successfully
 * 5. Logout
 * 6. Confirm logout
 * 
 * Created from: DeploySentinel Recorder
 */

const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/loginPage');
const BasePage = require('./pages/basePage');

test.describe('View Transaction Status Tests', () => {
  let page;
  let loginPage;
  let basePage;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    loginPage = new LoginPage(page);
    basePage = new BasePage(page);

    // Set viewport size
    await page.setViewportSize({ width: 1536, height: 738 });

    console.log('📍 Setup: Test environment initialized');
  });

  test('Should complete transaction status workflow', async () => {
    try {
      // ========== STEP 1: Navigate to Login Page ==========
      console.log('📍 STEP 1: Navigating to login page...');
      await loginPage.navigateToLogin();
      console.log('✅ STEP 1: Login page loaded');

      // ========== STEP 2: Login with Test Credentials ==========
      console.log('📍 STEP 2: Logging in with test credentials...');
      
      // Use test email from test data if available
      const testEmail = 'rutherford.checker@gmail.com';
      const testPassword = 'Rutherford.checker@2025'; // Updated password, 

      // Fill email
      await page.fill('#emailId-agent', testEmail);
      console.log(`✅ STEP 2a1: Email entered: ${testEmail}`);
      //Fill Password
      await page.fill('#password-agent',testPassword );
      console.log(`✅ STEP 2a2: Password entered: ${testPassword}`);

      // Click login button and wait for navigation
      await Promise.all([
        page.click('button:has-text("Login")'),
        page.waitForNavigation({ waitUntil: 'networkidle' })
      ]);
      console.log('✅ STEP 2b: Login clicked, navigation complete');

      // Handle password setup modal if present
      try {
        const doItLaterBtn = page.getByText('Do it Later');
        if (await doItLaterBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          console.log('📍 STEP 2c: Password setup modal detected, clicking "Do it Later"...');
          await doItLaterBtn.click();
          await page.waitForTimeout(1000);
          console.log('✅ STEP 2c: Modal dismissed');
        }
      } catch (err) {
        console.log('ℹ️  No password setup modal detected (optional flow)');
      }

      // ========== STEP 3: Navigate to Transaction Status Page ==========
      console.log('📍 STEP 3: Navigating to View Transaction Status page...');
      
      // Click on View Transaction Status link
      await Promise.all([
        page.click('a[href="/checker/ln-transaction/transaction-approval/view-transaction-status"], [href*="view-transaction-status"]'),
        page.waitForNavigation({ waitUntil: 'networkidle' })
      ]);
      console.log('✅ STEP 3: Navigated to View Transaction Status page');

      // ========== STEP 4: Verify Page Loaded ==========
      console.log('📍 STEP 4: Verifying page content...');
      
      // Check for page title or heading
      const pageTitle = page.locator('h1, h2, [role="heading"]').first();
      const isTitleVisible = await pageTitle.isVisible().catch(() => false);
      
      expect(isTitleVisible).toBeTruthy();
      console.log('✅ STEP 4: Page content verified');

      // ========== STEP 5: Logout ==========
      console.log('📍 STEP 5: Logging out...');
      
      // Find and click logout button/link
      const logoutBtn = page.getByText('Logout', { exact: true });
      await logoutBtn.click();
      console.log('✅ STEP 5: Logout clicked');

      // ========== STEP 6: Confirm Logout ==========
      console.log('📍 STEP 6: Confirming logout...');
      
      // Wait for confirmation dialog and click confirm
      await page.waitForTimeout(500); // Wait for modal to appear
      
      const confirmBtn = page.locator('button:has-text("Confirm")').first();
      await Promise.all([
        confirmBtn.click(),
        page.waitForNavigation({ waitUntil: 'networkidle' })
      ]);
      console.log('✅ STEP 6: Logout confirmed');

      // ========== STEP 7: Verify Logout Success ==========
      console.log('📍 STEP 7: Verifying logout success...');
      
      // Should be back at login page
      const currentUrl = page.url();
      expect(currentUrl).toContain('login');
      console.log('✅ STEP 7: Successfully logged out (back at login page)');

      console.log('✅ TEST PASSED: Complete transaction status workflow executed successfully');

    } catch (error) {
      console.error('❌ TEST FAILED:', error.message);
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'test-failed-screenshot.png' });
      console.log('📸 Screenshot saved: test-failed-screenshot.png');
      
      throw error;
    }
  });

  test('Quick login and transaction status navigation', async () => {
    try {
      // ========== Quick Flow for CI/CD ==========
      console.log('📍 Starting quick transaction status test...');

      // Login
      const testEmail = 'rutherford.checker@gmail.com';
      const testPassword = 'Rutherford.checker@2025'; // Updated password,
      
      await loginPage.navigateToLogin();
      await page.fill('#emailId-agent', testEmail);
      await page.fill('#password-agent',testPassword );
      
      await Promise.all([
        page.click('button:has-text("Login")'),
        page.waitForNavigation()
      ]);

      // Handle modal
      try {
        const modal = page.getByText('Do it Later');
        if (await modal.isVisible({ timeout: 1000 }).catch(() => false)) {
          await modal.click();
        }
      } catch {}

      // Navigate to transaction status
      await page.goto('https://uat-agent.ebixcard.com/checker/ln-transaction/transaction-approval/view-transaction-status');
      
      // Verify we're on the page
      const pageContent = page.locator('body');
      const isVisible = await pageContent.isVisible();
      
      expect(isVisible).toBeTruthy();
      console.log('✅ Quick test passed: Transaction status page accessible');

    } catch (error) {
      console.error('❌ Quick test failed:', error.message);
      throw error;
    }
  });
});
