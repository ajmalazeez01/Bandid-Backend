const BandModel = require("../../Models/Admin/BandModel");
const LocationModel = require("../../Models/Admin/LocationModel");
const getLocationAndBand = async (req, res) => {
  try {
    const location = await LocationModel.find();
    const band = await BandModel.find();
    if (!band && !location) {
      res.json({ success: true });
    } else {
      res.json({ band: band, location: location });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLocationAndBand,
};
