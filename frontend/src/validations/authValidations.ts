export interface AuthFormData {
    email: string;
    password: string;
}

export interface AuthValidationErrors {
    email?: string;
    password?: string;
}

export const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
        return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
    }

    return undefined;
};

export const validatePassword = (value: string): string | undefined => {
    if (!value) {
        return 'Password is required';
    }

    if (value.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return undefined;
};

export const validateAuthForm = (formData: AuthFormData): AuthValidationErrors => {
    const errors: AuthValidationErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    return errors;
};
