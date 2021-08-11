const app = require("express")()
const firebase = require("../middleware/firebase");

app.post("/user", async (req, res) => {
    const pageAccessToken = req.body.pageAccessToken;
    const pageId = req.body.page;

    const ref = firebase.database().ref("page");
    try {
        const refData = await ref.child(pageId).once("value");
        let data = await refData.val();
        if (data === null) {
            data = {};
            data.accessToken = pageAccessToken;
        } else {
            data.accessToken = pageAccessToken;
        }
        await ref.child(pageId).set(data);
        res.sendStatus(200);
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
})

module.exports = app;
