const Train = require('../models/Train');

exports.getHomePage = async (req, res) => {
  const train = await Train.findOne();
  res.render('home', { train });
};

exports.bookSeats = async (req, res) => {
  const numSeats = parseInt(req.body.seats);
  const train = await Train.findOne();

  if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
    return res.render('home', { train, error: 'Please enter a valid number of seats (1-7).' });
  }

  const availableSeats = train.seats.filter(seat => !seat.isBooked);

  if (availableSeats.length < numSeats) {
    return res.render('home', { train, error: 'Not enough seats available.' });
  }

  // Randomly select seats
  const bookedSeats = [];
  for (let i = 0; i < numSeats; i++) {
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const selectedSeat = availableSeats.splice(randomIndex, 1)[0];
    selectedSeat.isBooked = true;
    bookedSeats.push(selectedSeat);
  }

  await train.save();

  res.render('home', { train, message: `Booked seats: ${bookedSeats.map(seat => seat.number).join(', ')}` });
};

exports.resetSeats = async (req, res) => {
  const train = await Train.findOne();
  train.seats.forEach(seat => seat.isBooked = false);
  await train.save();
  res.redirect('/');
};