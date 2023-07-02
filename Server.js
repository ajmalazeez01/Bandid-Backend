const express = require('express');
const cors = require('cors');
const mongoose = require('./Config/db');
require('dotenv').config();
const admin = require('./Routes/AdminRoutes');
const band = require('./Routes/BandRoutes');
const morgan = require('morgan')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose();

app.use(morgan("dev"))

app.use(cors({
  origin: [`http://localhost:3000`],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
}));

// const myMiddleware = (req, res, next) => {
//   // Middleware logic goes here
//   // ...

//   next();
// };

// app.use(myMiddleware);

app.use('/admin', admin);
app.use('/band', band);

app.listen(8000, () => {
  console.log("Server connected");
});
