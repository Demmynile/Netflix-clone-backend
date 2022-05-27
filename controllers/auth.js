//import models
const User = require("../models/User")
const cryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")




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
          password : cryptoJs.AES.encrypt(req.body.password , process.env.SECRET_KEY).toString(),
         
      })

      //save to the db
      const user = await newUser.save()

      if(user) return res.status(200).json({'Success' : user})

      else return res.status(400).json({'Error' : 'user is not successfully registered'})


    }
    catch (error) {
    console.log(error)
      res.status(500).json({'Error' : 'There is something wrong with the register page'})
    }
}


//LOGIN CONTROLLER

exports.loginUser = async(req,res) => {
   try {

    
       // finding the user in the db
      const user = await User.findOne({email:req.body.email})

      //validate if user exists
      if(!user) return res.status(401).json({'Error' : 'Wrong password or username!'})

      //decrypt the data information
      const bytes = cryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);

      //convert to the mainone
      const originalPassword = bytes.toString(cryptoJs.enc.Utf8);

      //checks on password
      originalPassword !== req.body.password && res.status(401).json({'Error' : 'Wrong password or username!'})

      
      //jwt
      const accessToken = jwt.sign({id : user._id , isAdmin : user.isAdmin} , process.env.SECRET_KEY , {expiresIn : '5d'})

      //destructing the password out
      const {password , ...info} = user._doc;



      //if all checks are done

      return res.status(201).json({ ...info , accessToken})




   }
   catch(error){
     console.log(error)
   }
}

