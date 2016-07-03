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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// ************* server port ***************//
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Express is listening on", port);
});
