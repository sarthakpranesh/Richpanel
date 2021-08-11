const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//importing firebase
require("./middleware/firebase")

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const webhooks = require('./routes/webhooks');
const register = require('./routes/register')

app.use(register);
app.use(webhooks);

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
