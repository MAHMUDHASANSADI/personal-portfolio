import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', {
        email,
        password,
        device_name: 'browser'
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err) {
      setError('The provided credentials do not match our records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md px-6 z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-4 glass rounded-2xl mb-6 border-accent/20">
            <Lock size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tighter mb-2">WELCOME <span className="accent-text">BACK</span></h1>
          <p className="text-xs uppercase tracking-widest text-muted font-bold">Admin Portal Access</p>
        </div>

        <div className="glass p-8 md:p-10 border-white/10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold tracking-widest p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl focus:border-accent outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="admin@portfolio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl focus:border-accent outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn w-full py-4 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : 'AUTHENTICATE'}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-[10px] uppercase tracking-widest text-muted font-bold">
          Secure Environment &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Login;
