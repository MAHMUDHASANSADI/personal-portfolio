import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, X, Loader2, Cpu } from 'lucide-react';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    skills: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/skills', { headers });
      setSkills(response.data);
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
      category: formData.category,
      skills: formData.skills.split(',').map(s => s.trim())
    };

    try {
      if (editingSkill) {
        await axios.put(`http://localhost:8000/api/v1/admin/skills/${editingSkill.id}`, data, { headers });
      } else {
        await axios.post('http://localhost:8000/api/v1/admin/skills', data, { headers });
      }
      await fetchSkills();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill category?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/admin/skills/${id}`, { headers });
        fetchSkills();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        category: skill.category,
        skills: skill.skills.join(', ')
      });
    } else {
      setEditingSkill(null);
      setFormData({ category: '', skills: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-2 uppercase">Tech <span className="accent-text">Stack</span></h1>
          <p className="text-xs uppercase tracking-widest text-muted font-bold">Manage your technical skills</p>
        </div>
        <button onClick={() => openModal()} className="btn flex items-center gap-2 px-6">
          <Plus size={18} /> New Category
        </button>
      </div>

      <div className="glass overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Category</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Skills</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-20 text-center">
                  <Loader2 className="animate-spin inline-block text-accent mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">Loading stack...</p>
                </td>
              </tr>
            ) : skills.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-20 text-center">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">No skill categories found.</p>
                </td>
              </tr>
            ) : (
              skills.map(skill => (
                <tr key={skill.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <Cpu size={14} className="text-accent" />
                      <div className="font-bold text-sm uppercase tracking-tight">{skill.category}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {skill.skills.map((s, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-muted">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(skill)} className="p-2 glass hover:border-accent/50 text-muted hover:text-accent transition-all">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="p-2 glass hover:border-red-500/50 text-muted hover:text-red-500 transition-all">
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
                {editingSkill ? 'Edit' : 'Create'} <span className="accent-text">Category</span>
              </h2>
              <button onClick={closeModal} className="text-muted hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Category Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm"
                    placeholder="e.g. Frontend, Tools, etc."
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Skills (Comma separated)</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg focus:border-accent outline-none text-sm h-32 resize-none"
                    placeholder="React, Vue, Tailwind..."
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={submitting} className="btn flex-grow py-4 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : 'SAVE SKILLS'}
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

export default SkillManager;
