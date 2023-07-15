const UserModel = require("../../Models/User/UserModel");

const user = async (req, res) => {
    try {
    const user = await UserModel.find({status : true});
    // console.log(user);
    if(!user){
        res.json({success : true})
      }else{
        res.json({message : user})
      }
    } catch (error) {
        console.log(error);
    }
}

const blockUser = async (req, res) => {
  try {
    const { id } = req.query;
    const find = await UserModel.findById(id);
    console.log(find);
    if (find.status === true) {
      await UserModel.findByIdAndUpdate(id, { $set: { status: false } });
      res.json({ success: true });
    } else {
      await UserModel.findByIdAndUpdate(id, { $set: { status: true } });
      res.json({ success: true, message: "Band not found" });
    }
  } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    user,
    blockUser,
  };
  