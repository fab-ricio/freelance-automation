import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import Hero from './components/Hero';



function App() {
  return (
    <>
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      <Hero />
      <Home />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      <DarkModeToggle />
      </div>
    </>
  );
}

export default App;
