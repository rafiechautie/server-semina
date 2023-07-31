// import router dari express
const express = require('express');
const router = express();



// import product controller 
const { create, index, find, update, destroy } = require('./controller');

//saat akses route categoreis, maka yang tampil adalah halaman ini

//pasang route endpoint show category
router.get('/categories', index);

//pasang route endpoint show category berdasarkan id
router.get('/categories/:id', find);

// pasangkan route endpoint dengan method `create`
router.post('/categories', create);

//pasang route endpoint update category berdasarkan id
router.put('/categories/:id', update);

//pasang route endpoint hapus category berdasarkan id
router.delete('/categories/:id', destroy);


// export router 
module.exports = router;