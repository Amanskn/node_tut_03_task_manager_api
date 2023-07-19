const mongoose = require("mongoose");
// require("dotenv").config();
// ============Passing the options after connectString.Why? Ans:- to avoid the warning while connecting to the DB
// console.log("=================", process.env.DB_URL);
const DB = () => {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected! to the database......."))
    .catch((err) => {
      console.log("Error in connecting to the database", err);
    });
};
module.exports = DB;
