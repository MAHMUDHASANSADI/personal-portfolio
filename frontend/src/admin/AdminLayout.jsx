import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Code, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-8 flex flex-col gap-12">
        <div className="text-xl font-extrabold tracking-tighter">
          ADMIN<span className="accent-text">.</span>
        </div>
        
        <nav className="flex flex-col gap-4 flex-grow">
          <Link to="/admin" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent">
            <Briefcase size={18} /> Projects
          </Link>
          <Link to="/admin/experience" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent">
            <Code size={18} /> Experience
          </Link>
          <Link to="/admin/skills" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent">
            <Code size={18} /> Skills
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-accent">
            <MessageSquare size={18} /> Messages
          </Link>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-red-500 mt-auto">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-grow p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
