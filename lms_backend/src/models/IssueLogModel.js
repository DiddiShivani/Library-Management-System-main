const mongoose = require('mongoose');

const issuedSchema = new mongoose.Schema({
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
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  }],
});

const Issued = mongoose.model('Issued', issuedSchema);

module.exports = Issued;