const { default: mongoose } = require("mongoose");
const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");
const ReviewModel = require("../../Models/User/ReviewModel");
const BookingModel = require("../../Models/User/BookingModel");

const bandDetail = async (req, res) => {
  try {
    // console.log(req.body);
    const Matchemail = req.params.email;
    const pic = req.file.path;
    console.log(pic);
    await DetailModel.updateMany(
      { email: Matchemail },
      { $set: { file: pic } }
    );
    const {
      email,
      name,
      category,
      mobile,
      website,
      service,
      description,
      location,
    } = req.body;
    const detailExist = await DetailModel.findOne({ email: email });
    if (detailExist) {
      res.json({ message: "User already been exit" });
    } else {
      const bandData = new DetailModel({
        email: email,
        name: name,
        category: category,
        mobile: mobile,
        website: website,
        service: service,
        description: description,
        location: location,
        file: pic,
      });
      bandData.save().then((result) => {
        res.json({ success: true });
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: true });
  }
};

const category = async (req, res) => {
  try {
    const band = await BandModel.find({ status: true });
    if (!category) {
      res.json({ success: true });
    } else {
      res.json({ message: band });
    }
  } catch (error) {
    console.log(error);
  }
};

const review = async (req, res) => {
  try {
    const { email } = req.params;
    const details = await DetailModel.findOne({ email });
    const bandId = details?._id;
    const Id = new mongoose.Types.ObjectId(bandId);
    const review = await ReviewModel.find({ bandId: Id });
    // console.log(review)
    if (!review) {
      res.json({ success: true });
    } else {
      res.json({ message: review });
    }
  } catch (error) {
    console.log(error);
  }
};

const booking = async (req, res) => {
  try {
    const {
      userEmail,
      searchQuery,
      sortBy,
      sortOrder,
      currentPage,
      itemsPerPage,
    } = req.query;

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
        { band: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const totalCount = await BookingModel.countDocuments(searchCriteria);
    const bookings = await BookingModel.find(searchCriteria)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean();

    if (!bookings || bookings.length === 0) {
      return res.json({ message: "No bookings found", count: 0 });
    } else {
      res.json({ message: bookings, count: totalCount });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const dashboards = async (req, res) => {
  try {
    const { email } = req.params;
    const details = await DetailModel.findOne({ email });
    const bandId = details?._id;
    const Id = new mongoose.Types.ObjectId(bandId);
    const booking = await BookingModel.find({ bandId: Id });
    const review = await ReviewModel.find({ bandId: Id });
    const cancel = await BookingModel.find({ bandId: Id, status: false });
    const revenue = await BookingModel.find({ bandId: Id, paymentstaus: true });
    // console.log(booking);
    if (!booking) {
      res.json({ success: true });
    } else {
      const data = { booking, review, cancel, revenue };
      res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

// const fetchMovies = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const start = (page - 1) * limit;
//     const end = page * limit;
//     const search = req.query.search;
//     const year = req.query.year;
//     const field = req.query.field;
//     const order = JSON.parse(req.query.order);
//     const sortObj = {};
//     sortObj[field] = order ? 1 : -1;
//     const genreId = req.query.genre;
//     const genres = await genreModel.find();
//     const count = await movieModel
//       .find({
//         $and: [
//           { title: { $regex: search, $options: "i" } },
//           { releaseDate: { $regex: year, $options: "i" } },
//           ...(genreId ? [{ genres: { $elemMatch: { $eq: genreId } } }] : []),
//         ],
//       })
//       .countDocuments()
//       .exec();
//     const movies = await movieModel
//       .find({
//         $and: [
//           { title: { $regex: search, $options: "i" } },
//           { releaseDate: { $regex: year, $options: "i" } },
//           ...(genreId ? [{ genres: { $elemMatch: { $eq: genreId } } }] : []),
//         ],
//       })
//       .populate("genres")
//       .sort(sortObj)
//       .skip(start)
//       .limit(limit)
//       .exec();
//     const pagination = {};
//     pagination.current = { page, limit };
//     if (start > 0) {
//       pagination.previous = page - 1;
//     }
//     if (end < count) {
//       pagination.next = page + 1;
//     }
//     res.json({ movies, pagination, genres });
//   } catch (err) {
//     console.error(err);
//     res.json(err);
//   }
// };

module.exports = {
  bandDetail,
  category,
  review,
  booking,
  dashboards,
};
