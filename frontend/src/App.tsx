import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import DonorRegistration from './pages/DonorRegistration';
import RecipientRegistration from './pages/RecipientRegistration';
import Queue from './pages/Queue';
import Admin from './pages/Admin';
import { Web3Provider } from './context/Web3Context';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            <Route path="/recipient-registration" element={<RecipientRegistration />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Toaster position="top-right" />
        </Layout>
      </Router>
    </Web3Provider>
  );
}

export default App;