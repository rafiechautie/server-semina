const Categories = require('./model');

/**
 * 
 * @param {* request adalah data yang diinput dari client} req 
 * @param {* hasil dari request} res 
 * @param {* next untuk menangkap error} next 
 */
//membuat model Category
const create = async (req, res, next) => {
    try{
        // membuat categories baru menggunakan data dari `name`
        const { name } = req.body;
        // simpan Category yang baru dibuat ke MongoDB
        const result = await Categories.create({ name });
        // berikan response kepada client dengan mengembalikan product yang baru dibuat
        res.status(201).json({
            data: result,
        });
    }catch (err) {
		// jika terjadi kesalahan kemudian gunakan method `next` agar Express memproses error tersebut
        next(err);
    }
}

//menampilkan data model category
const index = async (req, res, next) => {
    try {
        // mengambil seluruh field di data categories  
        // const result = await categories.find();
            
        //mengambil field tertentu, contoh nama dan id
        const result = await Categories.find().select('_id name')

        res.status(200).json({
            data: result,
        });
    } catch (err) {
         next(err);
    }
};

//menampilkan data model categories berdasarkan id
const find = async (req, res, next) => {
    try {
        /**
         * penamaan di kurung kurawal namanya disamakan dengan yang ada di router
         * di router endpointnya /categories/:id, maka nama variable di kurung kurawal juga id
         */
        const { id } = req.params;
        
        // mencari categories di MongoDB berdasarkan field _id
        const result = await Categories.findOne({ _id: id });
   
        // bila result tidak mendapatkan data categories maka akan mereturn response `message: 'Id categories tidak ditemukan'`
        if (!result) {
            return res.status(404).json({ message: 'Id categories tidak ditemukan' });
        }
    
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

//update data model categories berdasarkan id
const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
    
        // cari dan update categories berdasarkan field _id
        const result = await Categories.findOneAndUpdate(
            { _id: id },
            { name },
            { new: true, runValidators: true } // menampilkan data baru dan menjalankan validation
        );
    
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

//hapus data model categories berdasarkan id
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // cari dan hapus categories berdasakan field _id
        const result = await Categories.findByIdAndRemove(id);
        res.status(200).json({
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
