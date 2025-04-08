import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Navbar scroll effect
    if (window.matchMedia("(min-width: 769px)").matches) {
      const handleScroll = () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 10) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('nav');
    hamburger?.addEventListener('click', () => {
      menu?.classList.toggle('active');
      if (menu?.classList.contains('active')) {
        menu.classList.remove('hidden');
        if (navbar) navbar.style.paddingBottom = '300px';
      } else if (navbar) {
        navbar.style.paddingBottom = '0';
        setTimeout(() => menu?.classList.add('hidden'), 300);
      }
    });
  }, []);

  return <Component {...pageProps} />;
}