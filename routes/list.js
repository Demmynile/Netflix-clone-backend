//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers and middleware  declarations
const { createList} = require("../controllers/list");
const verify = require("../verifyToken");



//endpoint routes
router.post("/" , verify , createList)



module.exports = router;