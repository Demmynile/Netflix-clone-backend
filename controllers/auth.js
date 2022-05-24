//import models
const User = require("../models/User")




//REGISTER CONTROLLER

exports.registerUser = async(req ,res) => {
    try {
      // send this data to the body
      const {username , email , password , profile_picture } = req.body

      // validate username
      if(username < 5) return res.status(400).json({'Error' : 'username is less than 5'})

      //validate password
      if(password < 8) return res.status(400).json({'Error' : 'password is less than 8'})

      //validate profile_picture
      if (profile_picture === '') return  res.status(400).json({'Error' : 'profile picture is empty'})

      //declare the user
      const newUser = new User({
          username : req.body.username,
          email : req.body.email,
          password : req.body.password,
         
      })

      //save to the db
      const user = await newUser.save()

      if(user) return res.status(200).json({'Success' : user})

      else return res.status(400).json({'Error' : 'user is not successfully registered'})


    }
    catch (error) {
      res.status(500).json({'Error' : 'There is something wrong with the register page'})
    }
}


//LOGIN CONTROLLER

