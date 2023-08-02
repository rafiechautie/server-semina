// import model categories
const Categories = require('../../api/v1/categories/model');

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllCategories = async (req) => {
  console.log(req);
    // mengambil seluruh field di data categories  
    const result = await Categories.find({ organizer: req.user.organizer });

    //mengambil field tertentu, contoh nama dan id
    // const result = await Categories.find().select('_id name')

    return result;
};

const createCategories = async (req) => {
    // mengambil data name yang diinput user
    const { name } = req.body;

    // cari categories dengan field name
    const check = await Categories.findOne({ 
      name,
      organizer: req.user.organizer,
     });

    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check) throw new BadRequestError('kategori nama duplikat');
    // simpan Category yang baru dibuat ke MongoDB
    const result = await Categories.create({
       name,
       organizer: req.user.organizer,
      });

    return result;
};

const getOneCategories = async (req) => {

    /**
    * penamaan di kurung kurawal namanya disamakan dengan yang ada di router
    ** di router endpointnya /categories/:id, maka nama variable di kurung kurawal juga id
     */
    const { id } = req.params;

    // mencari categories di MongoDB berdasarkan field _id
    const result = await Categories.findOne({
       _id: id,
       organizer: req.user.organizer,
       });

    // bila result tidak mendapatkan data categories maka akan mereturn response `message: 'Id categories tidak ditemukan'`
    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  //jadi fungsinya untuk mengecek apakah data yang diinput sebelumnya sudah ada atau belum
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check) throw new BadRequestError('kategori nama duplikat');

  // cari dan update categories berdasarkan field _id
  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true } // menampilkan data baru dan menjalankan validation
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  // cari dan hapus categories berdasakan field _id
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  await result.deleteOne();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};