import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Briefcase size={24} />
          JobScheduler
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            + New Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;