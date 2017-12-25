const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const port = process.env.PORT || 9000;

app.use(express.static(__dirname, '/client'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // If the user is logged in
  // Send them their own profile
  // Otherwise
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup1.html'));
});

app.get('/signup2', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup2.html'));
});

app.get('/signup3', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup3.html'));
});

app.get('/profile', (req, res) => {
  // Requires auth
  // If the requested profile is that user's profile
  res.sendFile(path.join(__dirname, '/client/profile.html'));
  // Otherwise
  // Send them the external profile page
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/chat.html'));
});

app.get('/review', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/review.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/search.html'));
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
