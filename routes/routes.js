const router = require("express").Router();
const joi = require("@hapi/joi");
const Model = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../verifyToken");

const registerValid = joi.object({
  name: joi.string().required().min(6),
  email: joi.string().required().min(6),
  password: joi.string().required().min(6),
});
const loginValid = joi.object({
  email: joi.string().required().min(6),
  password: joi.string().required().min(6),
});
router.post("/register", async (req, res) => {
  const { error } = registerValid.validate(req.body);
  if (error) {
    return res.json({ code: 404, message: "Error", data: error });
  }
  const exists = await Model.findOne({ email: req.body.email });
  if (exists) {
    return res.json({ code: 200, message: "User exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const user = new Model({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  
  user.save((err, data) => {
    if (!err) {
      return res.json({ code: 200, message: "User Registered", user: data });
    }
  });
});
router.post("/Login", async (req, res) => {
  const { error } = loginValid.validate(req.body);
  if (error) {
    return res.json({ code: 404, message: "Error", data: error });
  }
  const exists = await Model.findOne({ email: req.body.email });
  const validPass = await bcrypt.compare(req.body.password, exists.password);
  if (exists && validPass) {
    const token = jwt.sign({id:exists._id},process.env.TOKEN);
    return res.header("Token",token).json({ code: 200, message: "Logged In",token:token});
  } else {
    return res.json({ code: 404, message: "Invalid Details" });
  }
});
router.get("/Access",middleware,(req,res)=>{
    res.json({
        data:"Some stuff",
        reason:"I should not be here"
    });
});
module.exports = router;
