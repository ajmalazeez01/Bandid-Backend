const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default:true,
    },
})

module.exports = mongoose.model('location',locationSchema)