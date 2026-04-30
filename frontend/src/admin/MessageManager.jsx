import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Trash2, Loader2, User, MessageCircle } from 'lucide-react';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/messages', { headers });
      setMessages(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await axios.delete(`http://localhost:8000/api/v1/admin/messages/${id}`, { headers });
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold tracking-tighter mb-2 uppercase">Inquiry <span className="accent-text">Inbox</span></h1>
        <p className="text-xs uppercase tracking-widest text-muted font-bold">Messages from your contact form</p>
      </div>

      <div className="glass overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Sender</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Subject</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted">Message</th>
              <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <Loader2 className="animate-spin inline-block text-accent mb-4" size={32} />
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">Checking for messages...</p>
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-20 text-center">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted">Your inbox is empty.</p>
                </td>
              </tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 glass rounded-full text-accent"><User size={14} /></div>
                      <div>
                        <div className="font-bold text-sm">{msg.name}</div>
                        <div className="text-[10px] text-muted">{msg.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-bold text-white uppercase">{msg.subject || 'No Subject'}</td>
                  <td className="p-6 text-xs text-muted truncate">{msg.message}</td>
                  <td className="p-6 text-right">
                    <button onClick={() => handleDelete(msg.id)} className="p-2 glass hover:border-red-500/50 text-muted hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>
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

export default MessageManager;
