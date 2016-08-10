class NotFound extends Error {
  constructor(req) {
    super('Not Found');
    // properly capture stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = 400;
    this.tags = ['not-found-error', 'http'];
    this.route = req.url;
    // this will trick loggly to also store the entire stacktrace
    this.stacktrace = this.stack;
  }
}

module.exports = NotFound;