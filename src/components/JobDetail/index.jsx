import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 5: Fetch single job
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/${id}`);
        if(response.ok) {
          const data = await response.json();
          setJob(data);
        }
      } catch (error) {
        console.error('Error fetching job details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!job) return <div className="text-center mt-10 text-red-500">Job not found</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Link to="/" className="flex items-center text-gray-500 hover:text-blue-600 mb-4">
        <ArrowLeft size={16} className="mr-1"/> Back to Dashboard
      </Link>

      <div className="bg-white shadow rounded-lg overflow-hidden border">
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Job #{job.id}: {job.taskName}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase 
            ${job.status === 'completed' ? 'bg-green-100 text-green-700' : 
              job.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {job.status}
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Priority</label>
              <p className="text-gray-800 font-medium">{job.priority}</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase">Created At</label>
              {/* Assuming backend sends standard timestamp */}
              <p className="text-gray-800">{new Date(job.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Payload Data</label>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>
                {/* Step 11: Pretty print JSON */}
                {JSON.stringify(typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;