const mongoose = require("mongoose");
const Connect = ()=> {
    try {
         mongoose.connect(process.env.URI,()=>{
        console.log("Connected to Database")
    });
    } catch (error) {
        console.log(error)
    }
   
}
module.exports = Connect;