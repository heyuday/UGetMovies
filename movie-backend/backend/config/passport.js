// backend/config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function initializePassport(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser(async (email, done) => {
    try {
      const user = await User.findOne({ email: email });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

module.exports = initializePassport;

/*
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    //User.findById(id, function (err, user) {
      //done(err, user);
    //});
    console.log(id)
  });
};*/
