import { useState } from 'react';
import type { ChangeEvent } from 'react';

type ValidationFunction = (value: string) => string | undefined;
type ValidationSchema<T> = Partial<Record<keyof T, ValidationFunction>>;

interface UseFormOptions<T> {
    initialValues: T;
    validationSchema?: ValidationSchema<T>;
    onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, unknown>>({
    initialValues,
    validationSchema = {},
    onSubmit
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if validation schema exists
        if (validationSchema[name as keyof T]) {
            const validator = validationSchema[name as keyof T];
            const error = validator ? validator(String(value)) : undefined;

            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleSelectChange = (name: keyof T, value: string | number | boolean) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change if validation schema exists
        if (validationSchema[name]) {
            const validator = validationSchema[name];
            const error = validator ? validator(String(value)) : undefined;

            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        Object.keys(validationSchema).forEach((key) => {
            const fieldName = key as keyof T;
            const validator = validationSchema[fieldName];

            if (validator) {
                const error = validator(String(values[fieldName]));
                if (error) {
                    newErrors[fieldName] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        const isValid = validateForm();

        if (!isValid) {
            return { success: false, errors };
        }

        if (onSubmit) {
            setIsSubmitting(true);
            try {
                await onSubmit(values);
                return { success: true, errors: {} };
            } finally {
                setIsSubmitting(false);
            }
        }

        return { success: true, errors: {} };
    };

    const resetForm = (newValues?: T) => {
        setValues(newValues || initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    };

    const setFieldValue = (name: keyof T, value: string | number | boolean) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const setFieldError = (name: keyof T, error: string | undefined) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
        setFieldError,
        setValues,
        validateForm
    };
}
