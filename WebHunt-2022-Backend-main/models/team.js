const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  members: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  latestTime: {
    type: Date,
  },
  solveCount: {
    type: Number,
  },
  position: {
    type: Number,
  },
  change: {
    type: Number,
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;