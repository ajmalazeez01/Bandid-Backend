const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../Models/User/UserModel");
const userValidationSchema = require("../../Validation/userValidation");
const sendMail = require("../../Validation/Helpers/sendMail");

const signup = async (req, res) => {
  try {
    const formData = req.body;
    const validatedData = await userValidationSchema.validate(formData);
    const { email } = validatedData;
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
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
    const { name, mobile, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const signupData = new UserModel({
      name: name,
      mobile: mobile,
      email: email,
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
    const userExist = await UserModel.findOne({ email , status: true });
    if (userExist) {
      const matchPassword = await bcrypt.compare(password, userExist.password);
      if (matchPassword) {
        const data = { id: userExist._id, type: "user" };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        res.json({
          success: true,
          token: token,
          email: userExist.email,
          name: userExist.name,
        });
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
