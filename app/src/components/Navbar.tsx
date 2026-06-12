import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Boutique', path: '/boutique' },
  { label: '\u00C0 Propos', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-500',
          scrolled
            ? 'bg-[rgba(10,10,12,0.92)] backdrop-blur-md border-b border-[rgba(245,240,235,0.06)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="w-full flex items-center justify-between px-8 lg:px-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-body font-semibold text-sm tracking-[0.2em] uppercase text-text-primary hover:text-accent transition-colors duration-300"
          >
            OMEGA PRODUCTIONS
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative font-body text-label uppercase tracking-[0.1em] transition-colors duration-300 group',
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300',
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-bg-primary text-[10px] font-semibold rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Button - Desktop */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center justify-center px-6 py-3 border border-accent text-accent font-body text-label uppercase tracking-[0.1em] transition-all duration-300 hover:bg-accent hover:text-bg-primary"
            >
              Réserver
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-primary"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-overlay-dark"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute top-0 right-0 w-full max-w-sm h-full bg-bg-primary border-l border-[rgba(245,240,235,0.06)] flex flex-col pt-[72px] px-8 pb-8 transition-transform duration-500',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'font-display text-2xl transition-colors duration-300',
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-text-primary hover:text-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-accent text-bg-primary font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent-light"
            >
              Réserver une Séance
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
