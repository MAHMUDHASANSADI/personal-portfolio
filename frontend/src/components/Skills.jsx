import React from 'react';

const Skills = ({ data }) => {
  // Use data from API or fall back to defaults
  const categories = data && data.length > 0 ? data : [
    {
      category: "Languages",
      skills: ["PHP", "JavaScript", "C++", "C"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Redux", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend",
      skills: ["Laravel", "MySQL", "Rest API", "Microservices"]
    },
    {
      category: "Tools & DevOps",
      skills: ["Docker", "GitLab", "CI/CD", "Jira", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="section bg-white/5">
      <div className="container">
        <h2 className="text-4xl mb-16 text-center">Technical <span className="accent-text">Stack.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="glass p-6">
              <h3 className="text-xs uppercase tracking-widest font-bold mb-6 pb-2 border-b border-accent/30 inline-block">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <span key={si} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-border rounded">
                    {skill}
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

export default Skills;
