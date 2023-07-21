const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("inside custom error handler--------", err);
  return res.status(500).json({
    msg: "Custom error handler ran",
    err,
  });
};

module.exports = errorHandlerMiddleware;
