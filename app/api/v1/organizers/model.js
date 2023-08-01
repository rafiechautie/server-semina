// (1) import package mongoose
const mongoose = require('mongoose');
// (1) import package mongoose
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, 'Penyelenggara harus diisi'],
    },
  },
  /**
   * timestamp digunakan untuk memberikan data created at dan update at di mongo
   */
  { timestamps: true }
);

module.exports = model('Organizer', organizersSchema);