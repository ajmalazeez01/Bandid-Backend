const AdminModel = require("../../Models/Admin/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SignupModel = require("../../Models/Band/SignupModel");
const UserModel = require("../../Models/User/UserModel");

const AdminLogin = async (req, res) => {
  try {
    const {email} = req.body
    const { password } = req.body;
    const admin = await AdminModel.findOne({ email: email });
    if (admin) {
      const matchPassword = await bcrypt.compare(password, admin.password);
      if (matchPassword) {
        const data = { id: admin._id, type: "admin" };
        const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        res.json({ success: true, token: token });
      } else {
        res.json({ message: "Check your credentials" });
      }
    } else {
      res.json({ message: "Check your credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const jwtChecker = async (req, res) => {
  console.log("jwt");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    if (decoded) {
      const id = decoded._id;
      if (req.query.role == "admin") {
        // console.log('admin');
        const data = await AdminModel.findOne({ _id: id });
        res.json({ data, status: true });
      } else if (req.query.role == "vendor") {
        // console.log('vebdor');
        const data = await SignupModel.findOne({ _id: id });
        res.json({ data, status: true });
      }
       else if (req.query.role == "user") {
        console.log('user token');
        const data = await UserModel.findOne({ _id: id });
        res.json({ data, status: true });
      }
    } else {
      console.log('token error');
      res.json({ error: 'Token is expired' });
    }
  }
};

module.exports = {
  AdminLogin,
  jwtChecker,
};
