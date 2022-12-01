const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const signup = async (req, res, next) => {
  let email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send({ msg: "Email is already in use" });
  } else {
    try {
      let saltRounds = 10;
      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      console.log(hash);
      User.create({ ...req.body, password: hash }, (err, data) => {
        if (err) {
          next(err);
        } else {
          let user_object = data.toObject();
          console.log({ data });
          res.status(200).send({ data: user_object });
        }
      });
    } catch (err) {
      console.log("signup error");
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({ email }).select("password");

    let status = bcrypt.compareSync(req.body.password, user.password);
    if (!status) {
      res.status(401).send({
        msg: "Invalid Credentials",
      });
    }

    let user_obj = await User.findOne({ email });
    var token = jwt.sign(user_obj.toObject(), process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    console.log(token);

    res.send({ access_token: token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
