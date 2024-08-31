const express = require("express");
const { conn } = require("./connection/sql");
const router = require("./route/userRoute");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);
const path = "model/add.py";
// const pythonProcess = spawn("python", [path, "hello"]);

// pythonProcess.stdout.on("data", (data) => {
//   console.log("result", data.toString().trim());
// });
// pythonProcess.stderr.on("data", (data) => {
//   console.log("error", data);
// });
// pythonProcess.on("close", (code) => {
//   console.log("existing code", code);
// });

app.listen("1122", () => {
  console.log("connected to port 1122 \n http://localhost:1122");
});
