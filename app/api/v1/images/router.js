const express = require('express');
const router = express();
const { create } = require('./controller');
const upload = require('../../../middlewares/multer');

//nama avatar disana harus sama dengan key yang ada di postman saat uji upload images
router.post('/images', upload.single('avatar'), create);
module.exports = router;