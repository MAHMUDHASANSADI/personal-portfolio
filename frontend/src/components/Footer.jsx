import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-extrabold tracking-tighter">
          MH<span className="accent-text">.</span>
        </div>
        
        <p className="text-xs">
          &copy; {new Date().getFullYear()} Mahmud Hasan. All rights reserved.
        </p>
        
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-accent">Twitter</a>
          <a href="#" className="hover:text-accent">Dribbble</a>
          <a href="#" className="hover:text-accent">Behance</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
