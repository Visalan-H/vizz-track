export interface JobFormData {
    companyName: string;
    jobTitle: string;
    applicationDate: string;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
}

export interface ValidationErrors {
    companyName?: string;
    jobTitle?: string;
    applicationDate?: string;
    status?: string;
}

export const validateCompanyName = (value: string): string | undefined => {
    if (!value.trim()) {
        return 'Company name is required';
    }
    if (value.trim().length < 3) {
        return 'Company name must be at least 3 characters';
    }
    return undefined;
};

export const validateJobTitle = (value: string): string | undefined => {
    if (!value.trim()) {
        return 'Job title is required';
    }
    return undefined;
};

export const validateApplicationDate = (value: string): string | undefined => {
    if (!value) {
        return 'Application date is required';
    }

    const appDate = new Date(value);
    if (isNaN(appDate.getTime())) {
        return 'Invalid date format';
    }

    // Set today to end of day to allow today's date
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    // Reset appDate time to start of day for fair comparison
    appDate.setHours(0, 0, 0, 0);

    // Compare using Unix timestamps (milliseconds)
    if (appDate.getTime() > today.getTime()) {
        return 'Application date cannot be in the future';
    }

    return undefined;
};

export const validateStatus = (value: string): string | undefined => {
    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(value)) {
        return 'Please select a valid status';
    }
    return undefined;
};

export const validateJobForm = (formData: JobFormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    const companyNameError = validateCompanyName(formData.companyName);
    if (companyNameError) errors.companyName = companyNameError;

    const jobTitleError = validateJobTitle(formData.jobTitle);
    if (jobTitleError) errors.jobTitle = jobTitleError;

    const applicationDateError = validateApplicationDate(formData.applicationDate);
    if (applicationDateError) errors.applicationDate = applicationDateError;

    const statusError = validateStatus(formData.status);
    if (statusError) errors.status = statusError;

    return errors;
};
