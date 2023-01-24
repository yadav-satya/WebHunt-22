const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionNo: Number,
  questionURL: String,
  questionAns: String,
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
