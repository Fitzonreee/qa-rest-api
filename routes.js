'use strict';

var express = require("express");
var router = express.Router();
// Require Question model
var Question = require("./models").Question;

router.param("qID", function(req, res, next, id){
  Question.findById(req.params.qId, function(err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param("aID", function(req, res, next){

});

// ***** Questions Routes ***** //
// -- strips away what was already matched in app.js --

// GET /questions -- get all questions
router.get("/", function(req, res, next) {
  Question.find({})
    .sort({createdAt: -1})
    .exec(function(err, questions) {
      if (err) {
        return next(err);
        res.json(questions);
      }
  });
});

// POST /questions -- create question
router.post("/", function(req, res, next) {
  var question = new Question(req.body);
  question.save(function(err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:qID -- specific question
router.get("/:qID", function(req, res, next) {
  res.json(req.question);
});

// ***** Answer Routes ***** //

// POST /questions/:qID/answers -- creating answer
router.post("/:qID/answers", function(req, res, next) {
  req.question.answers.push(req.body);
  req.question.save(function(err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:qID/answers/:aID
// edit a specific answer
router.put("/:qID/answers/:aID", function(req, res) {
  res.json({
    response: "You sent me a PUT request to /answers",
    questionId: req.params.qID,
    answerID: req.params.aID,
    body: req.body
  });
});

// DELETE /questions/:qID/answers/:aID
// delete a specific answer
router.delete("/:qID/answers/:aID", function(req, res) {
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionId: req.params.qID,
    answerID: req.params.aID
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// vote a specific answer
router.post("/:qID/answers/:aID/vote-:dir",
function(req, res, next) {
  if (req.params.dir.search(/^up|down$/) === -1) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
},
function(req, res) {
  res.json({
    response: "You sent me a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerID: req.params.aID,
    vote: req.params.dir
  });
});


module.exports = router;
