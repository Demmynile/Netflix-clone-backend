const List = require("../models/List")



//CREATE A NEW List

exports.createList = async(req,res) => {
    if(req.user.isAdmin){
        const newList = new List(req.body);
        try {
           const savedList = await newList.save()
           res.status(201).json(savedList)
        }
        catch(err){
          res.status(403).json(err)
        }
        
    }
    else {
      res.status(403).json("You are not allowed!")
    }
}


//DELETE




//GET


