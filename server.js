const express = require("express");
const app = express();
const jsonData = require("./data.json");

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.get("/getData", function (req, res) {
  res.send(JSON.stringify(jsonData));
});

const port = process.env.port || 5000;
app.listen(port, function () {
  console.log("Listening on port 3000");
});
