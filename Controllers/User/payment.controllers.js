const BookingModel = require("../../Models/User/BookingModel");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpayCall = async (req, res, next) => {
  try {
    const bandId = req.params.id;
    const band = await BookingModel.findById({ _id: bandId });
    const price = band.advprice;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        return res.json({ message: "Something went wrong" });
      }
      res.json({ status: true, order });
    });
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};

const verify = async (req, res, next) => {
  const bandId = req.params.id;
//   console.log(bandId);
//   console.log(req.body);
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const update = await BookingModel.findByIdAndUpdate(bandId, {
        paymentstaus: true,
      });
    //   console.log(update);
      return res.status(200).json({
        message: "Verified successfully",
        status: true,
        bandId,
      });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error!", status: false });
  }
};

module.exports = {
  razorpayCall,
  verify,
};
