const express = require("express");
const band_router = express();
const { getLocation } = require("../Controllers/Band/location.controllers");
const { signup, verifyOtp, login } = require("../Controllers/Band/Band.controllers");
const { bandDetail, category } = require("../Controllers/Band/detail.controllers");
const { authorization } = require("../Middleware/authHandlers");


band_router.get('/all-location',getLocation)

band_router.post('/signup',signup)

band_router.post('/otp',verifyOtp)

band_router.post('/login',login)

band_router.post('/band-detail',authorization,bandDetail)

band_router.get('/category',authorization,category)


module.exports = band_router;    
