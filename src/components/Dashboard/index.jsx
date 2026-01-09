import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Eye, Filter } from 'lucide-react';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Step 4: List Jobs API
  const fetchJobs = async () => {
    let url = 'https://job-scheduler-backend-fkyd.onrender.com/'; // Adjust if you use /api/jobs
    
    // Step 9: Filter Logic
    const params = new URLSearchParams();
    if (statusFilter) params.append('status', statusFilter);
    if (priorityFilter) params.append('priority', priorityFilter);
    
    if (params.toString()) url += `?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, priorityFilter]);

  // Step 6 & 10: Run Job Logic
  const handleRunJob = async (id) => {
    try {
      // Optimistic UI update: Set to running immediately
      setJobs(jobs.map(job => job.id === id ? { ...job, status: 'running' } : job));

      const response = await fetch(`https://job-scheduler-backend-fkyd.onrender.com/run-job/${id}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        // Re-fetch to see "completed" status after the backend delay
        setTimeout(fetchJobs, 3500); // Wait slightly longer than backend 3s delay
      }
    } catch (error) {
      console.error('Error running job:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'running': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Job Dashboard</h2>
        
        {/* Filters */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white p-2 rounded border">
            <Filter size={16} className="text-gray-400"/>
            <select 
              className="outline-none text-sm bg-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded border">
            <Filter size={16} className="text-gray-400"/>
            <select 
              className="outline-none text-sm bg-transparent"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Task Name</th>
              <th className="p-4 font-semibold text-gray-600">Priority</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan="5" className="p-6 text-center text-gray-500">No jobs found.</td></tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-500">#{job.id}</td>
                  <td className="p-4 font-medium">{job.taskName}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold 
                      ${job.priority === 'High' ? 'bg-red-100 text-red-700' : 
                        job.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getStatusColor(job.status)} uppercase`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    {/* View Details Button */}
                    <Link to={`/jobs/${job.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <Eye size={18} />
                    </Link>

                    {/* Run Job Button - Only if Pending */}
                    {job.status === 'pending' && (
                      <button 
                        onClick={() => handleRunJob(job.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded flex items-center gap-1 text-sm font-semibold"
                        title="Run Job"
                      >
                        <Play size={18} /> Run
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;