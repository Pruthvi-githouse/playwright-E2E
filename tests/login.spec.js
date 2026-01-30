const { test, expect } = require('@playwright/test');
const LoginPage = require('./pages/loginPage');
const testData = require('./utils/testData');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should have visible login form elements', async () => {
    const isEmailVisible = await loginPage.isEmailInputVisible();
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    
    expect(isEmailVisible).toBeTruthy();
    expect(isLoginButtonVisible).toBeTruthy();
  });

  test('should fill login form with credentials', async () => {
    await loginPage.fillEmail(testData.validUser.username);
    await loginPage.fillPassword(testData.validUser.password);
    
    // Verify values were filled
    const emailValue = await loginPage.emailInput.inputValue();
    const passwordValue = await loginPage.passwordInput.inputValue();
    
    expect(emailValue).toBe(testData.validUser.username);
    expect(passwordValue).toBe(testData.validUser.password);
  });
});
