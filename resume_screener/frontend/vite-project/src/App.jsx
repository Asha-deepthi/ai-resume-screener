import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateUpload from './pages/CandidateUpload';
import HRLogin from './pages/HRLogin';
import HRSignup from './pages/HRSignup';
import HRDashboard from './pages/HRDashboard';
import HRJobPost from './pages/HRJobPost';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateUpload />} />
        <Route path="/hr/login" element={<HRLogin />} />
        <Route path="/hr/signup" element={<HRSignup />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/post-job" element={<HRJobPost/>} />
      </Routes>
    </Router>
  );
}
