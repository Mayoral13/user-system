const joi = require("@hapi/joi");
const validate  = require("@hapi/joi/lib/base");
const registerValid = (data) =>{
    const schema = {
        

    };
    return schema.validate(data);
}
const loginValid = (data) =>{
    const schema = {
        email:joi.string().required().min(6),
        password:joi.string().required().min(6),

    };
    return schema.validate(data);
}
module.exports = {registerValid,loginValid};