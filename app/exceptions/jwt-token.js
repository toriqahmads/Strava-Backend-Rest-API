class JwtError extends Error {
  constructor (message) {
    if (!message || message === '') {
      message = 'jwt token not valid or expired';
    }

    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = 401;
  }
}

module.exports = JwtError
