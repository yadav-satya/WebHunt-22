const express = require("express");
const mongoose = require("mongoose");

const errCode = require("../errCodes");
const User = require("../models/user");
const Team = require("../models/team");
const { verifyUser } = require("../middleware/verifyUser");

const router = express.Router();

const loginUser = async (req,res,next) => {
	try {
		const {email} = req.userData;
		let user = await User.findOne({"email": email});
    if(!user) {
      user = new User({name:"Contestant", email });
      await user.save();
    }
		// console.log(user);
    let team = null;
    if(user.teamId) {
      team = await Team.findOne({teamId: user.teamId});
    }
    let teamMembers = []
    // console.log(team);
    if(team && team.members) {
      for(let i=0;i < team.members.length;i++) {
        const member = await User.findOne({_id: team.members[i]});
        teamMembers.push(member.name);
      } 
    }
		return res.status(errCode.SUCCESS).json({ message:"Login successfull", user, teamMembers});
	} catch (err) {
    console.log(err);
    return res
      .status(errCode.INTERNAL_ERROR)
      .json({ message: "Something wrong happend!" });
	}
};

const profileUpdate = async (req,res,next) => {
  try {
    const {email} = req.userData;
    const {name,rollNumber,mobileNumber} = req.body
    const user = await User.findOne({email});
    // console.log(req.body);
    user.name = name;
    user.rollNumber = rollNumber;
    user.mobileNumber = mobileNumber;
    await user.save();
    return res.status(errCode.SUCCESS).json({meassage:"profile updated successfully",user});
  } catch (err) {
    return res.status(errCode.INTERNAL_ERROR).json({ message: "Something wrong happend!" });
  }
};

const profileFetch = async (req,res,next) => {
  try {
    const {email} = req.userData;
    const user = await User.findOne({email});
    return res.status(errCode.SUCCESS).json({message: "Profile fetched", user:user});
  } catch (err) {
    return res.status(errCode.INTERNAL_ERROR).json({ message: "Something wrong happend!" });
  }
};

// sign in
router.post("/login",verifyUser,loginUser);

// profile Update
router.post("/profile",verifyUser,profileUpdate);

// profile fetch
router.get("/profile",verifyUser,profileFetch);


module.exports = router;
