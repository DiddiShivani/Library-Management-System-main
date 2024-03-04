const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: true
    },
    feedbackDate: {
        type: Date,
        default: Date.now
    },
});

const Feedback = mongoose.model('Feedback',feedbackSchema);
module.exports = Feedback;