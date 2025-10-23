const Job = require('../models/Job');

const createJob = async (req, res) => {
    try {
        const { companyName, jobTitle, applicationDate, status } = req.body;
        const userId = req.user.id;

        const newJob = new Job({
            user: userId,
            companyName,
            jobTitle,
            applicationDate,
            status: status || 'Applied'
        });

        await newJob.save();
        res.status(201).json({
            message: 'Job application created successfully',
            job: newJob
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Get all jobs error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getJobById = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;    

        const job = await Job.findOne({ _id: jobId, user: userId });

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Get job by ID error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;
        const { companyName, jobTitle, applicationDate, status } = req.body;

        const job = await Job.findOne({ _id: jobId, user: userId });

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        if (companyName) job.companyName = companyName;
        if (jobTitle) job.jobTitle = jobTitle;
        if (applicationDate) job.applicationDate = applicationDate;
        if (status) job.status = status;

        await job.save();
        res.status(200).json({
            message: 'Job application updated successfully',
            job
        });
    } catch (error) {
        console.error('Update job error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        const job = await Job.findOneAndDelete({ _id: jobId, user: userId });

        if (!job) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        res.status(200).json({ message: 'Job application deleted successfully' });
    } catch (error) {
        console.error('Delete job error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};