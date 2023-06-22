const BandModel = require('../../Models/Admin/BandModel');
const LocationModel = require('../../Models/LocationModel');
const getLocationAndBand = async (req, res) => {
  const location = await LocationModel.find();
  const band = await BandModel.find();
  // console.log(location)
  if(!band && !location){
    res.json({success : true})
  }else{
    res.json({band : band,location : location})
  }
}
 
module.exports = {
    getLocationAndBand,
  };




 