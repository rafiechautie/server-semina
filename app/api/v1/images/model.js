const mongoose = require('mongoose');
const { model, Schema } = mongoose;

/*
user tidak harus upload image, nanti kalau dia tidak uploam image maka akan diberikan image default
*/
let imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = model('Image', imageSchema);