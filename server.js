// Npm packages
const express = require('express');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary');

const jwt = require('express-jwt');

const jwks = require('jwks-rsa');

const cors = require('cors');

const axios = require('axios');

// Local files
const Message = require('./models/Message');

const User = require('./models/User');

const Pet = require('./models/Pet');

const Photo = require('./models/Photo');

const Activity = require('./models/Activity');

const Review = require('./models/Review');

const key = require('./config/googlemaps.api');

const app = express();

// Check for environment variables, set port accordingly
const port = process.env.NODE_ENV === 'development' ? 9000 : 80;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));

// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(cors());


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://findo.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:9000',
  issuer: 'https://findo.auth0.com/',
  algorithms: ['RS256'],
});


// Takes in information about the pet, puts it in a pet table with a link to the user
app.post('/petSignup', (req, res) => {
  const userEmail = req.body.profile.email;
  const {
    kind,
    name,
    characteristics,
    place,
  } = req.body;
  Pet.createPet(name, kind, characteristics, place, userEmail, (err, pet) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(pet);
    }
  });
});

// Creates a new user
app.post('/personSignup', (req, res) => {
  const { email } = req.body.profile;
  const {
    name,
    address,
    city,
    state,
    zip,
    extra,
  } = req.body;
  User.createUser(name, email, address, city, state, zip, extra, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(response);
    }
  });
});

// Updates profile information
app.put('/profile', (req, res) => {
  const userEmail = req.body.profile.email;
  const { updateKey, updateValue } = req.headers;
  User.updateUser(userEmail, updateKey, updateValue, (err, updated) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(updated);
    }
  });
});

// Deletes a profile
app.delete('/profile', (req, res) => {
  const userEmail = req.body.profile.email;
  User.deleteUser(userEmail, (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(202).send(result);
    }
  });
});

// Saves chat messages to the database
app.post('/chat', (req, res) => {
  const userEmail = req.body.profile.email;
  const { text } = req.body;
  // Store message in databse
  Message.createMessage(text, userEmail, (err, result) => {
    // Send message to both users, using socket.io
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

// Saves reviews to the database
app.post('/review', (req, res) => {
  const userEmail = req.body.profile.email;
  const {
    punctuality,
    friendliness,
    overall,
    comments,
  } = req.body;
  Review.createReview(userEmail, punctuality, friendliness, overall, comments, (err, review) => {
    if (err) {
      console.error(err);
      res.status(404).send(err);
    } else {
      res.status(201).send(review);
    }
  });
});

// Write route to get activities at a certain time for the schedule component
app.get('/activities/:date', (req, res) => {
  const time = req.params.date;
  Activity.getActivitiesByTime(time, (err, activities) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(activities);
    }
  });
});

// Adds an activity to the database from the dashboard component
app.post('/activities', (req, res) => {
  // Update this one a lot
  const userEmail = req.body.profile.email;
  const {
    location,
    time,
    date,
  } = req.body;
  Activity.createActivity(userEmail, location, time, date, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

// Sends information to fill out the individual dashboard person dashboard and pet dashboard
app.get('/dashboard/:email', (req, res) => {
  // Also get activities for that user
  const userEmail = req.params.email;
  // const userEmail = req.body.profile.email;
  // Gets user information based on email
  User.getUser(userEmail, (err, userInfo) => {
    if (err) console.error(err);
    // Gets pet information based on returned user id
    Pet.getPet(userEmail, (error, petInfo) => {
      if (error) console.error(error);
      // Gets activities for that user
      Activity.getUserActivities(userEmail, (er, activities) => {
        // Puts them in object and sends to user
        if (er) console.error(er);
        const result = { userInfo, petInfo, activities };
        res.status(200).send(result);
      });
    });
  });
});

// Recieves a file upload, adds it to cloudinary, then adds to the database
app.post('/photos', (req, res) => {
  console.log(req.body)
  res.send(req.files);
  // const newPhoto = req.files;
  // const userEmail = req.body.profile.email;
  // // Uploads to cloudinary
  // cloudinary.uploader.upload(newPhoto, (result) => {
  //   // Uploads returned url to our database
  //   Photo.addPhoto(result.url, userEmail, (err, photo) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       // Sends back the new photo to the client side to be rendered
  //       res.status(201).send(photo);
  //     }
  //   });
  // });
});

// Gets user photos for their profile page
app.get('/photos', (req, res) => {
  const userEmail = req.headers.email;
  Photo.findUserPhotos(userEmail, (err, photos) => {
    if (err) {
      res.status(404).send(photos);
    } else {
      res.status(200).send(photos);
    }
  });
});

// Gets the lat/long location for the map
app.post('/map', (req, res) => {
  res.send('hello');
//   const { location } = req.body;
//   axios({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location},+New+Orleans,+LA&key=${key.token}`,
//     type: 'GET',
//     dataType: 'JSONP',
//     headers: {
//       'Access-Control-Allow-Origin': 'true',
//     },
//   })
//     .then(response => res.status(200).send(response));
  // 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBfz7Y7C-7emBWPSEi925MBpeXLRcL-Jzw'
});

// Open our connection
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
