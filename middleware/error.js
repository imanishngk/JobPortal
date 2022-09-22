//error handling
const error = (err, req, res, next) => {
  console.log(err.name);

  let status = 500;
  if(err.name == "ValidationError"){
    status = 400;
  }
  res.status(status).send({
    data: "Server Error",
    msg: err.message
  });
};

module.exports = error