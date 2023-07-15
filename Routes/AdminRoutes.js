const express = require("express");
const admin_router = express();
const { AdminLogin, jwtChecker } = require("../Controllers/Admin/AdminLogin");
const { getLocationAndBand } = require("../Controllers/Admin/getLocationAndBand");
const { addLocation,findLocation, editLocation, blocklocation } = require("../Controllers/Admin/location.controllers");
const { addBand, findBand, editBand, blockBand } = require("../Controllers/Admin/band.controllers");
const { authorization } = require("../Middleware/authHandlers");
const { user, blockUser } = require("../Controllers/Admin/user.controllers");


admin_router.post('/login',AdminLogin)

admin_router.get('/admin/jwt',jwtChecker)

admin_router.post('/location',authorization,addLocation)

admin_router.post('/band',authorization,addBand)

admin_router.get('/location-and-bands',authorization,getLocationAndBand)

admin_router.post('/find-band',findBand)

admin_router.post('/edit-band',editBand)

admin_router.post('/find-location',findLocation)

admin_router.post('/edit-location',editLocation)

admin_router.patch('/block-band',blockBand)

admin_router.patch('/block-location',blocklocation)

admin_router.get('/userManage',authorization,user)

admin_router.patch('/block-user',blockUser)





module.exports = admin_router;