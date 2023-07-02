const asyncHandler = require('express-async-handler');
const { default: mongoose } = require('mongoose');
const LocationModel = require('../../Models/Admin/LocationModel');

const addLocation = asyncHandler(async(req, res) => {
  try {
  const { name } = req.body
  const location = await LocationModel.findOne({ name : name.toLowerCase()});
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
  
  } catch (error) {
    console.log(error);
  }
})

const findLocation = async(req, res) => {
  try {
  const {id} = req.body
  let objectId =new mongoose.Types.ObjectId(id) 
  const band = await LocationModel.findOne({ _id :objectId}); 
  if(band){
  res.json({ band, success: true });
    
    }else{ 
      res.json({message : false})
    } 
  } catch (error) {
    console.log(error);
  }
}

const editLocation = async(req, res) => {
  try {
    const {id,name} = req.body
  const band = await LocationModel.updateOne({_id:id},{ $set: { name: name } }); 
  console.log(band);
  if(band){
    res.json({ band, success: true });
      
      }else{ 
        res.json({message : false})
      } 
  } catch (error) {
    console.log(error);
  }

}

const blocklocation = async(req, res) => {
  try {
    const { id } = req.query
  const find = await LocationModel.findById(id);
  if (find.status == true) {
    await LocationModel.findByIdAndUpdate(id, { $set: { status: false } });
    res.json({ success: true});
  }else{
    await LocationModel.findByIdAndUpdate(id, { $set: { status: true } });
    res.json({ success: true });
  }
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    addLocation,
    findLocation,
    editLocation,
    blocklocation,
  };
 