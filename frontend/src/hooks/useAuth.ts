import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@/services/api';
import { toast } from 'sonner';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Check authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);
                await api.get('/auth/me');
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [location.pathname]);

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setIsAuthenticated(false);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch {
            // Even if logout fails, redirect to login
            setIsAuthenticated(false);
            navigate('/login');
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await api.post('/auth/login', { email, password });
            setIsAuthenticated(true);
            toast.success('Login successful!');
            return { success: true, error: null };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || 'Login failed';
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await api.post('/auth/register', { email, password });
            setIsAuthenticated(true);
            toast.success('Account created successfully!');
            return { success: true, error: null };
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || 'Registration failed';
            toast.error(errorMsg);
            return { success: false, error: errorMsg };
        }
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    };
}
