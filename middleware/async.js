const asyncWrapper = (fn) => {
  console.log("Async wrapper ran");
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      // ==============Just  a check
      // console.log("Inside catch of async.js:-------");

      // =================== Just a check to see whether we can send the response from here or not, and yes we can do so
      // return res.status(500).json({
      //   error,
      // });

      // ===========Passing the control further
      next(error);
    }
  };
};

module.exports = asyncWrapper;
