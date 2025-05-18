import React from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';



function App() {
  return (
    <>
      <Header />
      <Home />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
      <DarkModeToggle />
    </>
  );
}

export default App;
