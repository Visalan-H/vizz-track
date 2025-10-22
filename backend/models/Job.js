const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
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
        enum: ['applied', 'interviewing', 'offered', 'rejected'],
        default: 'applied'
    }

});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
