const BasePage = require('./basePage');
const { expect } = require('@playwright/test');

/**
 * Login Page Object
 * Handles login page interactions for UAT Agent portal
 */
class LoginPage extends BasePage {
  // Page URL
  static get URL() {
    return 'https://uat-agent.ebixcard.com/login';
  }

  constructor(page) {
    super(page);
    
    // Page element locators - using getByRole and getByPlaceholder for better reliability
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    
    // Common success indicators
    this.successMessage = page.getByText(/login successful|welcome|dashboard/i);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin() {
    await this.goto(LoginPage.URL);
    // Wait for email input to be visible
    await this.emailInput.waitFor({ state: 'visible' });
  }

  /**
   * Fill email input field
   * @param {string} email - Email address
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password input field
   * @param {string} password - Password
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login flow
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async login(email = 'rutherford.maker@gmail.com', password = 'rutherford.maker@2025') {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
    // Wait for navigation after login
    await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
      // Navigation might not occur in all scenarios
    });
  }

  /**
   * Verify login was successful
   * @returns {Promise<boolean>} True if login success is confirmed
   */
  async verifyLoginSuccess() {
    try {
      // Check if we've navigated away from login page
      const url = this.page.url();
      if (url.includes('/login')) {
        return false;
      }

      // Check if we're on a different page (successfully logged in)
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if email input is visible
   * @returns {Promise<boolean>} True if email input is visible
   */
  async isEmailInputVisible() {
    return await this.emailInput.isVisible();
  }

  /**
   * Check if login button is visible
   * @returns {Promise<boolean>} True if login button is visible
   */
  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }
}

module.exports = LoginPage;
