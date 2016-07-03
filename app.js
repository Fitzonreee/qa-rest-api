'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");
var jsonParser = require("body-parser").json;
var logger = require("morgan");

app.use(logger("dev"));
// gives colorful status codes about API responses

app.use(jsonParser());
// needs to come before anything with body-parser


// sends this url to routes file
app.use("/questions", routes);











// ************* server port ***************//
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Express is listening on", port);
});
