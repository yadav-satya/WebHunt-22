const admin = require("firebase-admin");

const errCodes = require("../errCodes");

exports.verifyUser = async (req, res, next) => {
	// console.log(req);
	try {
		const { authtoken } = req.headers;
		// console.log(authtoken);
		if (!authtoken) {
			res.status(errCodes.BAD_REQUEST).json({ message: "token is null" });
			return;
		}
		const userData = await admin.auth().verifyIdToken(authtoken);
		// console.log(userData);
		req.userData = userData;
		next();
	} catch (err) {
		console.log(err);
		res.status(errCodes.BAD_REQUEST).json({ message: err.message });
	}
};
