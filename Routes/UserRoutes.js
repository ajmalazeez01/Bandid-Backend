const express = require("express");
const user_router = express();
const { category, user, bandDetail, categoryList, Search } = require("../Controllers/User/Home.controllers");
const { signup, verifyOtp, login } = require("../Controllers/User/User.controllers");
const { authorization } = require("../Middleware/authHandlers");
const {checkLocation, detailList, rateList, rateListFetch} = require('../Controllers/User/list.controllers');
const upload = require("../utilities/multer");
const { profileDetail, detailFetch, profiledetailsFetch } = require("../Controllers/User/profile.controllers");
const { slotBooking, bookingFetch, bookingdetailsFetch, cancel } = require("../Controllers/User/Booking.controllers");
const { razorpayCall, verify } = require("../Controllers/User/payment.controllers");
const { getConversation, message, getMessage, getvendorMessage } = require("../Controllers/User/Messenger.Controllers");



//signup
user_router.post('/signup',signup)

//otp
user_router.post('/otp',verifyOtp)

//login
user_router.post('/login',login)

//home
user_router.post('/search',Search)
user_router.get('/category',category)
user_router.get('/band-detail',bandDetail)

//profile
user_router.post('/profile/:email',upload.single('photo'),profileDetail)
user_router.get('/profile-detailfetch',authorization,profiledetailsFetch)
user_router.patch('/cancel/:id',cancel)

//list
user_router.get('/category-list/:name',authorization,categoryList)
user_router.get('/check-location',authorization,checkLocation)

//band details
user_router.get('/detail-list/:id',authorization,detailList)
user_router.get('/detail-fetch/:email',authorization,detailFetch)

//review
user_router.post('/rate-list',rateList)
user_router.get('/review-fetch/:id',authorization,rateListFetch)

//booking
user_router.post('/booking-detail',slotBooking)
user_router.get('/booking-detailfetch/:email',authorization,bookingdetailsFetch)

//payment
user_router.post('/online-payment/:id',razorpayCall)
user_router.post('/verify-payment/:id',verify)

//messenger
user_router.get('/conversation/:id',authorization,getConversation)
user_router.post('/message/:id',message)
user_router.get('/message/:email',authorization,getMessage)
user_router.get('/vendormessage',authorization,getvendorMessage)


module.exports = user_router;