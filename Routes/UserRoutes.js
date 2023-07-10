const express = require("express");
const { category, user } = require("../Controllers/User/Home.controllers");
const { signup, verifyOtp, login } = require("../Controllers/User/User.controllers");
const { authorization } = require("../Middleware/authHandlers");
const user_router = express();



user_router.get('/category',category)

user_router.post('/signup',signup)

user_router.post('/otp',verifyOtp)

user_router.post('/login',login)





module.exports = user_router;