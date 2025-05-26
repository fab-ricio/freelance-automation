import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full max-w-full bg-gradient-to-br from-[#3b4cca] to-[#60a5fa] dark:bg-gradient-to-br dark:from-[#232b4e]/90 dark:via-[#232b4e]/80 dark:to-[#3b82f6]/80 text-[#e0e7ff] dark:text-blue-100 py-6 px-2 sm:px-8 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-4 sm:gap-0 text-center shadow-[0_0_16px_#818cf833] border-t border-blue-400/20 relative overflow-hidden z-50" style={{backdropFilter:'blur(4px)'}}>
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-[#facc15]/10 via-[#818cf8]/20 to-[#60a5fa]/0 blur-[1px] opacity-40 rounded-full pointer-events-none select-none z-0 dark:from-[#818cf8]/40 dark:via-[#facc15]/20 dark:to-[#3b82f6]/0 dark:opacity-60" aria-hidden="true" />
      {/* Glass effect + gradients */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 w-2/3 h-24 bg-gradient-to-r from-[#818cf8]/5 via-[#facc15]/2 to-transparent blur-md opacity-10 -translate-x-1/2 dark:from-[#818cf8]/20 dark:via-[#facc15]/5 dark:opacity-30" />
        <div className="absolute right-0 bottom-0 w-1/3 h-16 bg-gradient-to-l from-[#60a5fa]/5 to-transparent blur-md opacity-5 dark:from-[#3b82f6]/15 dark:opacity-20" />
      </div>
      {/* Infos légales & contact */}
      <div className="z-20 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[#e0e7ff]/90 dark:text-blue-100/90 font-light">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
          <span className="tracking-wide font-semibold">&copy; {new Date().getFullYear()} Fabricio</span>
        </span>
        <span className="hidden sm:inline text-blue-300/40">|</span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#facc15] opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25V6.75A2.25 2.25 0 0 0 18.75 4.5h-13.5A2.25 2.25 0 0 0 3 6.75v10.5A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25l-9 6.75-9-6.75" /></svg>
          <a href="mailto:elysefabricio003@gmail.com" className="underline hover:text-[#facc15] transition">elysefabricio003@gmail.com</a>
        </span>
        <span className="hidden sm:inline text-blue-300/40">|</span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#60a5fa] opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.243 1.007-2.25 2.25-2.25h2.25c.966 0 1.797.63 2.09 1.553l.72 2.16a2.25 2.25 0 0 1-.516 2.34l-1.08 1.08a15.045 15.045 0 0 0 6.36 6.36l1.08-1.08a2.25 2.25 0 0 1 2.34-.516l2.16.72A2.25 2.25 0 0 1 19.5 17.25v2.25a2.25 2.25 0 0 1-2.25 2.25C7.798 21.75 2.25 16.202 2.25 9.75z" /></svg>
          <a href="tel:+33612345678" className="underline hover:text-[#facc15] transition">068 00 754 77</a>
        </span>
      </div>
      {/* Réseaux sociaux */}
      <div className="space-x-3 flex flex-row justify-center sm:justify-end z-20">
        {/* GitHub */}
        <a
          href="https://github.com/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#232b4e] via-[#3b82f6] to-[#818cf8] shadow-md border border-blue-400/40 hover:from-[#818cf8] hover:to-[#60a5fa] hover:text-[#facc15] transition-all duration-300 group ring-1 ring-[#818cf8]/30"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-100 group-hover:text-[#facc15]">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.29 9.29 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#818cf8] via-[#facc15] to-[#60a5fa] shadow-md border border-blue-300/40 hover:from-[#facc15] hover:to-[#818cf8] hover:text-[#232b4e] transition-all duration-300 group ring-1 ring-[#facc15]/20"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-900 group-hover:text-[#232b4e]">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
          </svg>
        </a>
        {/* Facebook */}
        <a
          href="https://facebook.com/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#1877f2] via-[#3b4cca] to-[#60a5fa] shadow-md border border-blue-300/40 hover:from-[#60a5fa] hover:to-[#1877f2] hover:text-[#facc15] transition-all duration-300 group ring-1 ring-[#1877f2]/20"
          aria-label="Facebook"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-100 group-hover:text-[#facc15]"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
        </a>
        {/* WhatsApp */}
        <a
          href="https://wa.me/33612345678"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#25d366] via-[#3b4cca] to-[#60a5fa] shadow-md border border-green-300/40 hover:from-[#60a5fa] hover:to-[#25d366] hover:text-[#facc15] transition-all duration-300 group ring-1 ring-[#25d366]/20"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-green-50 group-hover:text-[#facc15]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.366.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05.001C5.495.001.001 5.495.001 12.049c0 2.124.553 4.199 1.601 6.032L.057 23.925a1.001 1.001 0 0 0 1.225 1.225l5.874-1.545a11.96 11.96 0 0 0 4.894 1.084h.005c6.554 0 11.948-5.494 11.949-12.049a11.89 11.89 0 0 0-3.489-8.477"/></svg>
        </a>
        {/* Instagram */}
        <a
          href="https://instagram.com/tonprofil"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#fd5] via-[#c13584] to-[#3b4cca] shadow-md border border-pink-300/40 hover:from-[#c13584] hover:to-[#fd5] hover:text-[#facc15] transition-all duration-300 group ring-1 ring-[#c13584]/20"
          aria-label="Instagram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-pink-50 group-hover:text-[#facc15]"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.775.13 4.602.402 3.635 1.37c-.967.967-1.24 2.14-1.298 3.417C2.014 5.668 2 6.077 2 12c0 5.923.014 6.332.072 7.613.058 1.277.331 2.45 1.298 3.417.967.967 2.14 1.24 3.417 1.298C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.45-.331 3.417-1.298.967-.967 1.24-2.14 1.298-3.417.058-1.281.072-1.69.072-7.613 0-5.923-.014-6.332-.072-7.613-.058-1.277-.331-2.45-1.298-3.417-.967-.967-2.14-1.24-3.417-1.298C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
