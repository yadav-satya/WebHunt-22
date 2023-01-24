const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  rollNumber: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  teamId: String,
  mobileNumber: String,
  teamName: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;