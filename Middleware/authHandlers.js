const jwt = require('jsonwebtoken')
const SignupModel = require('../Models/Band/SignupModel')
const AdminModel = require('../Models/Admin/AdminModel')

const authorization = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") 
     ) {
    // console.log('iff');
    const token = req.headers.authorization.split(" ")[1].trim();;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    if (typeof decoded !== "string") {
        // console.log(req.query);
      let collection
      switch(req.query.role){
        // case('user'):
        // collection=userCollection
        // break;
        case('admin'):
        collection=AdminModel
        break;
        case('vendor'):
        collection=SignupModel
      }
      // console.log(collection);
      const user = await collection.findOne({_id:decoded.id});
      // console.log(user);
      if (!user) {
        console.log('invalid token');
      } else {
        next();
      }
    } else {
      console.log('No authorization');
    }
  } else {
   console.log('Nooo authorization');
  }
};

module.exports = {
    authorization
}


