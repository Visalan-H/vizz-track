import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';

const features = [
  {
    icon: '📝',
    title: 'Track Applications',
    description: 'Keep all your job applications organized in one place with company details, job titles, and application dates.'
  },
  {
    icon: '📊',
    title: 'Status Management',
    description: 'Update and filter applications by status: Applied, Interview, Offer, or Rejected. Stay on top of your progress.'
  },
  {
    icon: '✅',
    title: 'Real-time Validation',
    description: 'Input validation on both frontend and backend ensures your data is always accurate and complete.'
  },
  {
    icon: '🎉',
    title: 'Celebrate Offers',
    description: 'Get a confetti celebration when you land that job offer! We make success feel special.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your data is protected with JWT authentication. Only you can access your job applications.'
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Access your applications from any device. Perfect experience on mobile, tablet, and desktop.'
  }
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center space-y-6 mb-16 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">VizzTrack</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your personal job application tracker. Organize, manage, and celebrate your career journey with ease.
          </p>
          <div className="pt-4 flex gap-4 justify-center flex-wrap">
            <Link to="/jobs">
              <Button size="lg" className="cursor-pointer px-8 h-12 text-base">
                Get Started
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="cursor-pointer px-8 h-12 text-base">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to organize your job search?</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Join VizzTrack today and take control of your career journey!
          </p>
          <div className="pt-4">
            <Link to="/signup">
              <Button size="lg" className="cursor-pointer px-10 h-12 text-base">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
