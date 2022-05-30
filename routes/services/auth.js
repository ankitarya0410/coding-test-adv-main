const jwt = require('jsonwebtoken');

function UnauthorizedException(code, message) {
  this.message = message;
  this.code = code;
  this.name = 'UnauthorizedException';
}

class AuthService {
  static getToken() {
    return jwt.sign(
      { user: 'somevaliduser' },
      process.env.SIGNING_KEY,
      { expiresIn: '2 days' },
    );
  }

  static async verifyToken(token) {
    try {
      await jwt.verify(
        token,
        process.env.SIGNING_KEY
      );
    } catch(e) {
      throw new UnauthorizedException(401, 'Token verification failed');
    }
  }
}

module.exports = AuthService;