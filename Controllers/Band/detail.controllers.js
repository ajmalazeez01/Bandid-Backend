const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");

const bandDetail = async (req, res) => {
   try {
    // console.log(req.body);
    // const id = req.params.id;
    // const pic = req;
    // console.log(pic);
    // console.log(pic);
    // await DetailModel.findByIdAndUpdate(id, { $set: { file: pic } });
    // const {email,name,category,mobile,website,service,description,location,files} = req.body
    // const detailExist = await DetailModel.findOne({ email: email });
    // if (detailExist) {
    //   res.json({ message: "User already been exit" });
    // } else {
    //     const bandData = new DetailModel({
    //         email: email,
    //         name: name,
    //         category : category,
    //         mobile: mobile,
    //         website : website,
    //         service : service,
    //         description : description,
    //         location: location,
    //         file : files,
    //       });
    //       bandData.save().then((result) => {
    //         res.json({ success: true });
    //       });
    //      }
  } 
  catch (err) {
    console.log(err);
    res.status(401).json({message : true });
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


module.exports = {
    bandDetail,
    category,
  };