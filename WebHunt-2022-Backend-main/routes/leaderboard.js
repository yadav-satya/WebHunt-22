const mongoose = require("mongoose");

const router = require("./teamRouter");
const { verifyUser } = require("../middleware/verifyUser");
const Team = mongoose.model("Team");
const errCode = require("../errCodes");


const getLeaderBoard = async (req, res, next) => {
	let query = {};
	let sort = { solveCount: -1, latestTime: 1 };
     
    try {
        let newLeaderboard = await Team.find(query).sort(sort);
        newLeaderboard.forEach(async (team, newposition) => {
 			const change = team.position - (newposition + 1);
            let result = await Team.findByIdAndUpdate(
                team._id,
                {position: newposition + 1, change: change},
                {new: true}
            );
            // console.log(result);
        });

        newLeaderboard = await Team.find(query).sort(sort).populate("members");
        res.status(errCode.SUCCESS).json({message: "Leaderboard loaded!",leaderboard: newLeaderboard});

    } catch (err) {
        console.log(err);
        res.status(errCode.INTERNAL_ERROR).json({message: "something went wrong"});
    }
};

router.get("", getLeaderBoard);
module.exports = router;