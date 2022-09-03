const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const today = new Date();
const current_year = today.getFullYear();


const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '----Not available----'
    },

    isbn: {
        type: String,
        minlength: 10,
        maxlength: 13,
        required: true,
        unique: true
    },
    cat: {
        type: String,
        enum: ['Romance','Technology','Computer Science','Management','Electronics','Physics','Chemistry','Mathematics','Fiction','Philosophy','Language','Arts','Other'],
        required: true
    },
    shelf: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    floor: {
        type: Number, min: 0, max: 8
    }, 
    copies: {
        type: Number,
        min: 1, max: 1000, required: true
    },
    publishYear: {
        type: Number, max: current_year
    },
    editor: {
        type: String, required: true
    },
    publisher:{
        type:String,
    },
    edition: {
        type: Number, min: 1, max: 1000
    },
    pageCount: {
        type: Number, min:1 
    },
    language: {
        type: String, enum: ['Turkish', 'English', 'German', 'Italian', 'French', 'Arabic', 'Persian', 'Greek', 'Spanish','Polish', 'Other', 'Unknown'],
        required: true
    }
}, {
    timestamps: true
});
var Books = mongoose.model('Book',bookSchema);

module.exports=Books;