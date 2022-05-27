//import library
const mongoose = require("mongoose")
const dotenv = require("dotenv")

//initialize dotenv
dotenv.config()

//connect to the db
mongoose.connect(process.env.BACKEND_CONNECT , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => {
    console.log("DB connected successfully")
})
.catch((err) => {
    console.log(err)
})