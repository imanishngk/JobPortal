const { body } = require("express-validator");
const validate = require("../utils/validate");
const User = require("../model/User");

const signupValidator = validate([
  body("name")
    .exists()
    //FIXME: name should be string
    .isString()
    .withMessage('Name must be a String')
    .isLength({ min: 3 })
    .withMessage("Name must be 3 charater long"),
  body("email", "Input your email").exists().isEmail()
  .custom(async(email)=>{
    const user = await User.findOne({ email });
    if(user){
      throw new Error('Email already in use')
    }
  })
  ,
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be minimum 5 character"),
]);

const loginValidator = validate([
  body("email").isEmail().withMessage("Email Required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
]);

module.exports = {
  signupValidator,
  loginValidator,
};
