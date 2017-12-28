const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const db = require('./models/findingFidoModels');

const app = express();

const jwt = require('express-jwt');

const jwks = require('jwks-rsa');

const cors = require('cors');

const port = process.env.PORT || 9000;

// Need this to serve our bundled index.html
app.use(express.static(`${__dirname}/dist`));
// Need this to serve the logo picture
app.use(express.static(`${__dirname}/client/assets`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const authCheck  = jwt({
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
app.get('/api/deals', (req, res) => {
  res.json('hello');
})

// For the private route, we'll add this authCheck middleware
app.get('/api/deals/private', authCheck, (req, res) => {
  res.json('hello');
})


app.post('/login', (req, res) => {
  // Lili checking front-end send information from LoginComponent
  // {email: bla, password: bla}
  console.log(`login${req.body}`);
  res.send(req.body); // check to see I get the data back
  // Pull email from request, assign it to 'email'
  // Pull password from request, assign it to 'password'
  db.getUser(email, (err, user) => {
    if (err) {
      console.error(err);
      res.status(404).redirect('/signup');
    } else {
      // Check passwords. If match
      // Send token
      res.status(201).redirect('/profile');
    }
  });
});

app.post('/signup', (req, res) => {
  console.log(`signup${req.body}`);
  res.send(req.body);
});

app.post('/personSignup', authCheck, (req, res) => {
  console.log(`person${req.body}`);
  res.send(req.body);
  // { name: "amelie", address1: "2823 Ursulines Ave", city: "NEW ORLEANS", state: "LA", zip: "70119", extra: I am a girl }
  db.createUser(name, email, password, address, extra, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).send('Sorry, something went wrong');
    } else {
      // If they have a pet
      res.status(201).redirect('/signup2');
      // If they don't have a pet, redirect to signup 3
    }
  });
});


app.post('/schedule', (req, res) => {
  res.send(req.body);
});


app.post('/petSignup', (req, res) => {
  console.log(`pet${req.body}`);
  // { kind: "Dog", petName: "Doggy", place: "Central Park", petInfo: "super fun" }
  res.send(req.body);
  // Pull info from req
  db.createPet(name, kind, characteristics, userId, (err, pet) => {
    if (err) {
      res.status(500).send('Sorry, there was an issue');
    } else {
      res.status(201).redirect('/signup3');
    }
  });
});


app.get('/profile', (req, res) => {
  // Requires auth
  // If the requested profile is that user's profile
  // res.sendFile(path.join(__dirname, '/client/components/app/person-signup/person-signup.component.html'));
  // Otherwise
  // Send them the external profile page
});

app.put('/profile', (req, res) => {
  // Send which part of the profile will be updated on headers
  // Figure out what needs to be updated
  // Update that user's database entry
  // Redirect to profile get, so they can see it updated with the changes
});

app.delete('/profile', (req, res) => {
  // Delete the user's profile
  res.redirect('/signup');
});



app.post('/chat', (req, res) => {
  // Store message in databse
  // Send message to both users, using socket.io
});

app.post('/review', (req, res) => {
  // Add review to database
  // Send a thank you page
  // Send them to the homepage
});

app.get('/search', (req, res) => {
  // Should be able to handle searches client side without a post handler
  res.sendFile(path.join(__dirname, '/client/search.html'));
});

app.get('/signout', (req, res) => {
  // Destory token
  // Redirect to login page
});

app.get('/*', (req, res) => {
  res.redirect('/chat');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
