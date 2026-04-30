import React, { useState } from 'react';
import { Mail, Phone, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { sendContactMessage } from '../api';

const Github = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl mb-8">Get In <span className="accent-text">Touch.</span></h2>
            <p className="mb-12">
              Have a project in mind or just want to say hi? Feel free to reach out. 
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 glass rounded-lg text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">Email Me</p>
                  <a href="mailto:mahmudhasansadi92@gmail.com" className="text-sm hover:text-accent transition-colors">
                    mahmudhasansadi92@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 glass rounded-lg text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">Call Me</p>
                  <a href="tel:+8801746654562" className="text-sm hover:text-accent transition-colors">
                    +880 174 665 4562
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 glass rounded-lg text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white mb-1">Location</p>
                  <p className="text-sm">Sector-03, Uttara, Dhaka</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="https://linkedin.com/in/mahmudhasansadi" target="_blank" rel="noreferrer" className="p-3 glass rounded-lg hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/MAHMUDHASANSADI" target="_blank" rel="noreferrer" className="p-3 glass rounded-lg hover:text-accent transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                  <CheckCircle size={64} className="text-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">Message Received!</h3>
                  <p className="text-muted">I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="bg-white/5 border border-border p-4 rounded-lg focus:outline-none focus:border-accent text-sm"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="bg-white/5 border border-border p-4 rounded-lg focus:outline-none focus:border-accent text-sm"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
                    <input 
                      type="text" 
                      placeholder="Project Inquiry" 
                      className="bg-white/5 border border-border p-4 rounded-lg focus:outline-none focus:border-accent text-sm"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mb-12">
                    <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
                    <textarea 
                      rows="6" 
                      placeholder="Tell me about your project..." 
                      className="bg-white/5 border border-border p-4 rounded-lg focus:outline-none focus:border-accent text-sm resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="btn w-full py-4 text-sm flex items-center justify-center gap-2">
                    {submitting ? <Loader2 size={18} className="animate-spin" /> : 'SEND MESSAGE'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
