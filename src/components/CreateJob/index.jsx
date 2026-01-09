import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    taskName: '',
    priority: 'Low',
    payload: '{\n  "email": "user@example.com"\n}' // Default placeholder
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend Validation for JSON
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(formData.payload);
    } catch (err) {
      setError('Invalid JSON format in Payload.');
      return;
    }

    // Step 8: Send POST request
    const jobData = {
      taskName: formData.taskName,
      priority: formData.priority,
      payload: parsedPayload // Send as object, backend will stringify or store as JSON
    };

    try {
      const response = await fetch('https://job-scheduler-backend-fkyd.onrender.com/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        navigate('/'); // Redirect to dashboard
      } else {
        setError('Failed to create job. Server error.');
      }
    } catch (err) {
      setError('Connection refused. Is backend running?');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Job</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Task Name</label>
          <input 
            type="text"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Send Monthly Report"
            value={formData.taskName}
            onChange={(e) => setFormData({...formData, taskName: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
          <select 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Payload (JSON)</label>
          <textarea 
            rows="5"
            className="w-full px-3 py-2 border rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.payload}
            onChange={(e) => setFormData({...formData, payload: e.target.value})}
          ></textarea>
          <p className="text-xs text-gray-500 mt-1">Must be valid JSON format.</p>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
          >
            Create Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;