//import libraries
const express = require("express")
const database = require("./config/db")
const authRoutes = require('./routes/user')


//intialize the app 
const app = express()

console.log(database)


//accepting the json format
app.use(express.json())

// app.use(express.urlencoded({extended: false}))

//general url for endpoint 
app.use('/api/auth' , authRoutes)

// running the app at a  required port
app.listen(8000 , () => {
 console.log('backend server connected')
})

