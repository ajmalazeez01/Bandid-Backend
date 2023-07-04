const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SignupModel = require("../../Models/Band/SignupModel");
const sendMail = require("../../Validation/Helpers/sendMail");
const bandValidationSchema = require("../../Validation/bandValidation");

const signup = async (req, res) => {
  try {
    const formData = req.body;
    const validatedData = await bandValidationSchema.validate(formData);
    const { email } = validatedData;
    const bandExist = await SignupModel.findOne({ email: email });
    if (bandExist) {
      res.status(401).json({ message: "User already exit" });
    } else {
      const otp = await sendMail(email, "otp");
      console.log(otp);
      res.json({ success: true, otp: otp });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

const verifyOtp = async (req, res) => {
  // console.log(req.body)
  const orgOTP = req.body.OTP;
  const enteredOTP = parseInt(req.body.EnteredOtp);
  if (orgOTP === enteredOTP) {
    console.log("verified");
    const { name, mobile, email, location, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const signupData = new SignupModel({
      name: name,
      mobile: mobile,
      email: email,
      location: location,
      password: hashedPassword,
    });
    signupData.save().then((result) => {
      res.json({ ok: true });
    });
  } else {
    res.status(401).json({ message: "verification failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bandExist = await SignupModel.findOne({ email });
    if (bandExist) {
      const matchPassword = await bcrypt.compare(password, bandExist.password);
      if (matchPassword) {
        const { email } = req.body;
        const data = { email: email };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        res.json({ success: true, token: token });
      } else {
        res.json({ message: "Invalid Credentials" });
      }
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  verifyOtp,
  login,
};
