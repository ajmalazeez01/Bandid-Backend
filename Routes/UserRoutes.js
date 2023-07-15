const express = require("express");
const user_router = express();
const { category, user, bandDetail } = require("../Controllers/User/Home.controllers");
const { signup, verifyOtp, login } = require("../Controllers/User/User.controllers");
const { authorization } = require("../Middleware/authHandlers");




user_router.get('/category',category)

user_router.post('/signup',signup)

user_router.post('/otp',verifyOtp)

user_router.post('/login',login)

user_router.get('/band-detail',authorization,bandDetail)




module.exports = user_router;