const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceType: {
        type: String,
        required: true,
        enum: [
            'drainage_pipe_cleaning',
            'sewer_blockage_removal',
            'regular_maintenance',
            'garbage_disposal'
        ]
    },
    address: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    scheduledAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);