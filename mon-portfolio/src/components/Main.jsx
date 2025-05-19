import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Services from './Services';
import Contact from './Contact';

export default function Main() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
