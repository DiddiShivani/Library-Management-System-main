const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    paid: { 
        type: Boolean, 
        default: false 
    },
});
const Fine = mongoose.model('Fine',fineSchema);
module.exports = Fine;