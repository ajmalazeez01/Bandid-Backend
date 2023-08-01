const express = require("express");
const band_router = express();
const { getLocation } = require("../Controllers/Band/location.controllers");
const { signup, verifyOtp, login } = require("../Controllers/Band/Band.controllers");
const { bandDetail, category, review, booking, dashboards } = require("../Controllers/Band/detail.controllers");
const { authorization } = require("../Middleware/authHandlers");
const upload = require("../utilities/multer");

//signup
band_router.get('/all-location',getLocation)
band_router.post('/signup',signup)

///otp
band_router.post('/otp',verifyOtp)

//login
band_router.post('/login',login)

//band detail
band_router.post('/band-detail/:email',upload.single('photo'),bandDetail)
band_router.get('/category',authorization,category)

//band review
band_router.get('/band-Review/:email',authorization,review)

//booking details
band_router.get('/band-booking/:email',authorization,booking)

//dashbords
band_router.get('/dashbord-details/:email',authorization,dashboards)


module.exports = band_router;
