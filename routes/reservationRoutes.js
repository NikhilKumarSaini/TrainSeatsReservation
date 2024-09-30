const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getHomePage);
router.post('/book', reservationController.bookSeats);
router.post('/reset', reservationController.resetSeats);

module.exports = router;