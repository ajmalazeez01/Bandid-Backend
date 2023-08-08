const BookingModel = require("../../Models/User/BookingModel");
const UserModel = require("../../Models/User/UserModel");

const profileDetail = async (req, res) => {
  try {
    const { email, name, mobile, gender } = req.body;
    const Matchemail = req.params.email;
    const pic = req.file.path;
    // console.log(pic);
    const updateDetail = await UserModel.updateMany(
      { email: Matchemail },
      {
        $set: {
          file: pic,
          email: email,
          mobile: mobile,
          gender: gender,
          name: name,
        },
      }
    );
    if (!updateDetail) {
      res.json({ message: "not updated" });
    } else {
      res.json({ success: updateDetail });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "plese change the image and update" });
  }
};

const detailFetch = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const userDetail = await UserModel.find({ email: email });
    if (!userDetail) {
      res.json({ success: true });
    } else {
      res.json({ message: userDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

const profiledetailsFetch = async (req, res) => {
  try {
    const { email, sortBy, sortOrder } = req.query;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const bookingDetail = await BookingModel.find({ email: email }).sort(
      sortOptions
    );
    //   console.log(bookingDetail);
    if (!bookingDetail) {
      res.json({ success: true });
    } else {
      res.json({ message: bookingDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  profileDetail,
  detailFetch,
  profiledetailsFetch,
};
