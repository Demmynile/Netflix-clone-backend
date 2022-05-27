//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers and middleware  declarations
const { updateUser } = require("../controllers/users");
const verify = require("../verifyToken");



//endpoint routes
router.put("/:id" , verify , updateUser)

module.exports = router;