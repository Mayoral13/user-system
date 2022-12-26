const mongoose  = require("mongoose");
const Model = mongoose.model("Model",{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    age:{
        type:String,
        required:true 
    },
    gender:{
        type:String,
        required:true 
    },
    occupation:{
        type:String,
        required:true 
    }
},"users");
module.exports = Model;
