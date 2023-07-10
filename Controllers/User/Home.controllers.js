const DetailModel = require("../../Models/Band/DetailModel");

const category = async (req, res) => {
    try {
    const band = await DetailModel.find({status : true});
    // console.log(band);
    if(!category){
        res.json({success : true})
      }else{
        res.json({message : band})
      }
    } catch (error) {
        console.log(error);
    }
}


  
module.exports = { 
    category,
  };