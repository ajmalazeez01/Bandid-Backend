const DetailModel = require("../../Models/Band/DetailModel");
const MessageModel = require("../../Models/Messenger/MessageModel");
const vendorMessageModel = require("../../Models/Messenger/vendorMessageModel");

const getConversation = async (req, res) => {
    try {
        const {id} = req.params
        const vendor = await DetailModel.findOne({_id:id});
        // console.log(vendor);
        if (!vendor) {
          res.json({ success: true });
        } else {
          res.json({ message: vendor });
        }
      }catch (error) {
    console.log(error);
   }
}

const message = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id);
   const { user, message } = req.body
   const existingMessage = await MessageModel.findOne({ email: user });

   if (!existingMessage) {
     const data = new MessageModel({
       bandId : id,
       email: user,
       messages: [message]  // Create a new array with the new message
     });
     await data.save();
     console.log(data);
   } else {
     // Update the existing message array
     existingMessage.messages.push(message);  // Add the new message to the array
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
      const messages = await MessageModel.findOne({email:email});
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

const getvendorMessage = async (req, res) => {
  try {
      // const {email} = req.params
      const messages = await vendorMessageModel.findOne();
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
    getvendorMessage
}
