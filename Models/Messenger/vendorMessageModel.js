const mongoose = require('mongoose')

const vendorMessageSchema = mongoose.Schema(
    {
    email : {
        type : String,
    },
    messages : {
        type : Array,
    },
    
},{timestamps:true}
)

module.exports = mongoose.model('vendormessage',vendorMessageSchema)