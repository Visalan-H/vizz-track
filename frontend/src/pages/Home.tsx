// src/pages/Home.tsx

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome Home</h1>
        <p className="text-muted-foreground text-lg">
          You are successfully logged in.
        </p>
        <div className="pt-4">
          <Link to="/login">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
