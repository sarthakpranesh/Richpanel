const gAdmin = require("firebase-admin")

var serviceAccount = require("../config.json");

//use this when using firebase-key.json
// const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;

gAdmin.initializeApp({
    credential: gAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://fbhelper-424c6-default-rtdb.firebaseio.com/',
  });
  
const db = gAdmin.database();
console.log("Firebase Connected")

module.exports = gAdmin
