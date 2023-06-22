const asyncHandler = require('express-async-handler');
const LocationModel = require('../../Models/LocationModel');
const { default: mongoose } = require('mongoose');

const addLocation = asyncHandler(async(req, res) => {
  console.log('location');
  const { name } = req.body
  const location = await LocationModel.findOne({ name : name});
  if(!location){
  const newLocation = new LocationModel({ 
    name:name
  })
  newLocation.save().then((result) => {
    res.json({success : true}) 
    
  }).catch((err) => { 
    console.log(err);
  });
  }else{ 
    res.json({message : true})
  }
  
})

const findLocation = async(req, res) => {
  const {id} = req.body
  let objectId =new mongoose.Types.ObjectId(id) 
  const band = await LocationModel.findOne({ _id :objectId}); 
  if(band){
  res.json({ band, success: true });
    
    }else{ 
      res.json({message : false})
    } 
}

const editLocation = async(req, res) => {
  const {id,name} = req.body
  const band = await LocationModel.updateOne({_id:id},{ $set: { name: name } }); 
  console.log(band);
  if(band){
    res.json({ band, success: true });
      
      }else{ 
        res.json({message : false})
      } 

}

const blocklocation = async(req,res) => {

}


module.exports = {
    addLocation,
    findLocation,
    editLocation,
    blocklocation,
  };
 