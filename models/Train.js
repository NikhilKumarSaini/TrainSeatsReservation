const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  number: Number,
  isBooked: { type: Boolean, default: false }
});

const trainSchema = new mongoose.Schema({
  name: String,
  seats: [seatSchema]
});

module.exports = mongoose.model('Train', trainSchema);