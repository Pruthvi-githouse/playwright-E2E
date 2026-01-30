/**
 * Test Data Helper
 * Provides test data for various scenarios
 */
const testData = {
  validUser: {
    username: 'testuser@example.com',
    password: 'SecurePassword123!'
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'WrongPassword'
  },
  emptyCredentials: {
    username: '',
    password: ''
  }
};

module.exports = testData;
