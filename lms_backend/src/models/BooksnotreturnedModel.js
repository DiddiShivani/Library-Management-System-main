const mongoose = require('mongoose');

const NotReturnedSchema = new mongoose.Schema({
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
      default: Date.now(),
    },
    returnDate: {
      type: Date,
      default: null,
    },
    daysDue :{
        type:Number,
    }
  }],
});


const NotReturned = mongoose.model('NotReturned', NotReturnedSchema);
module.exports = NotReturned;