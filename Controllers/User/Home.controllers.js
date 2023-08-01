const { default: mongoose } = require("mongoose");
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

const categoryList = async (req, res) => {
  try {
    const category = req.params.name;
    const bands = await DetailModel.find({ category: category });
    if (bands.length === 0) {
      console.log('helloooo');
      res.status(404).json({ success: false });
    } else {
      res.json({ message: bands });
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
  categoryList,
};
