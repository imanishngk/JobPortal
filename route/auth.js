const express = require("express");
const { signup, login } = require("../controller/auth");
const { signupValidator, loginValidator } = require("../middleware/auth");
const router = express.Router();


router.post("/signup", signupValidator, signup)
router.post("/login", loginValidator , login)

module.exports = router