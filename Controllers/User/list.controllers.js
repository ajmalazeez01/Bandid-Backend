const DetailModel = require("../../Models/Band/DetailModel");
const ReviewModel = require("../../Models/User/ReviewModel");

const checkLocation = async (req, res) => {
  try {
    const { location,band } = req.query;
    const checklocation = await DetailModel.find({ location: location,category:band });
    // console.log(checklocation);
    if (!checklocation) {
      res.status(401).json({ success: "Oops! no band in this location" });
    } else {
      res.json({ message: checklocation });
    }
  } catch (error) {
    console.log('catch');
    console.log(error);
  }
};

const detailList = async (req, res) => {
  try {
    const { id } = req.params;
    const checkDetail = await DetailModel.findOne({ _id: id });
    if (!checkDetail) {
      res.status(401).json({ success: "Oops! no band in this id" });
    } else {
      res.json({ message: checkDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

const rateList = async (req, res) => {
  try {
    const { email,id } = req.query;
    const { rate, message, name } = req.body;
    const today = new Date();
    const find = await ReviewModel.findOne({email:email, bandId: id});
    if (!find) {
      const reviewData = new ReviewModel({
        bandId:id,
        rate: rate,
        name: name,
        email: email,
        message: message,
        date : today
      });
      await reviewData.save();
      console.log(reviewData);
      res.json({ message: true });
    } else {
      await ReviewModel.updateOne({
        bandId:id,
        email: email,
        rate: rate,
        message: message,
        name: name,
        date : today
      });
      res.json({ message: true });
    }
  } catch (error) {
    console.log("catch");
    console.error(error);
  }
};

const rateListFetch = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id);
    const reviewDetail = await ReviewModel.find({bandId:id});
    if (!reviewDetail) {
      res.json({ success: true });
    } else {
      res.json({ message: reviewDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkLocation,
  detailList,
  rateList,
  rateListFetch,
};
