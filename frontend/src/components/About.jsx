import React from 'react';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl mb-8">About <span className="accent-text">Me.</span></h2>
            <p className="mb-6">
              I am a passionate Software Engineer based in Dhaka, Bangladesh, with a strong foundation 
              in Computer Science and Engineering from United International University.
            </p>
            <p className="mb-8">
              My expertise lies in building robust backends with Laravel and dynamic frontends with React.js. 
              I enjoy solving complex problems, optimizing system performance, and implementing 
              scalable architectures.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl accent-text">1+</h3>
                <p className="text-xs uppercase tracking-widest font-bold text-white">Years Experience</p>
              </div>
              <div>
                <h3 className="text-2xl accent-text">10+</h3>
                <p className="text-xs uppercase tracking-widest font-bold text-white">Projects Completed</p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl"></div>
              <div className="glass p-8 relative overflow-hidden">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-xs uppercase font-bold tracking-widest">Education</span>
                    <span className="text-xs text-accent">2018 - 2024</span>
                  </div>
                  <div>
                    <h4 className="text-lg mb-1">United International University</h4>
                    <p className="text-sm">B.Sc. in Computer Science & Engineering</p>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-border pb-4 mt-4">
                    <span className="text-xs uppercase font-bold tracking-widest">Location</span>
                    <span className="text-xs text-accent">Dhaka, BD</span>
                  </div>
                  <p className="text-sm">Sector-03, Uttara, Dhaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
