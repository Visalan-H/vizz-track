const validateJob = (req, res, next) => {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    if (!companyName || !jobTitle || !applicationDate) {
        return res.status(400).json({
            message: 'Company name, job title, and application date are required'
        });
    }

    if (companyName.trim().length < 3) {
        return res.status(400).json({
            message: 'Company name must be at least 3 characters'
        });
    }

    if (jobTitle.trim().length === 0) {
        return res.status(400).json({
            message: 'Job title cannot be empty'
        });
    }

    const appDate = new Date(applicationDate);
    if (isNaN(appDate.getTime())) {
        return res.status(400).json({
            message: 'Invalid date format'
        });
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    appDate.setHours(0, 0, 0, 0);

    if (appDate.getTime() > today.getTime()) {
        return res.status(400).json({
            message: 'Application date cannot be in the future'
        });
    }

    if (status) {
        const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Status must be one of: Applied, Interview, Offer, Rejected'
            });
        }
    }

    next();
};

const validateJobUpdate = (req, res, next) => {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    if (!companyName && !jobTitle && !applicationDate && !status) {
        return res.status(400).json({
            message: 'At least one field must be provided for update'
        });
    }

    if (companyName && companyName.trim().length < 3) {
        return res.status(400).json({
            message: 'Company name must be at least 3 characters'
        });
    }

    if (jobTitle && jobTitle.trim().length === 0) {
        return res.status(400).json({
            message: 'Job title cannot be empty'
        });
    }

    if (applicationDate) {
        const appDate = new Date(applicationDate);

        if (isNaN(appDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid date format'
            });
        }

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        appDate.setHours(0, 0, 0, 0);

        if (appDate.getTime() > today.getTime()) {
            return res.status(400).json({
                message: 'Application date cannot be in the future'
            });
        }
    }


    if (status) {
        const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Status must be one of: Applied, Interview, Offer, Rejected'
            });
        }
    }

    next();
};

module.exports = { validateJob, validateJobUpdate };
