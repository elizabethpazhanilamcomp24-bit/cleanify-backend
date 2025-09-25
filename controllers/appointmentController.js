const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        // We get the userId from the auth middleware
        req.body.user = req.user.userId;

        const appointment = await Appointment.create(req.body);
        res.status(201).json({ appointment });

    } catch (error) {
        res.status(500).json({ message: "Error creating appointment", error: error.message });
    }
};

// Optional: Function to get all appointments for a logged-in user
const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.userId }).sort('createdAt');
        res.status(200).json({ appointments, count: appointments.length });
    } catch (error) {
         res.status(500).json({ message: "Error fetching appointments", error: error.message });
    }
};


module.exports = {
    createAppointment,
    getUserAppointments
};