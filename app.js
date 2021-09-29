const express = require("express");
const path = require("path");
const app = express();

const { spawn } = require("child_process");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const python = spawn("python", ["HR.py", "120"]);
  python.stdout.on("data", (data) => {
    console.log("Data from python script...");
    dataToSend = data.toString();
  });
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend);
  });
  // res.sendFile(path.join(__dirname, "/index.html"));
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
