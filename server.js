const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const port = process.env.PORT || 9000;

// app.use(express.static(__dirname, '/client'));

app.use(express.static(`${__dirname}/dist`));

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

app.post('/login', (req, res) => {
  // Check the database for the user
  // If the user doesn't exist, send them to the signup page
  // If the user does exist, send a token and redirect them to the profile page
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup1.html'));
});

app.post('/signup', (req, res) => {
  // Store the email and password in memory
  // If they have a pet, redirect them to signup 2
  // If no pet, redirect them to signup 3
});

app.get('/signup2', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup2.html'));
});

app.post('/signup2', (req, res) => {
  // Store their information in the database
  // Redirect them to signup 3
});

app.get('/signup3', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup3.html'));
});

app.post('/signup3', (req, res) => {
  // Store information in the database
  // Send auth token
  // Redirect to profile page
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
