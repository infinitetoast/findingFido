const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 9000;

app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log('App is listening on ' + port);
});