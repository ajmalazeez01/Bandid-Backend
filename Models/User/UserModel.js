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
    password : {
        type : String,
        required : true,
    },
    file : {
        type : String,
    },
    gender : {
        type : String,
    },
    status : {
        type : Boolean,
        default : true,
    },
})

module.exports = mongoose.model('user',signupSchema)