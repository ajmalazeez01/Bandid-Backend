const mongoose = require('mongoose');
const BandModel = require("../../Models/Admin/BandModel");


const addBand = async(req, res) => {
 try {
  const { name } = req.body
  const band = await BandModel.findOne({ name : name.toLowerCase()});
  console.log(band);
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
 } catch (error) {
  console.log(error);
 }
  
} 
 

const findBand = async(req, res) => {
  try {
    const {id} = req.body
  let objectId =new mongoose.Types.ObjectId(id) 
  const band = await BandModel.findOne({ _id :objectId}); 
  if(band){
  res.json({ band, success: true });
    
    }else{ 
      res.json({message : false})
    } 
  } catch (error) {
    console.log(error);
  }
}


const editBand = async(req, res) => {
  try {
    const {id,name} = req.body
  const band = await BandModel.updateOne({_id:id},{ $set: { name: name } }); 
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


const blockBand = async(req, res) => {
  try {
    const { id } = req.query
  const find = await BandModel.findById(id);
  console.log(find);
  if (find.status == true) {
    await BandModel.findByIdAndUpdate(id, { $set: { status: false } });
    res.json({ success: true});
  }else{
    await BandModel.findByIdAndUpdate(id, { $set: { status: true } });
    res.json({ success: true, message: 'Band not found' });
  }
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
    addBand,
    findBand,
    editBand,
    blockBand,
  };