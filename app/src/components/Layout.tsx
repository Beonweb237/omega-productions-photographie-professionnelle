import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Layout({ children, cartCount = 0, onCartClick }: LayoutProps) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
