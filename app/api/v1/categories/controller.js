const Categories = require('./model');
// import services categories
const {
    getAllCategories,
    getOneCategories,
    updateCategories,
    createCategories,
    deleteCategories,
  } = require('../../../services/mongoose/categories');

  const { StatusCodes } = require('http-status-codes');

/**
 * 
 * @param {* request adalah data yang diinput dari client} req 
 * @param {* hasil dari request} res 
 * @param {* next untuk menangkap error} next 
 */
//membuat model Category
const create = async (req, res, next) => {
    try {
      const result = await createCategories(req);
    // berikan response kepada client dengan mengembalikan product yang baru dibuat
      res.status(StatusCodes.CREATED).json({
        data: result,
      });
    } catch (err) {
        // jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
      next(err);
    }
  };


//menampilkan data model category
const index = async (req, res, next) => {
    try {
      const result = await getAllCategories();
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    }catch (err) {
      next(err);
    }
};

//menampilkan data model categories berdasarkan id
const find = async (req, res, next) => {
    try {
      const result = await getOneCategories(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

//update data model categories berdasarkan id
const update = async (req, res, next) => {
    try {
      const result = await updateCategories(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
  

//hapus data model categories berdasarkan id
const destroy = async (req, res, next) => {
    try {
      const result = await deleteCategories(req);
  
      res.status(StatusCodes.OK).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

// Export fungsi create pada controller categories
module.exports = {
    index,
    create,
    find,
    update,
    destroy,
};
