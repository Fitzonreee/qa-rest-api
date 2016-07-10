'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sortAnswers = function(a, b){
  if (a.votes === b.votes) {
    return b.updatedAt - a.updatedAt;
  }
  return b.votes - a.votes;
};

var AnswerSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  votes: {type: Number, default: 0}
});

var QuestionSchema = new Schema({
  text: String,
  createdAt: {type: Date, default: Date.now},
  answers: [AnswerSchema]
});

// Pre-save callback
QuestionSchema.pre("save", function(next){
  this.answers.sort(sortAnswers);
  next();
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
