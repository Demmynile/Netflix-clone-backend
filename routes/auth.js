//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers declarations
const { registerUser, loginUser } = require("../controllers/auth");




//endpoint routes
router.post("/register" , registerUser)
router.post("/login" , loginUser)


module.exports = router;