import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Home from '@/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App