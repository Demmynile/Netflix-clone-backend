//import libraries
const express = require("express")
const cors = require('cors')
const database = require("./config/db")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const movieRoutes = require("./routes/movie")
const listRoutes = require("./routes/list")




//intialize the app 
const app = express()

console.log(database)

// cors activated
app.use(cors())
//accepting the json format
app.use(express.json())

// app.use(express.urlencoded({extended: false}))

//general url for endpoint 
app.use('/api/auth' , authRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/movie' , movieRoutes)
app.use('/api/list' , listRoutes)


// running the app at a  required port
app.listen(8000 , () => {
 console.log('backend server connected')
})

