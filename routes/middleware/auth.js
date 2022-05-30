const AuthService = require('../services/auth');

async function tokenValidator (token) {
  try {
    await AuthService.verifyToken(token);
  } catch(e) {
    throw e;
  }
}

module.exports = tokenValidator;