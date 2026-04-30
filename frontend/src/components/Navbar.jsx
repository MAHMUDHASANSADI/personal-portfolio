import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass' : 'py-8'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="text-2xl font-extrabold tracking-tighter">
          MH<span className="accent-text">.</span>
        </a>
        
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <a href="#contact" className="btn btn-secondary py-2 px-4 text-[10px]">
          Hire Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
