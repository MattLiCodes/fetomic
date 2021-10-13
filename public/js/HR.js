// python.stdout.on("data", (data) => {
//   console.log("Data from python script...");
//   dataToSend = data.toString();
// });
// python.on("close", (code) => {
//   console.log(`child process close all stdio with code ${code}`);
// });
var HR = document.getElementById("fhr-value");

var newHR = 120;

const { spawn } = require("child_process");

const python = spawn("python", ["../HR.py", "120"]);

python.stdout.on("data", (data) => {
  console.log("Data from python script...");
  newHR = data;
});

function changeValue() {
  HR.textContent = newHR;
}
