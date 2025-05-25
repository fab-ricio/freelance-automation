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
      const margin = 24;
      // Position par défaut (identique à la classe Tailwind bottom-24/md:bottom-32)
      let defaultBottom = window.innerWidth >= 768 ? 128 : 96; // px
      let overlap = windowH - footerRect.top;
      if (overlap > 0) {
        // On remonte le bouton juste au-dessus du footer
        btn.style.bottom = `${overlap + margin}px`;
      } else {
        btn.style.bottom = `${defaultBottom}px`;
      }
      btn.style.transform = 'scale(1)';
    }
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    // Initial
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return null;
}
