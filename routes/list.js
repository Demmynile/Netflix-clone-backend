//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers and middleware  declarations
const { createList, deleteList, getList} = require("../controllers/list");
const verify = require("../verifyToken");



//endpoint routes
router.post("/" , verify , createList)
router.delete("/:id" , verify , deleteList)
router.get("/" , verify,  getList)





module.exports = router;