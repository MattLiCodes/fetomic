const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const app = express();
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  var dataToSend;
  const python = spawn("python", ["scriptTest.py", "120"]);
  python.stdout.on("data", function (data) {
    dataToSend = data.toString();
    console.log(dataToSend);
  });
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/readPython", (req, res) => {
  console.log(req.body.name);
  var dataToSend;
  const python = spawn("python", ["scriptTest.py", "120"]);
  python.stdout.on("data", function (data) {
    dataToSend = data.toString();
    console.log(dataToSend);
  });

  python.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  // python.on("exit", (code) => {
  //   console.log(`child process exited with code ${code}, ${dataToSend}`);
  //   response.sendFile(`${__dirname}/result.html`);
  // });
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
