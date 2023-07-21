const asyncWrapper = (fn) => {
  // console.log("Async wrapper ran");
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // ==============Just  a check
      // console.log("Inside catch of async.js:-------");
      // =================== Just a check to see whether we can send the response from here or not, and yes we can do so
      // return res.status(500).json({
      //   error,
      // });
      // ===========Passing the control further
      console.log("Next is running");

      // ============Always put return before next(), so that further written stuffs after next() do not get a chance to run,
      // ===========because if we are writing next() meaning we want to pass the control to the next middleware in the middleware stack and we do
      // ========== not want any further coming back. And also next() is an asynchronous  operation and that is why you should always try to write
      // =============== return before next() to avoid any synchronous tasks (written after next()) to execute. Got it:)
      return next(error);

      // =========I am talking about this below stuff to avoid it from getting executed by writing return before next(), OK
      res.send("Hello");
    }
  };
};

module.exports = asyncWrapper;
