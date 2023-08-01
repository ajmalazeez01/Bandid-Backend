const { default: mongoose } = require("mongoose");
const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");
const ReviewModel = require("../../Models/User/ReviewModel");
const BookingModel = require("../../Models/User/BookingModel");

const bandDetail = async (req, res) => {
   try {
    // console.log(req.body);
    const Matchemail = req.params.email;
    const pic = req.file.path
    console.log(pic);
    await DetailModel.updateMany({ email: Matchemail }, { $set: { file: pic } });
    const {email,name,category,mobile,website,service,description,location} = req.body
    const detailExist = await DetailModel.findOne({ email: email });
    if (detailExist) {
      res.json({ message: "User already been exit" });
    } else {
        const bandData = new DetailModel({
            email: email,
            name: name,
            category : category,
            mobile: mobile,
            website : website,
            service : service,
            description : description,
            location: location,
            file: pic
          });
          bandData.save().then((result) => {
            res.json({ success: true });
          });
         }
  } 
  catch (err) {
    console.log(err);
    res.json({message : true });
  }
}

const category = async (req, res) => {
    try {
    const band = await BandModel.find({status : true});
    if(!category){
        res.json({success : true})
      }else{
        res.json({message : band})
      }
    } catch (error) {
        console.log(error);
    }
}

const review = async (req, res) => {
  try {
  
  const {email} = req.params
  // console.log(typeof(email))
   const details = await DetailModel.findOne({email})
  const bandId = details?._id
  const Id = new mongoose.Types.ObjectId(bandId)
  const review = await ReviewModel.find({bandId:Id});
  // console.log(review)
  if(!review){
      res.json({success : true})
    }else{
      res.json({message : review})
    }
  } catch (error) {
      console.log(error);
  }
}

const booking = async (req, res) => {
  try {
  const {email} = req.params
   const details = await DetailModel.findOne({email})
  const bandId = details?._id
  const Id = new mongoose.Types.ObjectId(bandId)
  const booking = await BookingModel.find({bandId:Id});
  // console.log(booking);
  if(!booking){
      res.json({success : true})
    }else{
      res.json({message : booking})
    }
  } catch (error) {
      console.log(error);
  }
}

const dashboards = async (req, res) => {
  try {
  const {email} = req.params
   const details = await DetailModel.findOne({email})
  const bandId = details?._id
  const Id = new mongoose.Types.ObjectId(bandId)
  const booking = await BookingModel.find({bandId:Id});
  const review = await ReviewModel.find({bandId:Id});
  const cancel = await BookingModel.find({bandId:Id,status:false});
  const revenue = await BookingModel.find({bandId:Id,paymentstaus:true});
  // console.log(booking);
  if(!booking){
      res.json({success : true})
    }else{
      const data = { booking, review,cancel ,revenue};
      res.json(data);
    }
  } catch (error) {
      console.log(error);
  }
}
module.exports = {
    bandDetail,
    category,
    review,
    booking,
    dashboards
  };