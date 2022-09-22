const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Insert your password"],
    select: false,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["job-seeker", "company", "super-admin"],
    default: "job-seeker",
  },
});

module.exports = mongoose.model("User", UserSchema);
