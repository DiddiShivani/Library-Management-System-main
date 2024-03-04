const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', 
      required: true,
    },
    bookmarkDate: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;