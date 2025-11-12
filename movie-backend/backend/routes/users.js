// backend/routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    return done(null, false, { message: 'Fill out all the forms please' });
  }

  else if(password !== password2) {
    return done(null, false, { message: 'The Passwords are not the same' });
  }

  else if(password.length < 6) {
    return done(null, false, { message: 'The password should be longer than 6 characters' });
  }


  else{

    User.findOne({ email }).then(user => {
      if (user) {
        return done(null, false, { message: 'The email is already registered' });
        return res.send({
          message: "Email is already there!"
        });
      }
      else{
        const newUser = new User({
          name,
          email,
          password,
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
            res.send({
              message: "User registered successfully!"
            });
          });
        });
      }
    });
  }
}); 

// Login

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});
  



/*
// JWT Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.status(400).json({ message: 'No User Exists' });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;

        const token = jwt.sign({ id: user.id, name: user.name }, keys.secretOrKey, {
          expiresIn: 3600, // 1 hour
        });

        return res.json({ token, user: { name: user.name, email: user.email } });
      });
    }
  })(req, res, next);
});
*/

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if(err){
      return res.status(500).json({ message: 'Logout failed.' });
    }

    res.status(200).json({ message: 'Logged out successfully.' });
  });
  //req.flash('success_msg', 'You are logged out');
  //res.redirect('/users/login');
});

module.exports = router;
