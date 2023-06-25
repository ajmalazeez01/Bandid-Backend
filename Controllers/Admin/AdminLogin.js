const AdminModel = require("../../Models/Admin/AdminModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const AdminLogin = async (req, res) => {
  try {
    const {password}=req.body
    const admin = await AdminModel.findOne({ email: req.body.email });
    if (admin) {
      const matchPassword=await bcrypt.compare(password,admin.password)
      if (matchPassword) {
          const { email } = req.body;
          const data = { email: email };
          const token = jwt.sign(data, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        res.json({ success: true ,token : token });
      } else {
        res.json({ message: 'Email or password is incorrect' }); 
      }
    } else {
      res.json({ message: 'Check your credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






const jwtChecker = async (req, res) => {
  console.log('jwt')
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    if(decoded){
        const id = decoded._id
        const data=await AdminModel.findOne({_id : id})
        res.json({data,status:true})
       
      }else{
       res.json({status:false})
      }

  }
}

module.exports = {
  AdminLogin,
  jwtChecker,
};



      