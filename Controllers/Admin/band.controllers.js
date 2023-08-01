const mongoose = require("mongoose");
const BandModel = require("../../Models/Admin/BandModel");
const SignupModel = require("../../Models/Band/SignupModel");
const UserModel = require("../../Models/User/UserModel");
const DetailModel = require("../../Models/Band/DetailModel");

const addBand = async (req, res) => {
  try {
    if (req.body.name != "") {
      const { name } = req.body;
      const band = await BandModel.findOne({ name: name.toLowerCase() });
      if (!band) {
        const newBand = new BandModel({
          name: name,
        });
        newBand.save().then((result) => {
          res.json({ success: true });
        });
      } else {
        res.json({ message: true });
      }
    } else {
      res.status(401).json({ message: true });
    }
  } catch (error) {
    res.status(401).json({ message: true });
  }
};

const findBand = async (req, res) => {
  try {
    const { id } = req.body;
    let objectId = new mongoose.Types.ObjectId(id);
    const band = await BandModel.findOne({ _id: objectId });
    if (band) {
      res.json({ band, success: true });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const editBand = async (req, res) => {
  try {
    const { id, name } = req.body;
    const band = await BandModel.updateOne(
      { _id: id },
      { $set: { name: name } }
    );
    console.log(band);
    if (band) {
      res.json({ band, success: true });
    } else {
      res.json({ message: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const blockBand = async (req, res) => {
  try {
    const { id } = req.query;
    const find = await BandModel.findById(id);
    console.log(find);
    if (find.status === true) {
      await BandModel.findByIdAndUpdate(id, { $set: { status: false } });
      res.json({ success: true });
    } else {
      await BandModel.findByIdAndUpdate(id, { $set: { status: true } });
      res.json({ success: true, message: "Band not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const bandManage = async (req, res) => {
  try {
  const band = await SignupModel.find();
  if(!band){
      res.json({success : true})
    }else{
      res.json({message : band})
    }
  } catch (error) {
      console.log(error);
  }
}

const blockband = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await SignupModel.findById(id);
    console.log(find);
    if (find.status === true) {
      await SignupModel.findByIdAndUpdate(id, { $set: { status: false } });
      res.json({ message: true });
    } else {
      await SignupModel.findByIdAndUpdate(id, { $set: { status: true } });
      res.json({ message: true});
    }
  } catch (error) {
      console.log(error);
    }
  };

  const bandVerify = async (req, res) => {
    try {
    const band = await SignupModel.find();
    if(!band){
        res.json({success : true})
      }else{
        res.json({message : band})
      }
    } catch (error) {
        console.log(error);
    }
  }

  const blockverify = async (req, res) => {
    try {
      const { id } = req.params;
      const find = await SignupModel.findById(id);
      // console.log(find);
      if (find.verify === true) {
        await SignupModel.findByIdAndUpdate(id, { $set: { verify: false } });
        res.json({ message: true });
      } else {
        await SignupModel.findByIdAndUpdate(id, { $set: { verify: true } });
        res.json({ message: true});
      }
    } catch (error) {
        console.log(error);
      }
    };

    const dashboards = async (req, res) => {
      try {
      const users = await UserModel.find();
      const bands = await DetailModel.find();
      const pending = await SignupModel.find({verify:false});
      // const revenue = await BookingModel.find({bandId:Id,paymentstaus:true});
      // console.log(booking);
      if(!users){
          res.json({success : true})
        }else{
          const data = { users,bands,pending};
          res.json(data);
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
  bandManage,
  blockband,
  bandVerify,
  blockverify,
  dashboards
};
