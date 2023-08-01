// import http-status-codes
const { StatusCodes } = require('http-status-codes');
// import custom-api
const CustomAPIError = require('./custom-api-error');

/**
 * Bad request digunakan saat ada request yang tidak sesuai dari client ke server
 *  contohnya saat kita menambahkan categories dengan name yang sama maka request
 *  dari server akan memberikan statusCode bad-request dengan message duplicate name
 */
class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    // memberikan statusCode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;