const express = require('express');
const cors = require('cors');
const events = require('./events.json');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send(events);
});

app.listen('3030', () => {
  console.log('App Listening on port: 3030');
});
