const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//import router
const categoriesRouter = require('./app/api/v1/categories/router');

//inisiasi v1
const v1 = '/api/v1/cms';

// middlewares
const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to API Semina'
    });
});

app.use(v1, categoriesRouter);

//pastikan untuk middleware diletakkan di bawah api karna kalau diatasnya, maka dia akan dipanggil pertama kali sehingga
//middlewarenya tidak jalan pada di api
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);


module.exports = app;
