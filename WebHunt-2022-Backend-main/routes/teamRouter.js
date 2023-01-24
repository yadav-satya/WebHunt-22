const express = require("express");
const mongoose = require("mongoose");

const errCode = require("../errCodes");
const User = require("../models/user");
const Team = require("../models/team");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

const generateTeamCode = (count) => {
  const chars = "acdefhiklmnoqrstuvwxyz0123456789".split("");
  let result = "";
  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result;
};

const createTeam = async (req, res, next) => {
  const teamId = generateTeamCode(6);
  const { teamName } = req.body;
  const { email } = req.userData;
  try {
    let user = await User.findOne({ email });
    if (user.teamId) {
      return res
        .status(errCode.CREATE_ERROR)
        .json({ message: "already in a team" });
    }
    const teamSameName = await Team.find({ teamName });
    // console.log(teamSameName);
    if (teamSameName.length !== 0) {
      return res
        .status(errCode.CREATE_ERROR)
        .json({ message: "This name is already taken use some other team name!" });
    }
    const teams = await Team.find();
    // console.log(teams);
    const newTeam = new Team({
      teamId,
      teamName,
      position: (teams ? teams.length : 0) + 1,
      change: 0,
      solveCount: 0,
      members: [user._id],
    });
    await newTeam.save();
    user.teamId = newTeam.teamId;
    user.teamName = newTeam.teamName;
    await user.save();
    return res
      .status(errCode.SUCCESS)
      .json({
        message: "Team created successfully",
        team:newTeam,
        teamMembers: [user.name],
      });
  } catch (err) {
    console.log("error in creating the team");
    console.log(err);
    return res
      .status(errCode.INTERNAL_ERROR)
      .json({ message: "erron in creating the team! try again later" });
  }
};

const joinTeam = async (req, res, next) => {
  const { email } = req.userData;
  const { teamId } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user.teamId) {
      return res
        .status(errCode.CREATE_ERROR)
        .json({ message: "You already join a team" });
    }
    let team = await Team.findOne({ teamId });
    if (!team) {
      return res
        .status(errCode.SUCCESS_NOT_FOUND)
        .json({ message: "team not found check code" });
    }
    if (team.members.length == 3) {
      return res
        .status(errCode.SUCCESS_TEAM_FULL)
        .json({ message: "Team already have 3 members" });
    }
    team.members.push(user._id);
    await team.save();
    user.teamId = teamId;
    user.teamName = team.teamName;
    await user.save();
    let teamMembers = [];
    if (team) {
      for (let i = 0; i < team.members.length; i++) {
        const member = await User.findOne({ _id: team.members[i] });
        teamMembers.push(member.name);
      }
    }
    return res
      .status(errCode.SUCCESS)
      .json({ message: "team joining successful", teamMembers,team });
  } catch (err) {
    console.log(err);
    return res
      .status(errCode.INTERNAL_ERROR)
      .json({ message: "error in joining team" });
  }
};

// create Team
router.post("/create-team", verifyUser, createTeam);

// join team
router.post("/join-team", verifyUser, joinTeam);

module.exports = router;
