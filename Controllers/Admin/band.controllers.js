const mongoose = require('mongoose');
const BandModel = require("../../Models/Admin/BandModel");


const addBand = async(req, res) => {
  console.log('location');
  const { name } = req.body
  const band = await BandModel.findOne({ name : name});
  if(!band){
  const newBand = new BandModel({ 
    name:name
  })
  newBand.save().then((result) => {
    res.json({success : true}) 
    
  }).catch((err) => { 
    console.log(err);
  });
  }else{  
    res.json({message : true})
  } 
  
} 
 

const findBand = async(req, res) => {
  const {id} = req.body
  let objectId =new mongoose.Types.ObjectId(id) 
  const band = await BandModel.findOne({ _id :objectId}); 
  if(band){
  res.json({ band, success: true });
    
    }else{ 
      res.json({message : false})
    } 
}


const editBand = async(req, res) => {
  const {id,name} = req.body
  const band = await BandModel.updateOne({_id:id},{ $set: { name: name } }); 
  console.log(band);
  if(band){
    res.json({ band, success: true });
      
      }else{ 
        res.json({message : false})
      } 
}


const blockBand = async(req, res) => {
  const {id} = req.body
  console.log(id);
  
  // const updatedBand = await BandModel.findByIdAndUpdate({_id:id},{ status: false }); 
  // console.log(updatedBand);
  // if (updatedBand) {
  //   res.json({ success: true, band: updatedBand });
  // } else {
  //   res.json({ success: false, message: 'Band not found' });
  // }
}



module.exports = {
    addBand,
    findBand,
    editBand,
    blockBand,
  };