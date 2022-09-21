const express = require("express");
require("dotenv").config();

//Mongo DB connection
require("./config/dbconnection")
const app = express();

app.get("/mid", (req, res, next)=>{
    res.status(200).send("middleware created")
})

app.listen(process.env.PORT, (data, err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(process.env.port);
    console.log("listening...");
  }
});
