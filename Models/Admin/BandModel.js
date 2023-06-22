const mongoose = require('mongoose')

const bandSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default:true,
    },
})

module.exports = mongoose.model('band',bandSchema)