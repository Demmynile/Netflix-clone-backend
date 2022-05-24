//import libraries
const mongoose = require("mongoose")


//creation of a user schema

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
      
    },
    profile_picture : {
        type : String,
        default : ''
        
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

} , {timestamps : true}
);

module.exports = mongoose.model('User' , UserSchema)