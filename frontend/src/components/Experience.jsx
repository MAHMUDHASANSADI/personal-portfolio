import React from 'react';

const Experience = ({ data }) => {
  const experiences = data && data.length > 0 ? data : [];

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="text-4xl mb-16">Work <span className="accent-text">History.</span></h2>
        
        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l border-border">
              <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] bg-accent rounded-full"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-accent text-sm font-bold uppercase tracking-widest">{exp.company}</p>
                </div>
                <span className="text-xs font-mono bg-white/5 px-3 py-1 rounded-full border border-border">
                  {exp.period}
                </span>
              </div>
              
              <p className="mb-6 max-w-3xl">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {(exp.stack || []).map((s, si) => (
                  <span key={si} className="text-[10px] uppercase font-bold text-muted border border-border px-2 py-0.5 rounded">
                    {s}
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

export default Experience;
