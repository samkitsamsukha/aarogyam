import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DonorPage from './pages/DonorPage';
import RecipientPage from './pages/RecipientPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/donor-dashboard" element={<DonorPage />} />
        <Route path="/recipient-dashboard" element={<RecipientPage />} />
      </Routes>
    </Router>
  );
}

export default App;