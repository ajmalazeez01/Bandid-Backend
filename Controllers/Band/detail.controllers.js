const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");

const bandDetail = async (req, res) => {
   try {
    const {email,name,mobile,website,service,description,location,file} = req.body
    console.log(req.body);
    const detailExist = await DetailModel.findOne({ email: email });
    if (detailExist) {
      res.json({ message: "User already been exit" });
    } else {
        const bandData = new DetailModel({
            email: email,
            name: name,
            mobile: mobile,
            website : website,
            service : service,
            description : description,
            location: location,
            file : file,
          });
          bandData.save().then((result) => {
            res.json({ success: true });
          });
         }
  } catch (err) {
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