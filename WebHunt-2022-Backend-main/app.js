const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const config = require("./config");

const authRouter = require("./routes/authRouter");
const teamRouter = require("./routes/teamRouter");
const question = require("./routes/question");
const leaderboardRouter = require('./routes/leaderboard.js');

require("./initializeFirebase.js");

const app = express();

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/api/team", teamRouter);
app.use("/api/questions", question);
app.use("/api/leaderboard", leaderboardRouter);

//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, DELETE"
  );
  next();
});

if (require.main === module) {
  app.listen(config.PORT, () => {
    console.log(`App listening on port ${config.PORT}!`);
  });
}
