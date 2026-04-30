import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProjectManager from './admin/ProjectManager';
import ExperienceManager from './admin/ExperienceManager';
import SkillManager from './admin/SkillManager';
import MessageManager from './admin/MessageManager';

// Simple Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="skills" element={<SkillManager />} />
          <Route path="messages" element={<MessageManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
