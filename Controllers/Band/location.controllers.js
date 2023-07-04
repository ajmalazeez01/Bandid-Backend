const LocationModel = require("../../Models/Admin/LocationModel");

const getLocation = async (req, res) => {
  try {
    const location = await LocationModel.find({ status: true });
    if (!location) {
      res.json({ success: true });
    } else {
      res.json({ location: location });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLocation,
};
