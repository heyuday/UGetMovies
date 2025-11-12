const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  moviesId: []
});


const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;
