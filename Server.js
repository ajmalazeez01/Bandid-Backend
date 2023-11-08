const express = require('express');
const cors = require('cors');
const mongoose = require('./Config/db');
require('dotenv').config();
PORT = process.env.PORT
const admin = require('./Routes/AdminRoutes');
const band = require('./Routes/BandRoutes');
const user = require('./Routes/UserRoutes');
const morgan = require('morgan');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose();



app.use(morgan("dev"))

app.use((req, res, next) => {                      
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Enable credentials

  next();
});

app.use(cors({
  // origin: [`http://localhost:3000`],
  origin: [`https://bandidonline.netlify.app/`],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH","OPTIONS"],
  credentials: true,
}));

app.use('/backend/admin', admin);
app.use('/backend/band', band);
app.use('/backend/user', user);


app.listen(`${PORT}`, () => {
  console.log("Server connected");
});
