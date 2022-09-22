const { body } = require("express-validator");
const validate = require("../utils/validate");

const signupValidator = validate([
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be minimum 5 character"),
  body("name").exists(),
  body("name").exists(),
  body("name").exists(),
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
