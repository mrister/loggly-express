class InternalServerError extends Error {
  constructor(originalError, req) {
    super('Internal Server Error');
    // properly capture stack trace in Node.js
    Error.captureStackTrace(originalError, originalError.constructor);
    this.name = this.constructor.name;
    this.status = 500;
    this.tags = ['internal-server-error', 'http'];
    this.route = req.url;
    // this will trick loggly to also store the entire stacktrace
    this.stacktrace = this.stack;
    this.originalError = originalError;
  }
}

module.exports = InternalServerError;