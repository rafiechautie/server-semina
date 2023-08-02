// import router dari express
const express = require('express');
const router = express();
// import product controller 
const { create, index, find, update, destroy } = require('./controller');

const {
    authenticateUser,
    authorizeRoles,
  } = require('../../../middlewares/auth');

//saat akses route categoreis, maka yang tampil adalah halaman ini

//pasang route endpoint show category
router.get('/categories', authenticateUser, authorizeRoles('organizer'), index);

//pasang route endpoint show category berdasarkan id
router.get(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  find
);

// pasangkan route endpoint dengan method `create`
router.post('/categories', authenticateUser, create);

//pasang route endpoint update category berdasarkan id
router.put(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  update
);

//pasang route endpoint hapus category berdasarkan id
router.delete(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('organizer'),
  destroy
);


// export router 
module.exports = router;