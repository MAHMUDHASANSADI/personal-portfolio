import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, X, Loader2, Calendar, MapPin } from 'lucide-react';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    period: '',
    description: '',
    stack: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/experiences', { headers });
      setExperiences(response.data);
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
      if (editingExp) {
        await axios.put(`http://localhost:8000/api/v1/admin/experiences/${editingExp.id}`, data, { headers });
      } else {
        await axios.post('http://localhost:8000/api/v1/admin/experiences', data, { headers });
      }
      await fetchExperiences();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/admin/experiences/${id}`, { headers });
        fetchExperiences();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        company: exp.company,
        role: exp.role,
        period: exp.period,
        description: exp.description,
        stack: exp.stack.join(', ')
      });
    } else {
      setEditingExp(null);
      setFormData({ company: '', role: '', period: '', description: '', stack: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingExp(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-2 uppercase">Work <span className="accent-text">Timeline</span></h1>
          <p className="text-xs uppercase tracking-widest text-muted font-bold">Manage your professional career</p>
        </div>
        <button onClick={() => openModal()} className="btn flex items-center gap-2 px-6">
          <Plus size={18} /> New Experience
        </button>
      </div>

      <div className="glass overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Role & Company</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Period</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Tech used</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <Loader2 className="animate-spin inline-block text-accent mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">Fetching timeline...</p>
                </td>
              </tr>
            ) : experiences.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">No experience records found.</p>
                </td>
              </tr>
            ) : (
              experiences.map(exp => (
                <tr key={exp.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-sm">{exp.role}</div>
                    <div className="text-accent text-[10px] uppercase tracking-widest font-bold mt-1">{exp.company}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Calendar size={12} /> {exp.period}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1">
                      {exp.stack.map((s, i) => (
                        <span key={i} className="text-[9px] font-mono text-muted">#{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(exp)} className="p-2 glass hover:border-accent/50 text-muted hover:text-accent transition-all">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(exp.id)} className="p-2 glass hover:border-red-500/50 text-muted hover:text-red-500 transition-all">
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
          <div className="glass w-full max-w-2xl border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-extrabold tracking-tighter uppercase">
                {editingExp ? 'Edit' : 'Create'} <span className="accent-text">Experience</span>
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Company Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Role / Title</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Period (e.g., Jan 2024 - Present)</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.period}
                    onChange={e => setFormData({...formData, period: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Stack (Comma separated)</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    value={formData.stack}
                    onChange={e => setFormData({...formData, stack: e.target.value})}
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
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={submitting} className="btn flex-grow py-4 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : 'SAVE EXPERIENCE'}
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

export default ExperienceManager;
