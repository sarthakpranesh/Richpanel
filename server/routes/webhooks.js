const app = require("express")()
const request = require('request');
const firebase = require("../middleware/firebase");

const db = firebase.database();

app.post('/webhook', (req, res) => {  
    let body = req.body;
    console.log(body);
    if (body.object === 'page') {
      body.entry.forEach(function(entry) {
        let webhook_event = entry.messaging[0];
        if (webhook_event.message) {
          handleMessage(webhook_event);        
        } else {
          console.log('Do not handle this event!');
        }
      });
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
});

function handleMessage(webhookEvent) {
    let sender_psid = webhookEvent.sender.id;
    let recipient_psid = webhookEvent.recipient.id;
    const ref = db.ref(`page/${recipient_psid}/${sender_psid}`);
    ref.once("value")
        .then((data) => data.val())
        .then((data) => {
            if (data === null) {
                data = {};
                data.messages = [];
                data.sender = sender_psid;
                data.recipient = recipient_psid;
                data.type = "Facebook Message";
            }
            webhookEvent.message.isCustomer = true;
            ref.set({
                ...data,
                timestamp: Date.now(),
                messages: [...data.messages, webhookEvent.message],
            })
        })
        .catch((err) => {
            console.log(err);
        })
}
  
  
app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "sarthakpranesh"
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
});


app.post('/message', async (req, res) => {
    const body = req.body;
    const recipientId = body.recipient;
    const senderId = body.sender;
    const message = body.message;
    const pageAccessToken = req.header("Authorization");
    try {
      await callSendAPI(recipientId, senderId, pageAccessToken, message);
      const ref = await db.ref(`page/${senderId}/${recipientId}`);
      const refData = await ref.once("value");
      const data = await refData.val();
      await ref.set({
        ...data,
        timestamp: Date.now(),
        messages: [
          ...data.messages,
          {
            text: message,
            isCustomer: false,
            mid: Date.now(),
          }
        ]
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
})
  
  // Sends response messages via the Send API
function callSendAPI(recipient_psid, sender_psid, pageAccessToken, message) {
  return new Promise((resolve, reject) => {
    let request_body = {
      "recipient": {
        "id": recipient_psid
      },
      "message": {
        "text": message,
      }
    }
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": pageAccessToken },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
          resolve();
        } else {
          console.log(err.message);
          reject(err);
        }
    }); 
  })
}

module.exports = app;
