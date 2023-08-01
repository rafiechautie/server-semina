const { StatusCodes } = require('http-status-codes');


/*
    semua error yag terjadi akan dimasukan ke sini agar terdapat pesan custome error
*/
const errorHandlerMiddleware = (err, req, res, next) => {
    //jika statuscodenya tidak ada maka defaultnya adalah statuscodes internal server error dengan pesan terlampir
    // console.log(err); ->untuk debug isi variable
      let customError = {
      // set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Something went wrong try again later',
    };
    //error yang terjadi pada saat di model, misalnya Panjang nama kategori kurang dari 3 karakter akan masuk ke sini
    // error validation dari mongoose
    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(', ');
      customError.statusCode = 400;
    }

    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = 400;
    }
    if (err.name === 'CastError') {
      customError.msg = `No item found with id : ${err.value}`;
      customError.statusCode = 404;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;