const express = require("express");
const app = express();
const path = require("path");
const port = 8000;

app.use(express.static(path.join(__dirname, "/public")));

// ============middlware for parsing the raw JSon data
app.use(express.json());

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "/public/index.html"));
  return res.send("hello world");
});

// console.log("1------", path.join(__dirname, "public"));
// console.log("2------", __dirname + "//public");
app.use("/api/v1/tasks", require("./routes/tasks.js"));

app.listen(port, (err) => {
  if (err) console.log("Error in running the server");
  console.log("Server is running on port:-", port);
});
