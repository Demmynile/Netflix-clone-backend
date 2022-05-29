const Movie = require("../models/Movie")



//CREATE A NEW MOVIE

exports.createMovie = async(req,res) => {
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);
        try {
           const savedMovie = await newMovie.save()
           res.status(201).json(savedMovie)
        }
        catch(err){
          res.status(403).json(err)
        }
        
    }
    else {
      res.status(403).json("You are not allowed!")
    }
}


//UPDATE MOVIE
exports.updateMovie = async(req,res) => {
    if(req.user.isAdmin){
        
        try {
           const updatedMovie = await Movie.findByIdAndUpdate(req.params.id , {$set : req.body} , {new:true})
           
           res.status(201).json(updatedMovie)
        }
        catch(err){
          res.status(403).json(err)
        }
        
    }
    else {
      res.status(403).json("You are not allowed!")
    }
}
//DELETE MOVIE

exports.deleteMovie = async(req,res) => {
  if(req.user.isAdmin){
     
      try {
        await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json("movie has been deleted")
      }
      catch(err){
        res.status(500).json(err)
      }
      
  }
  else {
    res.status(403).json("You can delete only your account!")
  }
}
//GET MOVIE BY ID
exports.getMovieById = async(req,res) => {

 
   
      try {
        const movie = await Movie.findById(req.params.id)
       
        res.status(200).json(movie)
      }
      catch(err){
        res.status(500).json(err)
      }
      
  
}

//GET RANDOM MOVIE
exports.getRandomMovie = async(req,res) => {
   
        const type = req.query.type;
        let movie;
        try {
            if (type === "series") {
                movie = await Movie.aggregate([
                  { $match: { isSeries: true } },
                  { $sample: { size: 1 } },
                ]);
              } else {
                movie = await Movie.aggregate([
                  { $match: { isSeries: false } },
                  { $sample: { size: 1 } },
                ]);
              }

              res.status(200).json(movie);
        }

        catch(err){
          res.status(500).json(err)
        }
        
    
   
  }

  //GET ALL USERS

  //GET ALL USER 
exports.getAllUser = async(req,res) => {
  
    if(req.user.isAdmin){
     
        try {
          const movie = await Movie.find()
         
          res.status(200).json(movie.reverse())
        }
        catch(err){
          res.status(500).json(err)
        }
        
    }
    else {
      res.status(403).json("You are not allowed to see all users")
    }
  }



