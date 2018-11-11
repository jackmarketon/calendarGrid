const express = require('express');
const events = require('./events.json');

const app = express();

app.get('/', (req, res) => {
  res.send(events);
});

app.listen('3030', () => {
  console.log('App Listening on port: 3030');
});
