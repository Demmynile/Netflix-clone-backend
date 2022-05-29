//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers and middleware  declarations
const { updateUser , deleteUser, getUser, getUserById, getUserStats } = require("../controllers/users");
const verify = require("../verifyToken");



//endpoint routes
router.put("/:id" , verify , updateUser)
router.delete("/:id" , verify , deleteUser)
router.get("/find/:id" , getUserById)
router.get("/" , verify ,  getUser)
router.get("/stats" , verify ,  getUserStats)

module.exports = router;