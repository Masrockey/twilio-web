// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send-sms', (req, res) => {
  const { to, message } = req.body;
  client.messages.create({
    from: process.env.TWILIO_NUMBER,
    to,
    body: message
  })
  .then(message => {
    res.render('success', { message });
  })
  .catch(error => {
    res.render('error', { error });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
