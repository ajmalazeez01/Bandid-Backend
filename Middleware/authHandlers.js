const jwt = require('jsonwebtoken');
const SignupModel = require('../Models/Band/SignupModel');
const AdminModel = require('../Models/Admin/AdminModel');
const UserModel = require('../Models/User/UserModel');

const authorization = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('ifffff');
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (typeof decoded !== 'string') {
        console.log(req.query);
        let collection;
        switch (req.query.role) {
          case 'user':
            collection = UserModel;
            break;
          case 'admin':
            collection = AdminModel;
            break;
          case 'vendor':
            collection = SignupModel;
            break;
          default:
            throw new Error('Invalid role in query parameters');
        }
        console.log(collection);
        const user = await collection.findOne({ _id: decoded.id });
        if (!user) {
          console.log('Invalid token');
          return res.status(401).json({ error: 'Invalid token' });
        } else {
          req.token = decoded.id;
          next();
        }
      } else {
        console.log('Invalid token format');
        return res.status(401).json({ error: 'Invalid token format' });
      }
    } catch (error) {
      console.log('akh');
      return res.status(401).json({ error: 'Token verification failed' });
    }
  } else {
    console.log('No authorization header or invalid format');
    return res.status(401).json({ error: 'No authorization header or invalid format' });
  }
};

module.exports = {
  authorization
};
