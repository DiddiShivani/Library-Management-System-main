const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reservationDate : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        default : 'Aproved',
        enum : ['Aproved', 'Pending', 'Expired'],
    },
});
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;