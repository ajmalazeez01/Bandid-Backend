const UserModel = require("../../Models/User/UserModel");

const user = async (req, res) => {
  try {
    const { searchQuery, sortBy, sortOrder, currentPage, itemsPerPage } =
      req.query;
    const page = parseInt(currentPage);
    const limit = parseInt(itemsPerPage);

    const skip = (page - 1) * limit;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }
    const searchCriteria = {
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const totalCount = await UserModel.countDocuments(searchCriteria);
    const users = await UserModel.find(searchCriteria)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    if (!users || users.length === 0) {
      return res.json({ message: "No bookings found", count: 0 });
    } else {
      res.json({ message: users, count: totalCount });
    }
  } catch (error) {
    console.log(error);
  }
};

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
      res.json({ message: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  user,
  blockUser,
};
