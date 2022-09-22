const express = require("express");
require("dotenv").config();

//internal dependancy
require("./config/dbconnection")
const error = require("./middleware/error");
const auth_route = require("./route/auth")
const app = express();
app.use(express.json())

app.use('/api', auth_route)

//error handiling
app.use(error)

app.listen(process.env.PORT, (data, err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(process.env.port);
    console.log("listening...");
  }
});
