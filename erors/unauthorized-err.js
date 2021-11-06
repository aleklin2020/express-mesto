class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    console.log(cookie)
  }
}

module.exports = UnauthorizedError;
