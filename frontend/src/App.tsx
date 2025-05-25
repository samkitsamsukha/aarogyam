import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DonorPage from "./pages/DonorPage";
import RecipientPage from "./pages/RecipientPage";
import { Toaster } from "sonner";
import DonarOnboard from "./pages/DonarOnboard";
import RecipientOnboard from "./pages/RecipientOnboard";
import RecipientQueue from "./pages/RecipientQueue";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/donor-dashboard" element={<DonorPage />} />
          <Route path="/recipient-dashboard" element={<RecipientPage />} />
          <Route path="/donor-onboard" element={<DonarOnboard />} />
          <Route path="/recipient-onboard" element={<RecipientOnboard />} />
          <Route path="/recipient-queue" element={<RecipientQueue />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
