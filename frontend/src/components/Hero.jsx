import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="container">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass border-accent/20 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Available for new opportunities</span>
        </div>

        <h1 className="text-6xl md:text-8xl mb-4 leading-[0.9]">
          MAHMUD <br />
          <span className="accent-text">HASAN.</span>
        </h1>
        
        <div className="max-w-xl mb-10">
          <p className="text-lg md:text-xl text-white mb-6 font-heading font-medium">
            Software Engineer specializing in <span className="text-accent">Full-Stack Development</span> with PHP, Laravel, and React.js.
          </p>
          <p>
            Building scalable enterprise solutions and modern web applications with a focus on performance, 
            security, and user experience. Currently working at Super Star Group.
          </p>
        </div>

        <div className="flex gap-4">
          <a href="#projects" className="btn">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Let's Talk</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
