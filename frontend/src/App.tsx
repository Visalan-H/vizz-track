import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';
import Jobs from '@/pages/Jobs';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App