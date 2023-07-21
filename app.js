require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// ========Requiring the connect.js file to establish the connection to the database
const DB = require("./db/connect");

app.use(express.static(path.join(__dirname, "/public")));

// ============middlware for parsing the raw JSon data
app.use(express.json());

app.get("/hello", (req, res) => {
  // res.sendFile(path.join(__dirname, "/public/index.html"));
  console.log("This is the requested url:------", req.url);

  return res.send("hello world by Aman");
});

// console.log("1------", path.join(__dirname, "public"));
// console.log("2------", __dirname + "//public");
app.use("/api/v1/tasks", require("./routes/tasks.js"));

// =============Please note that the order of the middleware also matters, meaning:- middlware1 will be called only for routes other
// app.use((req, res, next) => {
//   console.log("Middleware 1 called");
//   // =========This is for checking purpose that we can send response from the middleware also
//   // return res.send("Go back");
//   next();
// });

// app.all("*", (req, res, next) => {
// ============ either Return your custom response or pass the flow to the expressJS's default error handler
// return res.send(`${req.url} does not exist`);

// ============Passing the flow to the default error handler of expressJS
//   next();
// });

// ==========Invoking the middleware for all the unhandled routes
app.use(notFound);

// =========Invoking the custom error handler
app.use(errorHandlerMiddleware);

const server = async () => {
  await DB();
  app.listen(port, (err) => {
    if (err) console.log("Error in running the server");
    console.log("Server is running on port:-", port);
  });
};
server();
