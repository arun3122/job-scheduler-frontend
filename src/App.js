import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateJob from './components/CreateJob';
import JobDetail from './components/JobDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <div className="container mx-auto p-4 max-w-5xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateJob />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;