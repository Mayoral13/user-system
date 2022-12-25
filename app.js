const express = require("express");
const Connect = require("./config/db");
const routes = require('./routes/routes');
const bodyparser = require("body-parser");
const env = require("dotenv");
const app = express();
app.use(bodyparser.json());
env.config({path:"./process.env"});
app.use("/",routes);
Connect();
app.listen(3000,()=>{
    console.log("SERVER IS LIVE")
});