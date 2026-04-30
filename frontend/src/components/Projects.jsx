import React from 'react';

const Projects = ({ data }) => {
  const projects = data && data.length > 0 ? data : [];

  return (
    <section id="projects" className="section bg-white/5">
      <div className="container">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl">Featured <br /> <span className="accent-text">Projects.</span></h2>
          <a href="https://github.com/MAHMUDHASANSADI" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest border-b border-accent pb-1 hover:text-accent">
            View Github
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group glass p-8">
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-4 block">
                {project.category}
              </span>
              <h3 className="text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {project.title}
              </h3>
              <p className="mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {(project.stack || []).map((s, si) => (
                  <span key={si} className="text-[10px] font-mono text-muted">
                    #{s.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
