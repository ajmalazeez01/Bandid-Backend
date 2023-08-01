const UserModel = require("../../Models/User/UserModel");

const user = async (req, res) => {
    try {
    const user = await UserModel.find();
    console.log(user);
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
    const { id } = req.params;
    const find = await UserModel.findById(id);
    console.log(find);
    if (find.status === true) {
      await UserModel.findByIdAndUpdate(id, { $set: { status: false } });
      res.json({ message: true });
    } else {
      await UserModel.findByIdAndUpdate(id, { $set: { status: true } });
      res.json({ message: true});
    }
  } catch (error) {
      console.log(error);
    }
  };

  

module.exports = {
    user,
    blockUser,
  };
  