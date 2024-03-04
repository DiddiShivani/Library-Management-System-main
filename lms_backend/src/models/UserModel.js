const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
const userSchema = new mongoose.Schema({
    rollNumber :{
        type : Number,
        unique : true,
        required : true,
    },
    email :{
        type : String,
        unique : true,
        required : true
    },
    password :{
        type : String,
        required : true,
    },
    confirmPassword :{
        type : String,
        required : true,
    },
    contact : {
        type : Number,
        required : true,
    },
});
userSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);
module.exports = User;