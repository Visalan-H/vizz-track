// src/pages/SignUp.tsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/services/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill all fields.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', formData);
      navigate('/home');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 border border-border rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center tracking-tight">Sign Up</h2>

        {error && <p className="text-destructive text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a strong password"
              minLength={6}
              className="mt-1.5"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
