const { default: mongoose } = require("mongoose");
const BandModel = require("../../Models/Admin/BandModel");
const DetailModel = require("../../Models/Band/DetailModel");
const { search } = require("../../Routes/UserRoutes");

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

const Search = async (req, res) => {
  try {
    const { search } = req.body;
    if (!search || search.trim() === '') {
      return res.status(400).json({ error: 'Search term is required.' });
    }
    const band = await DetailModel.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ],
    });
    console.log(band);
    res.status(200).json({ message: band });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while processing the search.' });
  }
};





const fetchMovies = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const start = (page - 1) * limit;
      const end = page * limit;
      const search = req.query.search;
      const year = req.query.year;
      const field = req.query.field;
      const order = JSON.parse(req.query.order);
      const sortObj = {};
      sortObj[field] = (order ? 1 : -1);
      const genreId = req.query.genre;
      const genres = await genreModel.find();
      const count = await movieModel
          .find({
              $and: [
                  { title: { $regex: search, $options: 'i' } },
                  { releaseDate: { $regex: year, $options: 'i' } },
                  ...(genreId
                      ? [{ genres: { $elemMatch: { $eq: genreId } } }]
                      : [])
              ]
          })
          .countDocuments().exec();
      const movies = await movieModel
          .find({
              $and: [
                  { title: { $regex: search, $options: 'i' } },
                  { releaseDate: { $regex: year, $options: 'i' } },
                  ...(genreId
                      ? [{ genres: { $elemMatch: { $eq: genreId } } }]
                      : [])
              ]
          })
          .populate('genres')
          .sort(sortObj)
          .skip(start)
          .limit(limit)
          .exec();
      const pagination = {};
      pagination.current = {page,limit};
      if (start > 0) {
          pagination.previous = page - 1;
      }
      if (end < count) {
          pagination.next = page + 1;
      }
      res.json({ movies, pagination, genres });
  } catch (err) {
      console.error(err);
      res.json(err);
  }
};



const categoryList = async (req, res) => {
  try {
    const category = req.params.name;
    const bands = await DetailModel.find({ category: category });
    if (bands.length === 0) {
      console.log("helloooo");
      res.status(404).json({ success: false });
    } else {
      res.json({ message: bands });
    }
  } catch (error) {
    console.log(error);
  }
};

const bandDetail = async (req, res) => {
  try {
    const bandDetail = await DetailModel.find();
    if (!bandDetail) {
      res.json({ success: true });
    } else {
      res.json({ message: bandDetail });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  category,
  bandDetail,
  categoryList,
  Search,
};
