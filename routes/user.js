//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers declarations
const { registerUser } = require("../controllers/auth");


//endpoint routes
router.post("/register" , registerUser)

module.exports = router;