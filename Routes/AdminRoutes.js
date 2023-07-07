const express = require("express");
const admin_router = express();
const { AdminLogin, jwtChecker } = require("../Controllers/Admin/AdminLogin");
const { getLocationAndBand } = require("../Controllers/Admin/getLocationAndBand");
const { addLocation,findLocation, editLocation, blocklocation } = require("../Controllers/Admin/location.controllers");
const { addBand, findBand, editBand, blockBand } = require("../Controllers/Admin/band.controllers");
const { authorization } = require("../Middleware/authHandlers");


admin_router.post('/login',AdminLogin)

admin_router.get('/admin/jwt',jwtChecker)

admin_router.post('/location',authorization,addLocation)

admin_router.post('/band',authorization,addBand)

admin_router.get('/location-and-bands',authorization,getLocationAndBand)

admin_router.post('/find-band',authorization,findBand)

admin_router.post('/edit-band',authorization,editBand)

admin_router.post('/find-location',authorization,findLocation)

admin_router.post('/edit-location',authorization,editLocation)

admin_router.patch('/block-band',authorization,blockBand)

admin_router.patch('/block-location',authorization,blocklocation)



module.exports = admin_router;