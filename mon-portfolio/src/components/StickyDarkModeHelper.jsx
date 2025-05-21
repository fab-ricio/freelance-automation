// Ajoute ce script dans App.jsx ou Main.jsx pour effet sticky intelligent sur le bouton dark mode
import { useEffect } from 'react';

export default function StickyDarkModeHelper() {
  useEffect(() => {
    const btn = document.getElementById('darkmode-toggle-btn');
    const footer = document.querySelector('footer');
    if (!btn || !footer) return;
    function onScroll() {
      const footerRect = footer.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Si le footer est visible, on "remonte" le bouton
      if (footerRect.top < windowH - 60) {
        btn.style.transform = 'translateY(-60px) scale(1.18)';
      } else {
        btn.style.transform = 'translateY(0) scale(1)';
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
