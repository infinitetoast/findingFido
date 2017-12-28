const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const Message = require('./models/Message');

const User = require('./models/User');

const Pet = require('./models/Pet');

const Photo = require('./models/Photo');

const Activity = require('./models/Activity');

const Review = require('./models/Review');

const app = express();

// Check for environment variables, set port accordingly
const port = process.env.NODE_ENV === 'development' ? 9000 : 80;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));
// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


/*******************************************************
 Delete in production environment
 *********************************************************/
app.get('/users', (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUser(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).redirect('/signup');
    } else {
      // Check passwords. If match
      // Send token
      res.status(201).redirect('/profile');
      // Otherwise, send that there was an error with the password
    }
  });
});

app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.initialCreateUser(email, password, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sorry, something went wrong');
    } else {
      res.send('success', response);
    }
  });
});

app.post('/petSignup', (req, res) => {
  const userId = req.body.id; // Update this to change based on the current user, requires auth
  const name = req.body.name;
  const kind = req.body.kind;
  const characteristics = req.body.characteristics;
  Pet.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(pet);
    }
  });
});

app.post('/personSignup', (req, res) => {
  // const userId; // Pull out user id
  const name = req.body.name;
  const address = req.body.address;
  const extra = req.body.extra;
  User.finishUser(null, name, address, extra, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      // Send token
      res.send(response);
    }
  });
});

app.put('/profile', (req, res) => {
  // Send which part of the profile will be updated on headers
  // Figure out what needs to be updated
  // Update that user's database entry
  // Redirect to profile get, so they can see it updated with the changes
});

app.delete('/profile', (req, res) => {
  // Delete the user's profile
  res.status(202).send('Successfully deleted');
});

app.post('/chat', (req, res) => {
  const body = 'hi';
  const userId = 4;
  Message.createMessage(body, userId, (result) => {
    res.send(result);
  });
  // Store message in databse
  // Send message to both users, using socket.io
});

app.post('/review', (req, res) => {
  const user = 4;
  const body = 'cool';
  Review.createReview(user, body, (err, review) => {
    if (err) {
      console.error(err);
      res.status(404).send(err);
    } else {
      res.status(201).send(review);
    }
  });
});


app.post('/search', (req, res) => {
  // Search the database for people who are looking for someone at that time
});

app.get('/activities/*', (req, res) => {
  // Pull user id out of request params
  // Query database for that user's activities
  // Respond with the activities
});

app.post('/activities', (req, res) => {
  const userId = req.body.userId; // Update this based on user id with auth
  const description = req.body.description;
  const location = req.body.location;
  const time = req.body.time;
  Activity.createActivity(description, location, userId, time, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

app.get('/petDashboard', (req, res) => {
  // Get information for user
  // Get information for pet
  // Send response with information
});

app.get('/signout', (req, res) => {
  // Destory token
  res.redirect('/login');
});

app.get('/*', (req, res) => {
  res.redirect('/profile');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
