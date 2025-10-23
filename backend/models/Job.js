const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true,
        minlength: 3,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    applicationDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Application date cannot be in the future.'
        }
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied'
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
