const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 9000;

//app.use(express.static(__dirname + '/dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'client/assets')));


app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.send();
});

app.listen(port, () => {
  console.log('App is listening on ' + port);
});