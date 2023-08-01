const Images = require('../../api/v1/images/model');

// import custom error not found dan bad request
const { NotFoundError } = require('../../errors');

const createImages = async (req) => {
    //kalau ada imagenya maka kita ambil filenamenya, jika tidak ada maka pakek default.jpeg
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/avatar/default.jpeg',
  });

  return result;
};

// tambahkan function checking Image 
const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);
  
    if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);
  
    return result;
  };

  module.exports = { createImages, checkingImage };