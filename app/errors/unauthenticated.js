const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

//untuk menghalangi agar orang orang tidak bisa akses api sebelum punya token
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;