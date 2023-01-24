const express = require("express");
const mongoose = require("mongoose");
const date = require("date-and-time");

const errCode = require("../errCodes");
const User = require("../models/user");
const Team = require("../models/team");
const Question = require("../models/question");
const { verifyUser } = require("../middleware/verifyUser");
const config = require("../config");


const router = express.Router();

const getQuestion = async (req, res) => {
  try {
    let curtime = new Date();
    let starttime = new Date(config.startTime);
    let endtime = new Date(config.endTime);

    const { email } = req.userData;
    let user = await User.findOne({ email });

    const teamId = user.teamId;

    if(!teamId) {
      return res.status(errCode.SUCCESS_NOT_IN_TEAM).json({message:"please join team"});
    }


    let team = await Team.findOne({ teamId });
    const curQues = team.solveCount + 1;
    const totalQuestions = 9;
    if (curQues > totalQuestions) {
      return res.status(errCode.SUCCESS_ALL_DONE).json({ message: "All questions done!" });
    }

    const question = await Question.findOne({ questionNo: curQues });
    if (!question) {
      return res.status(errCode.NOT_FOUND).json({ message: "ques not found" });
    }
    const { questionNo, questionURL } = question
    return res.json({ questionNo, questionURL });
  } catch (err) {
    return res
      .status(errCode.BAD_REQUEST)
      .json({ message: "something went wrong" });
  }
};

const submitQuestion = async (req, res) => {
  const { email } = req.userData;
  try {
    let curtime = new Date();
    let endtime = new Date(config.endTime);
    
    let user = await User.findOne({ email });
    const teamId = user.teamId;
    if(!teamId) {
      return res.status(errCode.SUCCESS_NOT_IN_TEAM).json({message:"please join team"});
    }
   
    let team = await Team.findOne({ teamId });
    

    const curQues = team.solveCount + 1;
    const totalQuestions = (await Question.find()).length;
    if (curQues > totalQuestions) {
      return res.status(errCode.SUCCESS_ALL_DONE).json({ message: "All questions done!" });
    }

    const ques = await Question.findOne({ questionNo: curQues });

    const submittedAns = req.body.teamAns;
    if (submittedAns !== ques.questionAns) {
      return res.status(errCode.SUCCESS_WRONG_ANS).json({ message: "Wrong ans" });
    }

    const TimeNow = new Date();
    await Team.findByIdAndUpdate(
      team._id,
      { solveCount: curQues, latestTime: TimeNow },
      { new: true }
    );

    return res.status(errCode.SUCCESS_CORRECT_ANS).json({ message: "Correct Ans" });
  } catch (err) {
    // console.log(err);
    return res
      .status(errCode.BAD_REQUEST)
      .json({ message: "something went wrong" });
  }
};

router.get("", verifyUser, getQuestion);

router.post("", verifyUser, submitQuestion);

module.exports = router;
