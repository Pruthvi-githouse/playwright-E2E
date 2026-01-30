/**
 * Test Data for Create Transaction E2E tests
 * Agent Maker credentials and comprehensive transaction details
 */

const agentMakerCredentials = {
  email: 'ohmmacker1@gmail.com',
  password: 'ohmmacker1@2026'
};

// Generate dynamic password based on email username
const generatePassword = (email) => {
  const emailUsername = email.split('@')[0];
  return `${emailUsername}@2025`;
};

const transactionData = {
  // ============ BOOKING DETAILS ============
  booking: {
    orderType: 'Order Type',
    transactionType: 'TRAVEL CARD',
    travelType: 'Outbound',
    documentType: 'PASSPORT',
    cardType: 'PHYSICAL CARD',
    cardPackId: 'PACK123',
    cardNumber: '4111111111111111',
    travelCountry: 'USA'
  },

  // ============ PERSONAL DETAILS ============
  personal: {
    fullName: 'John Doe',
    panNumber: 'ABCDE1234F',
    passportNumber: 'A12345678',
    nationality: 'INDIAN',
    emailId: 'john.doe@example.com',
    mobile: '9876543210',
    gender: 'MALE',
    maritalStatus: 'SINGLE',
    motherMaidenName: 'Jane Smith',
    customerType: 'Individual'
  },

  // ============ RESIDENTIAL DETAILS ============
  residential: {
    addressLine1: '123 Main Street',
    addressLine2: 'Apartment 456',
    country: 'INDIA',
    state: 'MAHARASHTRA',
    city: 'Mumbai',
    pincode: '400001'
  },

  // ============ PAYMENT DETAILS ============
  payment: {
    bank: 'HDFC Bank',
    utrNumber: 'UTR123456789',
    inrAmount: 50000
  },

  // ============ COMPANY DETAILS (if applicable) ============
  company: {
    legalName: 'DataSeed Tech PVT LTD',
    tradeName: 'DataSeed Technology',
    panNumber: 'FJQPR1623N',
    tin: '123456',
    cin: 'L12345AB1234CDE123456',
    lei: '123400ABCDEFGH567891',
    gstNumber: '27AAAPA1234A1Z5',
    gstType: 'Regular',
    businessWebsite: 'https://dataseed.com',
    businessPhone: '9876543210',
    businessEmail: 'info@dataseed.com',
    registeredAddress: {
      street: '123 Business Street',
      area: 'Tech Park',
      city: 'Bangalore',
      state: 'KARNATAKA',
      pincode: '560001'
    },
    legalEntityStatus: 'Private Limited Company',
    rbiLicenseCategory: 'FFMC',
    rbiLicenseNumber: '123456',
    fiuRegistrationNumber: '1234567890',
    lineOfBusiness: 'Payment Bank'
  },

  // ============ KEY CONTACT PERSONS ============
  contactPersons: {
    cpName: 'CP Manager',
    cpDesignation: 'Sales Manager',
    cpPAN: 'ABCD12345Z',
    cpPhone: '9876543210',
    cpEmail: 'cp@dataseed.com'
  },

  authorityPerson: {
    apName: 'ABC Auth',
    apDesignation: 'Authority Officer',
    apPAN: 'EFGH12345Z',
    apPhone: '9876543211',
    apEmail: 'auth@dataseed.com'
  },

  principleOfficer: {
    poName: 'PO Officer',
    poDesignation: 'Principle Officer',
    poEmail: 'po@dataseed.com',
    poPAN: 'IJKL12345Z'
  },

  director: {
    ddName: 'DD Director',
    ddDesignation: 'Director',
    ddEmail: 'director@dataseed.com',
    ddPAN: 'MNOP12345Z'
  },

  ebixRM: {
    rmName: 'John RM',
    rmDesignation: 'Relationship Manager',
    rmPhone: '9876543212',
    rmEmail: 'rm@ebix.com'
  },

  // ============ BENEFICIARY DETAILS ============
  beneficiaries: [
    {
      name: 'MAYSAR ALI MUSA ABDALLAH',
      nationality: 'Iraqi',
      documentNumber: 'T982812',
      dob: '1976-06-01',
      gender: 'Male',
      panNumber: 'ABCDE1222M',
      isPEP: 'Yes',
      pepDetails: '001'
    },
    {
      name: 'ROGAN ANTAL',
      nationality: 'Hungarian',
      documentNumber: 'T982791',
      dob: '1968-10-01',
      gender: 'Male',
      panNumber: 'ABCDE1234Z',
      isPEP: 'Yes',
      pepDetails: ''
    }
  ],

  // ============ DIRECTORS DETAILS ============
  directors: [
    {
      name: 'SHARAD MAHENDRA',
      nationality: 'Indian',
      documentNumber: 'T982191',
      dob: '1966-11-28',
      gender: 'Male',
      panNumber: 'ABAPR9856Q',
      din: '02100401',
      isPEP: 'Yes'
    },
    {
      name: 'Jeet Ram',
      nationality: 'Indian',
      documentNumber: 'T982892',
      dob: '1961-01-01',
      gender: 'Male',
      panNumber: 'ABAPR8856Q',
      din: '08102232',
      isPEP: 'Yes'
    },
    {
      name: 'PRADEEP GOYAL',
      nationality: 'Indian',
      documentNumber: 'T982892',
      dob: '1955-11-20',
      gender: 'Male',
      panNumber: 'ABKPR8856Q',
      din: '00008370',
      isPEP: 'Yes'
    }
  ],

  // ============ FINANCIAL DETAILS ============
  financial: {
    year1Turnover: '500',
    year1PBT: '100',
    year1PAT: '80',
    year1Assets: '1000',
    year1Liabilities: '200',
    year1Equity: '800',
    year2Turnover: '600',
    year2PBT: '120',
    year2PAT: '90',
    year2Assets: '1200',
    year2Liabilities: '250',
    year2Equity: '950',
    year3Turnover: '700',
    year3PBT: '150',
    year3PAT: '120',
    year3Assets: '1500',
    year3Liabilities: '300',
    year3Equity: '1200'
  },

  // ============ BANK ACCOUNT DETAILS ============
  bankAccounts: [
    {
      bankName: 'HDFC Bank',
      city: 'Mumbai',
      accountNumber: '1234567890',
      ifsc: 'HDFC0001'
    },
    {
      bankName: 'ICICI Bank',
      city: 'Bangalore',
      accountNumber: '0987654321',
      ifsc: 'ICIC0000001'
    }
  ],

  // ============ WITHDRAWAL CURRENCY ============
  withdrawal: {
    currency: 'USD'
  },

  // ============ DOCUMENTS ============
  documents: {
    tanCopy: '1.jpeg',
    panCopy: '2.jpg',
    addressProof: '3.png',
    certOfIncorporation: 'Test.pdf',
    moaAoa: '5.jpeg',
    boardResolution: '6.jpeg',
    rbiLicenseCopy: '17.jpg',
    siteVisitPhotos: '8.jpg',
    rmSiteVisitReport: '9.png',
    fiuRegistrationDetails: '10.png',
    gstCertificate: '11.jpg',
    uboDocument: '12.png',
    boDeclaration: '13.jpg',
    directorsList: '14.png',
    complianceStructure: '15.jpeg',
    balanceSheet: '16.png',
    nofCertificate: '17.jpg',
    amlQuestionnaire: '18.jpg'
  }
};

module.exports = {
  agentMakerCredentials,
  generatePassword,
  transactionData
};
