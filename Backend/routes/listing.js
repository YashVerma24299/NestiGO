const express = require('express');
const router = express.Router();
const wrapAsync =require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js')
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");
const multer  = require('multer') // for uploading images
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

const listingController = require("../controllers/listings.js");


//Index Route
router.get('/', wrapAsync(listingController.index));

//New Route
router.get('/new', isLoggedIn, listingController.renderNewForm)

//show Route
router.get('/:id',wrapAsync( listingController.showListing));

//Create Route
router.post('/', isLoggedIn, upload.single('listing[image]'), validateListing , wrapAsync(listingController.createListing));

//edit route
router.get('/:id/edit',isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//update route
router.put('/:id',isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing));

//delete route
router.delete('/:id',isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;