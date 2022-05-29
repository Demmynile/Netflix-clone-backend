//import libraries
const express = require("express");

//intialize routes
const router = express.Router()

//controllers and middleware  declarations
const { createMovie , updateMovie, deleteMovie, getMovieById, getRandomMovie, getAllUser} = require("../controllers/movie");
const verify = require("../verifyToken");



//endpoint routes
router.post("/" , verify , createMovie)
router.put("/:id" , verify , updateMovie)
router.delete("/:id" , verify , deleteMovie)
router.get("/find/:id" , getMovieById)
router.get("/random" , verify ,  getRandomMovie)
router.get("/" , verify ,  getAllUser)


module.exports = router;