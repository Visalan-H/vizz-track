import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { validateEmail, validatePassword } from '@/validations/authValidations';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth, useForm } from '@/hooks';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: {
      email: validateEmail,
      password: validatePassword
    }
  });

  async function onSubmit(e: React.FormEvent) {
    const result = await handleSubmit(e);
    
    if (result.success) {
      const registerResult = await register(values.email, values.password);
      if (registerResult.success) {
        navigate('/home');
      }
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <form onSubmit={onSubmit} className="w-full max-w-md space-y-6 border border-border rounded-lg p-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Join VizzTrack</h2>
            <p className="text-sm text-muted-foreground">Start tracking your job applications today</p>
        </div>

        <div className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              className={`mt-1.5 ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter a strong password"
                minLength={6}
                className={`mt-1.5 pr-10 ${errors.password ? 'border-destructive' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-foreground font-medium cursor-pointer underline-animated">
            Login
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
}
