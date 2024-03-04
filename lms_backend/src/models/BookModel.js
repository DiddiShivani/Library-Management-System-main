const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const bookSchema = new mongoose.Schema({
    title :{
        type : String,
        unique : true,
        required : true,
    },
    author :{
        type : String,
    },
    isbn :{
        type : String,
    },
    genre :{
        type : String,
    },
    publishedDate :{
        type : Date,
    },
    rating :{
        type : Number,
    },
    image :{
        type : String,
    },
    quantity : {
        type :Number,
        required : true,
    },
    status : {
        type :String ,
    },
});
bookSchema.plugin(findOrCreate);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;