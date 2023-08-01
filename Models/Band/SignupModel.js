const mongoose = require('mongoose')

const signupSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    mobile : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    verify : {
        type : Boolean,
        default : false,
    },
    status : {
        type : Boolean,
        default : true,
    },
})

module.exports = mongoose.model('vendor',signupSchema)