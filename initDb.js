const mongoose = require('mongoose');
const Train = require('./models/Train');
require('dotenv').config();

async function initDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Train.deleteMany({});

    const seats = Array.from({ length: 80 }, (_, i) => ({
      number: i + 1,
      isBooked: false
    }));

    const train = new Train({
      name: 'Express Train',
      seats: seats
    });

    await train.save();
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

initDb();