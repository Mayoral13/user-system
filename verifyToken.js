const jwt = require("jsonwebtoken");
function verify(req,res,next){
const token = req.header("Token");
if(!token){
    return res.json({code:404,message:"Access denied"})
}
try {
    const verified = jwt.verify(token,process.env.TOKEN);
    req.exists = verified;
    next();
} catch (error){
    return res.send("INVALID TOKEN")
}
}
module.exports = verify;
