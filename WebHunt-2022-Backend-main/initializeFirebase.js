
var admin = require("firebase-admin");

var serviceAccount = require("./webhunt2022-firebase-adminsdk-jrynr-84f3632733.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
