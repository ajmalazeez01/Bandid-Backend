const express = require('express');
const cors = require('cors')
const mongoose = require('./Config/db')
require('dotenv').config()
const admin = require('./Routes/AdminRoutes')



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


mongoose()

app.use(cors({
    origin:[`http://localhost:3000`],
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials : true,
}))



app.use('/admin',admin)





app.listen(8000, () => {
  console.log("Server connected");
});
