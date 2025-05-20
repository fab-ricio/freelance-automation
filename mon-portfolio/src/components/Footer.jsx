import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full max-w-full bg-gray-800 text-white py-3 sm:py-6 px-2 sm:px-4 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-0 text-center">
      <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Ton Nom. Tous droits réservés.</p>
      <div className="space-x-2 sm:space-x-4 flex flex-row justify-center sm:justify-end">
        <a
          href="https://github.com/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
