import { Link } from 'react-router';
import { Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Boutique', path: '/boutique' },
  { label: '\u00C0 Propos', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const services = [
  'Séance Portrait',
  'Photographie Événementielle',
  'Couverture Cérémonies',
  'Tirages d\'Art',
  'Vidéo & Documentaire',
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-bg-secondary">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Col 1 - Brand */}
          <div>
            <Link to="/" className="font-body font-semibold text-sm tracking-[0.2em] uppercase text-text-primary">
              OMEGA PRODUCTIONS
            </Link>
            <p className="mt-4 text-text-secondary font-body text-body-sm leading-relaxed">
              François Achille Omgba — Photographe & Promoteur
            </p>
            <p className="mt-2 text-text-muted font-body text-caption">
              Yaoundé, Cameroun
            </p>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h4 className="font-body text-label uppercase tracking-[0.12em] text-text-muted mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-secondary font-body text-body-sm hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Services */}
          <div>
            <h4 className="font-body text-label uppercase tracking-[0.12em] text-text-muted mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-text-secondary font-body text-body-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Social */}
          <div>
            <h4 className="font-body text-label uppercase tracking-[0.12em] text-text-muted mb-6">
              Suivre
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary hover:text-accent hover:border-[rgba(196,149,106,0.3)] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-body text-label uppercase tracking-[0.12em] text-text-muted mb-4">
                Newsletter
              </h5>
              <div className="flex border-b border-[rgba(245,240,235,0.06)] focus-within:border-accent transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-transparent py-2 text-text-primary font-body text-body-sm placeholder:text-text-muted outline-none"
                />
                <button className="text-text-muted hover:text-accent transition-colors duration-300 font-body text-body-sm">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(245,240,235,0.06)]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted font-body text-caption">
            &copy; 2025 Omega Productions. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-text-muted font-body text-caption hover:text-text-secondary transition-colors duration-200"
            >
              Mentions légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
