const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const multer = require('../middleware/multer-config');

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ratings: { type: [{ userId: String, grade: Number }], default: [] },
  averageRating: { type: Number, default: 0 },
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);
