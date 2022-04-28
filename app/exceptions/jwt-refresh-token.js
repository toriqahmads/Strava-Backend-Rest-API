class JwtRefreshError extends Error {
  constructor (message) {
    if (!message || message === '') {
      message = 'jwt refresh token not valid or expired';
    }

    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.code = 401;
  }
}

module.exports = JwtRefreshError
