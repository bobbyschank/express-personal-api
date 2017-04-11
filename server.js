// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var profile = {
  name: 'Bob Schank',
  origin: 'The Flour City',
  github_link: 'https://github.com/bobbyschank',
  github_profile_image: 'http://i.imgur.com/Z4mASEy.jpg',
  current_city: 'Denver',
  pets: [
    {
      name: 'Sheila',
      type: 'Fish',
      breed: 'Gold Fish'
    },
    {
      name: 'Gary',
      type: 'Snail',
      breed: 'Yellow Belly'
    }
  ]
};

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/bobbyschank/express-personal-api/blob/master/README.md",
    base_url: "http://secret-chamber-34386.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Bob Schank 101"},

      {method: "GET", path: "/api/foods", description: "View all the food Bob Schank can cook"},
      {method: "GET", path: "/api/foods/:id", description: "Find a single food by id"},
      {method: "POST", path: "/api/foods", description: "Add a dish to my repertoire."}
    ]
  });
});

// 

app.get('/api/profile', function (req, res) {
  // TODO: Document all your api endpoints below
  res.json(profile);
});


// INDEX
app.get('/api/foods', function (req, res) {
  db.Food.find({}, function(err, foods) {
    if (err) { console.log('error: ', err);}
    res.json(foods);
  });
});

// SHOW
// (Not sure why this one won't work.)
// app.get('api/foods/:_id', function (req, res) {
//   console.log('req.params._id', req.params._id);
//   db.Food.findOne({_id: req.params._id }, function(err, food) {
//     res.json(food);
//   });
// });

// SHOW
app.get('/api/foods/:_id', function (req, res) {
  console.log('req.params._id', req.params._id);
  db.Food.findOne({_id: req.params._id }, function(err, food) {
    res.json(food);
  });
});

// CREATE
app.post('/api/foods', function (req, res) {
  var newFood = new db.Food({
    name: req.body.name,
    notes: req.body.notes,
    cookTime: req.body.cookTime,
    proficiency: req.body.proficiency,
    partyReady: req.body.partyReady
  });
  newFood.save(function(err, food) {
    if (err) {console.log('save error: ', err);}
    console.log('saved', food.name);
    res.json(food);
  });
});

// UPDATE
app.put('/api/foods/:_id', function (req, res) {
  console.log('req.params._id', req.params._id);
  var newFood = new db.Food({
    name: req.body.name,
    notes: req.body.notes,
    cookTime: req.body.cookTime,
    proficiency: req.body.proficiency,
    partyReady: req.body.partyReady
  });
  db.Food.findOne({_id: req.params._id }, function(err, food) {
    if (err) {console.log('save error: ', err);}
    food.name = req.body.name;
    food.notes = req.body.notes;
    food.cookTime = req.body.cookTime;
    food.proficiency = req.body.proficiency;
    food.partyReady = req.body.partyReady;
    food.save(function(err, food) {
      if (err) {console.log('save error: ', err);}
      console.log('saved', food.name);
      res.json(food);
    });
  });
});

// DELETE
app.delete('/api/foods/:_id', function (req, res) {
  console.log('In delete');
  var foodId = req.params._id;
  db.Food.findOneAndRemove({ _id: foodId }, function (err, deletedFood) {
    res.json(deletedFood);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
