const Images = require('../../api/v1/images/model');

const createImages = async (req) => {
    //kalau ada imagenya maka kita ambil filenamenya, jika tidak ada maka pakek default.jpeg
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/avatar/default.jpeg',
  });

  return result;
};

module.exports = { createImages };