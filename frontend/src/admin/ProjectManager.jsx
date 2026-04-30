import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, X, Loader2 } from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    stack: '',
    link: '',
    github_link: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/projects', { headers });
      setProjects(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = {
      ...formData,
      stack: formData.stack.split(',').map(s => s.trim())
    };

    try {
      if (editingProject) {
        await axios.put(`http://localhost:8000/api/v1/admin/projects/${editingProject.id}`, data, { headers });
      } else {
        await axios.post('http://localhost:8000/api/v1/admin/projects', data, { headers });
      }
      await fetchProjects();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/admin/projects/${id}`, { headers });
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        stack: project.stack.join(', '),
        link: project.link || '',
        github_link: project.github_link || ''
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', category: '', description: '', stack: '', link: '', github_link: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-2 uppercase">Projects <span className="accent-text">Vault</span></h1>
          <p className="text-xs uppercase tracking-widest text-muted font-bold">Manage your portfolio showcase</p>
        </div>
        <button onClick={() => openModal()} className="btn flex items-center gap-2 px-6">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="glass overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Project Info</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Category</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Stack</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <Loader2 className="animate-spin inline-block text-accent mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">Loading your work...</p>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">No projects found. Add your first one!</p>
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-sm">{project.title}</div>
                    <div className="text-[10px] text-muted mt-1">{project.description}</div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] uppercase font-bold px-2 py-1 bg-accent/10 text-accent rounded">
                      {project.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[9px] font-mono text-muted">#{s}</span>
                      ))}
                      {project.stack.length > 3 && <span className="text-[9px] font-mono text-muted">+{project.stack.length - 3}</span>}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(project)} className="p-2 glass hover:border-accent/50 text-muted hover:text-accent transition-all">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="p-2 glass hover:border-red-500/50 text-muted hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#000]/90 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="modal-content w-full max-w-2xl border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-extrabold tracking-tighter uppercase">
                {editingProject ? 'Edit' : 'Create'} <span className="accent-text">Project</span>
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Project Title</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Category</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Description</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm h-24 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Stack (Comma separated)</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    placeholder="React, Laravel, MySQL"
                    value={formData.stack}
                    onChange={e => setFormData({...formData, stack: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={submitting} className="btn flex-grow py-4 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : 'SAVE PROJECT'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary px-8">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
