const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
