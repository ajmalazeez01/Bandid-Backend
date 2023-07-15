const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");

const category = async (req, res) => {
  try {
    const band = await BandModel.find({ status: true });
    if (!category) {
      res.json({ success: true });
    } else {
      res.json({ message: band });
    }
  } catch (error) {
    console.log(error);
  }
};


const bandDetail = async (req, res) => {
  try {
    const bandDetail = await DetailModel.find();
    if (!bandDetail) {
      res.json({ success: true });
    } else {
      res.json({ message: bandDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  category,
  bandDetail,
};
