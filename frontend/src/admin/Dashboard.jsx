import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    skills: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        // Fetch all to get counts (simplified)
        const [projects, experiences, skills, messages] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/admin/projects', { headers }),
          axios.get('http://localhost:8000/api/v1/admin/experiences', { headers }),
          axios.get('http://localhost:8000/api/v1/admin/skills', { headers }),
          axios.get('http://localhost:8000/api/v1/admin/messages', { headers })
        ]);

        setStats({
          projects: projects.data.length,
          experiences: experiences.data.length,
          skills: skills.data.length,
          messages: messages.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl mb-8">Dashboard <span className="accent-text">Overview</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass p-8">
          <h3 className="text-xs uppercase font-bold tracking-widest mb-2">Projects</h3>
          <p className="text-4xl accent-text">{stats.projects}</p>
        </div>
        <div className="glass p-8">
          <h3 className="text-xs uppercase font-bold tracking-widest mb-2">Experience</h3>
          <p className="text-4xl accent-text">{stats.experiences}</p>
        </div>
        <div className="glass p-8">
          <h3 className="text-xs uppercase font-bold tracking-widest mb-2">Skills</h3>
          <p className="text-4xl accent-text">{stats.skills}</p>
        </div>
        <div className="glass p-8">
          <h3 className="text-xs uppercase font-bold tracking-widest mb-2">Messages</h3>
          <p className="text-4xl accent-text">{stats.messages}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
