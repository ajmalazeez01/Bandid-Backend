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

app.use(cors({
  origin: [`http://www.bandid.site`],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
}));

app.use('/api/admin', admin);
app.use('/api/band', band);
app.use('/api/user', user);


app.listen(`${PORT}`, () => {
  console.log("Server connected");
});
