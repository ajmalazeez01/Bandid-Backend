const express = require("express");
const admin_router = express();
const { AdminLogin } = require("../Controllers/Admin/AdminLogin");
const { getLocationAndBand } = require("../Controllers/Admin/getLocationAndBand");
const { addLocation, findLocation, editLocation, blocklocation } = require("../Controllers/Admin/location.controllers");
const { addBand, findBand, editBand, blockBand } = require("../Controllers/Admin/band.controllers");


admin_router.post('/login',AdminLogin)

admin_router.post('/location',addLocation)

admin_router.post('/band',addBand)

admin_router.get('/location-and-bands',getLocationAndBand)

admin_router.post('/find-band',findBand)

admin_router.post('/edit-band',editBand)

admin_router.post('/find-location',findLocation)

admin_router.post('/edit-location',editLocation)

admin_router.patch('/block-band',blockBand)

// admin_router.patch('/block-location',blocklocation)



module.exports = admin_router;    