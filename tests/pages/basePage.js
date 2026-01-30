const { expect } = require('@playwright/test');

/**
 * Base Page Object
 * Provides common functionality for all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - Path to navigate to
   */
  async goto(path = '') {
    await this.page.goto(path);
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Click an element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Get element text
   * @param {string} selector - CSS selector
   * @returns {Promise<string>} Element text
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   */
  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Verify element is visible
   * @param {string} selector - CSS selector
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Take screenshot for Allure reporting
   * @param {string} name - Screenshot name
   */
  async takeScreenshot(name) {
    await this.page.screenshot({ path: `results/${name}.png` });
  }
}

module.exports = BasePage;
