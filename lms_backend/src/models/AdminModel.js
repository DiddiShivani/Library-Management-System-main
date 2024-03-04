const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
const adminSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true,
    }
});
adminSchema.plugin(findOrCreate);
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;