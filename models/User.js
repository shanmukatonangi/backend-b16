const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:25,  
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:25,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,    
    },
    coverPic:{
        type:String,
    },
    about:{
        type:String
    },
    followers:{
        type:Array,  
    },
    followings:{
        type:Array,
    }

})
module.exports = mongoose.model("User",UserSchema)