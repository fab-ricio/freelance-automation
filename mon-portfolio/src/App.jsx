import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle.tsx';
import StickyDarkModeHelper from './components/StickyDarkModeHelper';

function App() {
  return (
    <>
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Header />
      <Main />
      <Footer />
      <DarkModeToggle />
      <StickyDarkModeHelper />
      </div>
    </>
  );
}

export default App;
