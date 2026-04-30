import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { getPortfolioData } from './api';

function Home() {
  const [data, setData] = useState({
    skills: [],
    experiences: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPortfolioData();
      if (result) {
        setData(result);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <About />
      <Skills data={data.skills} />
      <Experience data={data.experiences} />
      <Projects data={data.projects} />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
