const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments } = require('../controllers/appointmentController');

// The auth middleware will be applied to all routes in this file
router.route('/').post(createAppointment).get(getUserAppointments);

module.exports = router;