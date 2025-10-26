import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">VizzTrack</h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button 
                    variant={location.pathname === '/login' ? 'default' : 'outline'}
                    className="cursor-pointer text-sm sm:text-base px-4 sm:px-5 h-9 sm:h-10"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant={location.pathname === '/signup' ? 'default' : 'outline'}
                    className="cursor-pointer text-sm sm:text-base px-4 sm:px-5 h-9 sm:h-10"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/jobs">
                  <Button 
                    variant={location.pathname === '/jobs' ? 'default' : 'outline'}
                    className="cursor-pointer text-sm sm:text-base px-4 sm:px-5 h-9 sm:h-10"
                  >
                    Jobs
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="cursor-pointer text-sm sm:text-base px-4 sm:px-5 h-9 sm:h-10"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
