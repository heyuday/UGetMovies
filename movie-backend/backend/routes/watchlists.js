const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Watchlist = require('../models/Watchlist');
const {ObjectId} = require('mongodb');

// Create a new watchlist
router.post('/', (req, res) => {
  const { userId, name, moviesId } = req.body;

  try {
    const watchlist = new Watchlist({ name, userId, moviesId });
    watchlist.save();
    res.send({ message: "Watchlist saved!" });
  } catch (err) {
    console.log(err)
    res.send({ message: 'Failed to create watchlist', error: err });
  }
});

router.post('/addmovies', (req, res) => {
  const { moviesId, name } = req.body;

  try {
    
    Watchlist.findOneAndUpdate({ name: name }, { moviesId: moviesId} ).then ((res) => {
      console.log(res)
    })
    
    //console.log()

    res.send({ message: "Movie added to watchlist!!" });
  } catch (err) {
    console.log(err)
    res.send({ message: 'Failed to create watchlist', error: err });
  }
});
router.post('/getwatchlists', async (req, res) => {
  const { userId } = req.body
  try {
    
    const watchlist = await Watchlist.find({ userId: userId }).exec()
    console.log( (userId))

    res.send({ watchlist });
  } catch (err) {
    console.log(err)
    res.send({ message: 'Failed to get watchlists', error: err });
  }
});

module.exports = router;
