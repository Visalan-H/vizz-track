import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export interface Job {
    _id: string;
    companyName: string;
    jobTitle: string;
    applicationDate: string;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
    createdAt: string;
}

interface JobFormData {
    companyName: string;
    jobTitle: string;
    applicationDate: string;
    status: Job['status'];
}

export function useJobCRUD() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await api.get('/jobs');
            setJobs(response.data);
            return { success: true, data: response.data };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string }; status?: number } };
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.message || 'Failed to load job applications');
            }
            return { success: false, data: [] };
        } finally {
            setLoading(false);
        }
    };

    const createJob = async (data: JobFormData) => {
        try {
            setLoading(true);
            const response = await api.post('/jobs', data);
            setJobs(prev => [...prev, response.data]);

            if (data.status === 'Offer') {
                toast.success('Congratulations on your job offer! 🎉');
                setTimeout(() => triggerConfetti(), 300);
            } else if (data.status === 'Interview') {
                toast.success('Interview application created! Good luck! 🍀');
            } else {
                toast.success('Job application created successfully!');
            }

            await fetchJobs();
            return { success: true };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || 'Failed to create job';
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const updateJob = async (id: string, data: JobFormData, oldStatus?: string) => {
        try {
            setLoading(true);
            const response = await api.put(`/jobs/${id}`, data);
            setJobs(prev => prev.map(job => job._id === id ? response.data : job));

            const statusChanged = oldStatus && oldStatus !== data.status;

            if (statusChanged) {
                switch (data.status) {
                    case 'Offer':
                        toast.success('Congratulations on your job offer! 🎉');
                        setTimeout(() => triggerConfetti(), 300);
                        break;
                    case 'Interview':
                        toast.success('Interview scheduled! Good luck! 🍀');
                        break;
                    case 'Rejected':
                        toast('Application status updated. Keep applying!', {
                            description: 'Every rejection brings you closer to success.'
                        });
                        break;
                    case 'Applied':
                        toast.success('Application marked as Applied!');
                        break;
                    default:
                        toast.success('Job application updated successfully!');
                }
            } else {
                toast.success('Job application updated successfully!');
            }

            await fetchJobs();
            return { success: true };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || 'Failed to update job';
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (id: string) => {
        try {
            await api.delete(`/jobs/${id}`);
            toast.success('Job application deleted successfully!');
            await fetchJobs();
            return { success: true };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || 'Failed to delete job');
            return { success: false };
        }
    };

    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 9999
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        jobs,
        loading,
        fetchJobs,
        createJob,
        updateJob,
        deleteJob,
        triggerConfetti
    };
}
