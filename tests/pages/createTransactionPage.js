const BasePage = require('./basePage');

/**
 * Create Transaction Page Object
 * Handles the forex transaction creation form for Agent Maker application
 */
class CreateTransactionPage extends BasePage {
  // Page URL
  static get URL() {
    return 'https://uat-agent.ebixcard.com/createTransaction';
  }

  constructor(page) {
    super(page);

    // ==================== BOOKING DETAILS SECTION ====================
    // Card and transaction selection
    this.orderTypeInput = page.locator('input[name="orderType"]');
    this.transactionTypeInput = page.locator('input[name="transactionType"]');
    this.travelTypeInput = page.locator('input[name="travelType"]');
    this.documentTypeInput = page.locator('input[name="documentType"]');
    this.cardTypeInput = page.locator('input[name="cardType"]');
    this.cardPackIdInput = page.locator('input[id="_r_6_"]');
    this.cardNumberInput = page.locator('input[id="_r_7_"]');
    this.dateOfDepartureInput = page.locator('input[id="_r_8_"]');
    this.travelCountryInput = page.locator('input[name="travelCountry"]');

    // ==================== PERSONAL DETAILS SECTION ====================
    this.fullNameInput = page.locator('input[id="_r_c_"]');
    this.panNumberInput = page.locator('input[id="_r_d_"]');
    this.panProofInput = page.locator('input[id="_r_e_"]');
    this.passportNumberInput = page.locator('input[id="_r_h_"]');
    this.passportProofInput = page.locator('input[id="_r_i_"]');
    this.dateOfBirthInput = page.locator('input[id="_r_l_"]');
    this.nationalityInput = page.locator('input[name="nationality"]');
    this.emailInput = page.locator('input[id="_r_p_"]');
    this.mobileInput = page.locator('input[id="_r_q_"]');
    this.genderInput = page.locator('input[name="gender"]');
    this.maritalStatusInput = page.locator('input[name="maritalStatus"]');
    this.motherMaidenNameInput = page.locator('input').filter({ hasText: /mother|maiden/i }).first();
    this.customerTypeInput = page.locator('input').filter({ hasText: /customer type/i }).first();

    // ==================== RESIDENTIAL DETAILS SECTION ====================
    this.addressLine1Input = page.locator('input').filter({ hasText: /address|line 1/i }).first();
    this.addressLine2Input = page.locator('input').filter({ hasText: /address|line 2/i }).first();
    this.countryInput = page.locator('input[name="country"]');
    this.stateInput = page.locator('input[name="state"]');
    this.cityInput = page.locator('input').filter({ hasText: /city/i }).first();
    this.pincodeInput = page.locator('input').filter({ hasText: /pincode|postal/i }).first();

    // ==================== PAYMENT DETAILS SECTION ====================
    this.bankInput = page.locator('input').filter({ hasText: /bank/i }).first();
    this.utrNumberInput = page.locator('input').filter({ hasText: /utr|reference/i }).first();
    this.inrAmountInput = page.locator('input[name="inrAmount"]');

    // ==================== WITHDRAWAL CURRENCY SECTION ====================
    this.currencyInput = page.locator('input[name="currency"]');
    this.forexValueInput = page.locator('input').filter({ hasText: /value|amount|quantity/i }).first();
    this.forexRateInput = page.locator('input').filter({ hasText: /rate|exchange/i }).first();
    this.addCurrencyButton = page.getByRole('button', { name: /add currency/i });

    // ==================== UPLOAD DOCUMENTS SECTION ====================
    this.passportFileInput = page.locator('#file-input-Passport');
    this.a2FormFileInput = page.locator('#file-input-A2\\ Form');
    this.visaFileInput = page.locator('#file-input-VISA');
    this.ticketFileInput = page.locator('#file-input-Ticket');
    this.panFileInput = page.locator('#file-input-PAN');
    this.sourceOfFundFileInput = page.locator('#file-input-SourceOfFund');
    this.remarksTextarea = page.locator('textarea[id="_r_3h_"]');

    // ==================== CREATE TRANSACTION BUTTON ====================
    this.createTransactionButton = page.getByRole('button', { name: /create transaction/i });
    this.doneButton = page.getByRole('button', { name: /done/i });

    // ==================== ADDITIONAL FIELDS (from recorder script) ====================
    // For dropdown selections that use text matching
    this.sellOption = page.locator('.MuiButtonBase-root:nth-child(3)');
    this.reloadOption = page.locator('.MuiButtonBase-root:nth-child(2)').first();
  }

  /**
   * Navigate to the Create Transaction page
   */
  async navigateToCreateTransaction() {
    await this.goto(CreateTransactionPage.URL);
  }

  /**
   * Fill Booking Details section
   * @param {Object} bookingDetails - Object containing booking details
   * @param {string} bookingDetails.orderType - Order type selection
   * @param {string} bookingDetails.transactionType - Transaction type selection
   * @param {string} bookingDetails.travelType - Travel type selection
   * @param {string} bookingDetails.documentType - Document type selection
   * @param {string} bookingDetails.cardType - Card type selection
   * @param {string} bookingDetails.cardPackId - Card package ID
   * @param {string} bookingDetails.cardNumber - Card number
   * @param {string} bookingDetails.travelCountry - Travel destination country
   */
  async fillBookingDetails(bookingDetails) {
    // For MUI Autocomplete fields, need to click first then type
    if (bookingDetails.orderType) {
      await this.orderTypeInput.click();
      await this.page.getByText(bookingDetails.orderType, { exact: true }).first().click().catch(() => {});
    }
    if (bookingDetails.transactionType) {
      await this.transactionTypeInput.click();
      await this.page.getByText(bookingDetails.transactionType, { exact: true }).first().click().catch(() => {});
    }
    if (bookingDetails.travelType) {
      await this.travelTypeInput.click();
      await this.page.getByText(bookingDetails.travelType, { exact: true }).first().click().catch(() => {});
    }
    if (bookingDetails.documentType) {
      await this.documentTypeInput.click();
      await this.page.getByText(bookingDetails.documentType, { exact: true }).first().click().catch(() => {});
    }
    if (bookingDetails.cardType) {
      await this.cardTypeInput.click();
      await this.page.getByText(bookingDetails.cardType, { exact: true }).first().click().catch(() => {});
    }
    if (bookingDetails.cardPackId) await this.cardPackIdInput.fill(bookingDetails.cardPackId);
    if (bookingDetails.cardNumber) await this.cardNumberInput.fill(bookingDetails.cardNumber);
    if (bookingDetails.travelCountry) await this.travelCountryInput.fill(bookingDetails.travelCountry);
  }

  /**
   * Fill Personal Details section
   * @param {Object} personalDetails - Object containing personal information
   * @param {string} personalDetails.fullName - Full name of customer
   * @param {string} personalDetails.panNumber - PAN number
   * @param {string} personalDetails.passportNumber - Passport number
   * @param {string} personalDetails.nationality - Nationality selection
   * @param {string} personalDetails.emailId - Email address
   * @param {string} personalDetails.mobile - Mobile number
   * @param {string} personalDetails.gender - Gender selection
   * @param {string} personalDetails.maritalStatus - Marital status selection
   * @param {string} personalDetails.motherMaidenName - Mother's maiden name
   * @param {string} personalDetails.customerType - Customer type selection
   */
  async fillPersonalDetails(personalDetails) {
    if (personalDetails.fullName) await this.fullNameInput.fill(personalDetails.fullName);
    if (personalDetails.panNumber) await this.panNumberInput.fill(personalDetails.panNumber);
    if (personalDetails.passportNumber) await this.passportNumberInput.fill(personalDetails.passportNumber);
    if (personalDetails.nationality) {
      await this.nationalityInput.click();
      await this.page.getByText(personalDetails.nationality, { exact: true }).first().click().catch(() => {});
    }
    if (personalDetails.emailId) await this.emailInput.fill(personalDetails.emailId);
    if (personalDetails.mobile) await this.mobileInput.fill(personalDetails.mobile);
    if (personalDetails.gender) {
      await this.genderInput.click();
      await this.page.getByText(personalDetails.gender, { exact: true }).first().click().catch(() => {});
    }
    if (personalDetails.maritalStatus) {
      await this.maritalStatusInput.click();
      await this.page.getByText(personalDetails.maritalStatus, { exact: true }).first().click().catch(() => {});
    }
    if (personalDetails.motherMaidenName) await this.motherMaidenNameInput.fill(personalDetails.motherMaidenName);
    if (personalDetails.customerType) {
      await this.customerTypeInput.click();
      await this.page.getByText(personalDetails.customerType, { exact: true }).first().click().catch(() => {});
    }
  }

  /**
   * Fill Residential Details section
   * @param {Object} residentialDetails - Object containing address information
   * @param {string} residentialDetails.addressLine1 - Address line 1
   * @param {string} residentialDetails.addressLine2 - Address line 2
   * @param {string} residentialDetails.country - Country selection
   * @param {string} residentialDetails.state - State/Province selection
   * @param {string} residentialDetails.city - City name
   * @param {string} residentialDetails.pincode - Postal code
   */
  async fillResidentialDetails(residentialDetails) {
    if (residentialDetails.addressLine1) await this.addressLine1Input.fill(residentialDetails.addressLine1);
    if (residentialDetails.addressLine2) await this.addressLine2Input.fill(residentialDetails.addressLine2);
    if (residentialDetails.country) await this.countryInput.fill(residentialDetails.country);
    if (residentialDetails.state) {
      await this.stateInput.click();
      await this.page.getByText(residentialDetails.state, { exact: true }).first().click().catch(() => {});
    }
    if (residentialDetails.city) await this.cityInput.fill(residentialDetails.city);
    if (residentialDetails.pincode) await this.pincodeInput.fill(residentialDetails.pincode);
  }

  /**
   * Fill Payment Details section
   * @param {Object} paymentDetails - Object containing payment information
   * @param {string} paymentDetails.bank - Bank name selection
   * @param {string} paymentDetails.utrNumber - UTR/Transaction reference number
   * @param {number} paymentDetails.inrAmount - Amount in INR
   */
  async fillPaymentDetails(paymentDetails) {
    if (paymentDetails.bank) await this.bankInput.fill(paymentDetails.bank);
    if (paymentDetails.utrNumber) await this.utrNumberInput.fill(paymentDetails.utrNumber);
    if (paymentDetails.inrAmount) await this.inrAmountInput.fill(paymentDetails.inrAmount.toString());
  }

  /**
   * Fill Withdrawal Currency section
   * @param {Object} withdrawalDetails - Object containing withdrawal currency info
   * @param {string} withdrawalDetails.currency - Withdrawal currency code
   */
  async fillWithdrawalCurrency(withdrawalDetails) {
    // Placeholder for currency selection (part of Booking Details)
    if (withdrawalDetails.currency) {
      // Implementation depends on actual page structure
      // This might be a combobox or radio button group
    }
  }

  /**
   * Upload documents in Upload Documents section
   * @param {Object} documentPaths - Object with document types and file paths
   */
  async uploadDocuments(documentPaths) {
    // Passport
    if (documentPaths.passport) {
      await this.passportFileInput.setInputFiles(documentPaths.passport).catch(() => {});
    }
    // A2 Form
    if (documentPaths.a2Form) {
      await this.a2FormFileInput.setInputFiles(documentPaths.a2Form).catch(() => {});
    }
    // VISA
    if (documentPaths.visa) {
      await this.visaFileInput.setInputFiles(documentPaths.visa).catch(() => {});
    }
    // Ticket
    if (documentPaths.ticket) {
      await this.ticketFileInput.setInputFiles(documentPaths.ticket).catch(() => {});
    }
    // PAN
    if (documentPaths.pan) {
      await this.panFileInput.setInputFiles(documentPaths.pan).catch(() => {});
    }
    // Source of Fund
    if (documentPaths.sourceOfFund) {
      await this.sourceOfFundFileInput.setInputFiles(documentPaths.sourceOfFund).catch(() => {});
    }
  }

  /**
   * Fill remarks/comments textarea
   * @param {string} remarks - Remarks text
   */
  async fillRemarks(remarks) {
    if (remarks) {
      await this.remarksTextarea.fill(remarks);
    }
  }

  /**
   * Select withdrawal currency
   * @param {string} currency - Currency code (e.g., 'USD', 'EUR')
   */
  async selectCurrency(currency) {
    if (currency) {
      await this.currencyInput.click();
      await this.page.getByText(currency, { exact: true }).first().click().catch(() => {});
    }
  }

  /**
   * Fill forex details
   * @param {Object} forexDetails - Object with forex value and rate
   * @param {string} forexDetails.value - Forex value
   * @param {string} forexDetails.rate - Forex rate
   */
  async fillForexDetails(forexDetails) {
    if (forexDetails.value) {
      await this.forexValueInput.fill(forexDetails.value);
    }
    if (forexDetails.rate) {
      await this.forexRateInput.fill(forexDetails.rate);
    }
  }

  /**
   * Click Add Currency button
   */
  async clickAddCurrency() {
    await this.addCurrencyButton.click();
  }

  /**
   * Click Create Transaction button
   */
  async clickCreateTransaction() {
    await this.createTransactionButton.click();
  }

  /**
   * Click Done button (confirmation)
   */
  async clickDone() {
    await this.doneButton.click();
  }

  /**
   * Fill date using MUI date picker
   * @param {string} dateStr - Date in format 'DD-MM-YYYY'
   */
  async fillDateField(dateStr) {
    if (!dateStr) return;
    
    const [day, month, year] = dateStr.split('-');
    
    // Fill day
    await this.page.type('[aria-label="Day"]', day).catch(() => {});
    
    // Fill month
    await this.page.type('[aria-label="Month"]', month).catch(() => {});
    
    // Fill year
    await this.page.type('[aria-label="Year"]', year).catch(() => {});
  }

  /**
   * Click Create Transaction button
   */
  async clickCreateTransaction() {
    await this.createTransactionButton.click();
  }

  /**
   * Submit the complete transaction form
   * @param {Object} transactionData - Complete transaction data object
   */
  async createTransaction(transactionData) {
    if (transactionData.booking) await this.fillBookingDetails(transactionData.booking);
    if (transactionData.personal) await this.fillPersonalDetails(transactionData.personal);
    if (transactionData.residential) await this.fillResidentialDetails(transactionData.residential);
    if (transactionData.payment) await this.fillPaymentDetails(transactionData.payment);
    if (transactionData.withdrawal) await this.fillWithdrawalCurrency(transactionData.withdrawal);
    if (transactionData.documents) await this.uploadDocuments(transactionData.documents);
    
    await this.clickCreateTransaction();
  }

  /**
   * Check if Create Transaction button is visible and enabled
   * @returns {Promise<boolean>} True if button is visible and enabled
   */
  async isCreateButtonVisible() {
    return await this.createTransactionButton.isVisible();
  }

  /**
   * Check if Create Transaction button is enabled
   * @returns {Promise<boolean>} True if button is enabled
   */
  async isCreateButtonEnabled() {
    return await this.createTransactionButton.isEnabled();
  }
}

module.exports = CreateTransactionPage;
