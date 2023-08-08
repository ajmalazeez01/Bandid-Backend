const express = require("express");
const band_router = express();
const { getLocation } = require("../Controllers/Band/location.controllers");
const { signup, verifyOtp, login } = require("../Controllers/Band/Band.controllers");
const { bandDetail, category, review, booking, dashboards, search, sort } = require("../Controllers/Band/detail.controllers");
const { authorization } = require("../Middleware/authHandlers");
const upload = require("../utilities/multer");
const { getConversation, message, getMessage, getuserMessage } = require("../Controllers/Band/Message.controllers");

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
band_router.get('/band-booking',authorization,booking)

//dashbords
band_router.get('/dashbord-details/:email',authorization,dashboards)

//messenger
band_router.get('/conversation',authorization,getConversation)
band_router.post('/message',message)
band_router.get('/message/:email',authorization,getMessage)
band_router.get('/usermessage',authorization,getuserMessage)



module.exports = band_router;
