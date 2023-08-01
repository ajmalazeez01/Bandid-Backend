const express = require("express");
const admin_router = express();
const { AdminLogin, jwtChecker } = require("../Controllers/Admin/AdminLogin");
const { getLocationAndBand } = require("../Controllers/Admin/getLocationAndBand");
const { addLocation,findLocation, editLocation, blocklocation } = require("../Controllers/Admin/location.controllers");
const { addBand, findBand, editBand, blockBand, bandManage, blockband, bandVerify, blockverify, dashboards } = require("../Controllers/Admin/band.controllers");
const { authorization } = require("../Middleware/authHandlers");
const { user, blockUser } = require("../Controllers/Admin/user.controllers");


//AdminLogin
admin_router.post('/login',AdminLogin)

// jwt cheker
admin_router.get('/admin/jwt',jwtChecker)

//bands and location
admin_router.post('/location',authorization,addLocation)
admin_router.post('/band',authorization,addBand)
admin_router.get('/location-and-bands',authorization,getLocationAndBand)
admin_router.post('/find-band',findBand)
admin_router.post('/edit-band',editBand)
admin_router.post('/find-location',findLocation)
admin_router.post('/edit-location',editLocation)
admin_router.patch('/block-band',blockBand)
admin_router.patch('/block-location',blocklocation)

//user manage
admin_router.get('/userManage',authorization,user)
admin_router.patch('/block-user/:id',blockUser)

//band manage
admin_router.get('/bandManage',authorization,bandManage)
admin_router.patch('/block-band/:id',blockband)

//band verify
admin_router.get('/band-verify',authorization,bandVerify)
admin_router.patch('/block-verify/:id',blockverify)

//dashbord
admin_router.get('/dashbord-details',dashboards)



module.exports = admin_router;