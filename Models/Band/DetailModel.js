const mongoose = require('mongoose')

const bandDetailSchema = mongoose.Schema({
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
    website : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default : true,
    },
})

module.exports = mongoose.model('detail',bandDetailSchema)