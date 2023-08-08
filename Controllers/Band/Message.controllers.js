const MessageModel = require("../../Models/Messenger/MessageModel");
const vendorMessageModel = require("../../Models/Messenger/vendorMessageModel");
const UserModel = require("../../Models/User/UserModel");

const getConversation = async (req, res) => {
    try {
        const user = await UserModel.find();
        if (!user) {
          res.json({ success: true });
        } else {
          res.json({ message: user });
        }
      }catch (error) {
    console.log(error);
   }
}

const message = async (req, res) => {
  try {
   const { user, message } = req.body
   const existingMessage = await vendorMessageModel.findOne({ email: user });
   if (!existingMessage) {
     const data = new vendorMessageModel({
       email: user,
       messages: [message] 
     });
     await data.save();
     console.log(data);
   } else {
     existingMessage.messages.push(message); 
     await existingMessage.save();
     console.log(existingMessage);
   }
  } catch (error) {
   console.log(error);
  }
}

const getMessage = async (req, res) => {
  try {
      const {email} = req.params
      console.log(email);
      const messages = await vendorMessageModel.findOne({email:email});
      console.log(messages);
      if (!messages) {
        res.json({ success: true });
      } else {
        res.json({ message: messages });
      }
    }catch (error) {
  console.log(error);
 }
}

const getuserMessage = async (req, res) => {
  try {
      // const {email} = req.params
      const messages = await MessageModel.findOne();
      console.log(messages);
      if (!messages) {
        res.json({ success: true });
      } else {
        res.json({ message: messages });
      }
    }catch (error) {
  console.log(error);
 }
}

module.exports = {
    getConversation,
    message,
    getMessage,
    getuserMessage
}