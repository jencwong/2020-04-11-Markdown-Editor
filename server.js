const express = require("express");
const app = express();
// get sharejs dependencies
const sharejs = require("share");
//options for sharejs
const options = {
  db: { type: "redis" },
};
require("redis");

// set up redis server
// var redisClient;
// console.log(process.env.REDISTOGO_URL);
// if (process.env.REDISTOGO_URL) {
//   let rtg = require("url").parse(process.env.REDISTOGO_URL);
//   redisClient = require("redis").createClient(rtg.port, rtg.hostname);
//   redisClient.auth(rtg.auth.split(":")[1]);
// } else {
//   redisClient = require("redis").createClient();
// }

//set the view engine to ejs
app.set("view engine", "ejs");

// public folder to store assets
app.use(express.static(__dirname + "/public"));

// routes for app
app.get("/", function (req, res) {
  res.render("pad");
});

app.get("/:id", function (req, res) {
  res.render("pad");
});

//attach the express server to sharejs
sharejs.server.attach(app, options);

// listen on port 3000 (for localhost)
var port = process.env.PORT || 3000;
app.listen(port);
