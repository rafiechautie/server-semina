const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
    },
    role: {
      type: String,
      default: '-',
    },
		// untuk membuat relasi pada mongodb kita perlu membuat types ObjectId
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image', //harus sama dengan nama model yang di export di model.js folder Images (ref singkatan dari reference, yang artinya dia mereference ke table images)
      required: true, //wajib disi
    },
  },
  { timestamps: true }
);

module.exports = model('Talent', talentSchema);