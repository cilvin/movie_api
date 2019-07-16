/*global  mongoose:true bodyParser:true  morgan:true require:true*/
/*eslint  no-undef:  "error", */
/*eslint no-console: ["Error", { allow: ["log", "error"] }] */

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./model.js');

const Movies = Models.Movie;
const Users  = Models.User;
const passport = require('passport');
require('./passport');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/MovieReel', {useNewUrlParser: true});




//Invoke middleware functions
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());

var auth = require('./auth')(app);

//Error handling middleware functions
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});


//Returns a JSON object containing data about all movies
app.get('/Movies', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.find().then(Movies => res.json(Movies));
});

//Return JSON object about a single movie selcted by the user via title
app.get('/Movies/:Title', passport.authenticate('jwt', { session:false}), function(req, res)  {
  Movies.findOne({
    Title: req.params.Title
  })
  .then(movie => {
    res.json(movie)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});
  



// Return the genre description by name
app.get('/Genre/:Name', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.findOne({
    'Genre.Name' : req.params.Name
  })
  .then(obj => {
    res.json(obj.Genre)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});
  

//Return text response about a director (bio, birth year, death year) that was selected by the user by name
app.get('/Director/:Name', passport.authenticate('jwt', { session:false}), function(req, res) {
  Movies.findOne({
    'Director.Name' : req.params.Name
})
.then(item => {
  res.json(item.Director)
})
.catch(err => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
});
  

  

//Allows new users to register
app.post('/Users', function (req, res)  {
  Users.findOne({
    Username : req.body.Username
  })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user)})
      .catch(function(error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Allows users to update user info
/* We'll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
} */
app.put('/users/:Username', passport.authenticate('jwt', { session:false}), function(req, res) {
  Users.findOneAndUpdate({
    Username: req.params.Username
  }, {$set :
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday

      }},
      {new: true}, //This line makes sure that the updated document is returned
      function(err, updatedUser) {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser)
        }
      })
    });



//Allows users to add a movie to their list of favorites
app.post('/Users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username : req.params.Username},
   {
    $push: {FavoriteMovies: req.params.MovieID}
   },
  {new: true},
  function(err, updatedUser) {
    if (err) { 
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
    })
  });

//Allow users to remove a movie from their list of favorites
app.delete('/Users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $pull: {FavoriteMovies: req.params.MovieID}
  },
  {new: true},
  function (err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser)
    }
  })
 
});


//Allows existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session:false}), function (req, res) {
  Users.findOneAndUpdate({Username: req.params.Username})
  .then(user => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found.');
    } else {
      res.status(200).send(req.params.Username + ' was successfully deleted.');
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Error: ' + err);
    })
});







app.listen(8080);

console.log('yup');
