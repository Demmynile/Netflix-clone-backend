const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")


//UPDATE

exports.updateUser = async(req,res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password =  CryptoJS.AES.encrypt(req.body.password , process.env.SECRET_KEY).toString()
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id , {$set : req.body} , {new:true})
          res.status(200).json(updatedUser)
        }
        catch(err){
          res.status(500).json(err)
        }
        
    }
    else {
      res.status(403).json("You can update only your account!")
    }
}

//DELETE USER 

exports.deleteUser = async(req,res) => {
  if(req.user.id === req.params.id || req.user.isAdmin){
     
      try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("users has been deleted")
      }
      catch(err){
        res.status(500).json(err)
      }
      
  }
  else {
    res.status(403).json("You can delete only your account!")
  }
}
//GET USER BY ID
exports.getUserById = async(req,res) => {

 
   
      try {
        const user = await User.findById(req.params.id)
        const{password , ...info} = user._doc
        res.status(200).json(info)
      }
      catch(err){
        res.status(500).json(err)
      }
      
  
}

//GET ALL USER 
exports.getUser = async(req,res) => {
  const query = req.query.new;
  if(req.user.isAdmin){
   
      try {
        const users = query ? await  User.find().limit(10) : await User.find()
        const {password , ...info} = users
        res.status(200).json(info)
      }
      catch(err){
        res.status(500).json(err)
      }
      
  }
  else {
    res.status(403).json("You are not allowed to see all users")
  }
}

//GET USER STATS
exports.getUserStats = async(req, res) => {
  // get todays date
  const today = new Date()
  const latYear = today.setFullYear(today.setFullYear() - 1)

  //months array
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",

  ];

  try {
    const data = await User.aggregate([
      {
      $project : {
        month : {$month: "$createdAt"},
      }
      },
      {
        $group : {
          _id : "$month",
          total : {$sum:1}
        },
      },
    ]);
   res.status(200).json(data)
  }
  catch(error){
    res.status(500).json(error)
  }
}