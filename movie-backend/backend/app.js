// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./config/passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
initializePassport(passport)
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require('./config/passport')(passport);
require('./config/jwt')(passport);

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/watchlists', require('./routes/watchlists'))


const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
