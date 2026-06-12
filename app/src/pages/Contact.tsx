import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  User,
  Newspaper,
  Heart,
  Check,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sessionTypes = [
  {
    icon: User,
    title: 'Portrait',
    price: '230 000 FCFA',
    priceEur: '(\u20AC350)',
    description:
      'Une s\u00E9ance intime en studio ou en ext\u00E9rieur pour capturer votre personnalit\u00E9 authentique. Id\u00E9ale pour les portraits professionnels, book personnel ou cadeau.',
    features: [
      '2 heures de s\u00E9ance',
      '20 photos retouch\u00E9es',
      '2 tenues',
      'Livraison HD sous 7 jours',
    ],
  },
  {
    icon: Newspaper,
    title: '\u00C9v\u00E9nementiel',
    price: '525 000 FCFA',
    priceEur: '(\u20AC800)',
    description:
      'Conception et r\u00E9alisation de couvertures photographiques pour \u00E9v\u00E9nements institutionnels, culturels et c\u00E9r\u00E9monies. Un travail en \u00E9troite collaboration pour donner vie \u00E0 votre vision.',
    features: [
      '4 heures de couverture',
      '50 photos livr\u00E9es',
      'Direction artistique',
      'Livraison express disponible',
    ],
  },
  {
    icon: Heart,
    title: 'Mariage',
    price: '1 575 000 FCFA',
    priceEur: '(\u20AC2 400)',
    description:
      'Couverture compl\u00E8te de votre \u00E9v\u00E9nement avec un oeil artistique. Chaque moment est capt\u00E9 avec discr\u00E9tion et \u00E9l\u00E9gance pour un r\u00E9sultat intemporel.',
    features: [
      'Journ\u00E9e compl\u00E8te (8h)',
      '200+ photos retouch\u00E9es',
      '2 photographes',
      'Album premium optionnel',
    ],
  },
];

const selectOptions = [
  'S\u00E9ance portrait',
  '\u00C9ditorial / Magazine',
  'Mariage / \u00C9v\u00E9nement',
  'Tirage d\u2019art',
  'Autre',
];

/* ------------------------------------------------------------------ */
/*  Main Contact Page                                                  */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      /* ---- Hero ---- */
      gsap.from('.contact-hero-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.contact-hero-title span', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.4,
      });
      gsap.from('.contact-hero-sub', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      });

      /* ---- Form ---- */
      gsap.from('.contact-form-title', {
        scrollTrigger: { trigger: '.contact-form-title', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.contact-form-field', {
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
      gsap.from('.contact-info-block', {
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      /* ---- Session Types ---- */
      gsap.from('.contact-sess-header', {
        scrollTrigger: { trigger: '.contact-sess-header', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.contact-sess-card', {
        scrollTrigger: { trigger: '.contact-sess-cards', start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      /* ---- Map ---- */
      gsap.from('.contact-map', {
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%' },
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from('.contact-map-pin', {
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%' },
        scale: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'back.out(1.7)',
      });
      gsap.from('.contact-map-card', {
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.5,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const titleChars = 'Prenons Contact'.split('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState !== 'idle') return;
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  const inputClass =
    'w-full bg-transparent border-0 border-b border-[rgba(245,240,235,0.06)] py-3.5 text-text-primary font-body text-body-md outline-none focus:border-accent transition-colors duration-300 placeholder:text-text-muted';

  return (
    <div ref={containerRef} className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/*  SECTION 1 \u2014 HERO                                            */}
      {/* ============================================================ */}
      <section
        className="min-h-[40vh] flex flex-col justify-end pb-16 px-8 lg:px-16 relative"
        style={{
          background: '#0A0A0C',
        }}
      >
        {/* Warm vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(196,149,106,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <div className="contact-hero-label flex items-center gap-4">
            <span className="block w-12 h-px bg-accent" />
            <span className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
              CONTACT
            </span>
          </div>

          <h1 className="contact-hero-title font-display text-display-lg text-text-primary mt-3">
            {titleChars.map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <p className="contact-hero-sub mt-4 font-body text-body-lg text-text-secondary max-w-[560px]">
            Que vous ayez un projet pr\u00E9cis en t\u00EAte ou simplement
            l\u2019envie d\u2019explorer les possibilit\u00E9s, je serai ravi
            d\u2019\u00E9changer avec vous.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 \u2014 FORM + INFO                                     */}
      {/* ============================================================ */}
      <section className="bg-[#0A0A0C] pt-20 pb-32 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* ---- Left: Form (3/5) ---- */}
          <div className="lg:col-span-3">
            <h2 className="contact-form-title font-display text-heading-lg text-text-primary mb-8">
              Envoyez un Message
            </h2>

            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              {/* Nom */}
              <div className="contact-form-field">
                <label className="block font-body text-label uppercase tracking-[0.12em] text-text-muted mb-2">
                  NOM
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  className={inputClass}
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="contact-form-field">
                <label className="block font-body text-label uppercase tracking-[0.12em] text-text-muted mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Type de projet */}
              <div className="contact-form-field relative">
                <label className="block font-body text-label uppercase tracking-[0.12em] text-text-muted mb-2">
                  TYPE DE PROJET
                </label>
                <select
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                  value={formData.sujet}
                  onChange={(e) =>
                    setFormData({ ...formData, sujet: e.target.value })
                  }
                >
                  <option value="" disabled>
                    S\u00E9lectionnez...
                  </option>
                  {selectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 bottom-3.5 w-5 h-5 text-text-muted pointer-events-none" />
              </div>

              {/* Message */}
              <div className="contact-form-field">
                <label className="block font-body text-label uppercase tracking-[0.12em] text-text-muted mb-2">
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="D\u00E9crivez votre projet..."
                  className={`${inputClass} resize-y`}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className={`contact-form-field w-full mt-8 py-4 font-body font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                  formState === 'sent'
                    ? 'bg-success text-[#0A0A0C]'
                    : 'bg-accent text-[#0A0A0C] hover:bg-accent-light hover:scale-[1.01]'
                } disabled:cursor-not-allowed`}
              >
                {formState === 'idle' && 'Envoyer'}
                {formState === 'sending' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Envoi en cours...
                  </>
                )}
                {formState === 'sent' && (
                  <>
                    <Check className="w-4 h-4" />
                    Message envoy\u00E9 !
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ---- Right: Info (2/5) ---- */}
          <div className="lg:col-span-2 contact-info">
            {/* Email */}
            <div className="contact-info-block">
              <Mail className="w-5 h-5 text-accent" />
              <span className="block mt-3 font-body text-label uppercase tracking-[0.12em] text-text-muted">
                EMAIL
              </span>
              <span className="block mt-1 font-body text-body-md text-text-primary">
                contact@omegaproductions.cm
              </span>
              <span className="block mt-1 font-body text-caption text-text-muted">
                R\u00E9ponse sous 24h
              </span>
            </div>

            {/* Phone */}
            <div className="contact-info-block mt-8">
              <Phone className="w-5 h-5 text-accent" />
              <span className="block mt-3 font-body text-label uppercase tracking-[0.12em] text-text-muted">
                T\u00C9L\u00C9PHONE
              </span>
              <span className="block mt-1 font-body text-body-md text-text-primary">
                +237 6XX XXX XXX
              </span>
            </div>

            {/* Studio */}
            <div className="contact-info-block mt-8">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="block mt-3 font-body text-label uppercase tracking-[0.12em] text-text-muted">
                STUDIO
              </span>
              <span className="block mt-1 font-body text-body-md text-text-primary">
                Yaoundé, Cameroun
              </span>
              <span className="block mt-1 font-body text-caption text-text-muted">
                Sur rendez-vous uniquement
              </span>
            </div>

            {/* Horaires */}
            <div className="contact-info-block mt-8">
              <Clock className="w-5 h-5 text-accent" />
              <span className="block mt-3 font-body text-label uppercase tracking-[0.12em] text-text-muted">
                HORAIRES
              </span>
              <span className="block mt-1 font-body text-body-md text-text-primary">
                Lundi \u2014 Vendredi : 8h \u2014 18h
              </span>
              <span className="block mt-1 font-body text-body-md text-text-secondary">
                Weekend : Sur demande
              </span>
            </div>

            {/* Social */}
            <div className="contact-info-block mt-8">
              <span className="block font-body text-label uppercase tracking-[0.12em] text-text-muted">
                SUIVEZ-MOI
              </span>
              <div className="flex items-center gap-4 mt-3">
                <a
                  href="#"
                  className="w-10 h-10 border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary hover:text-accent hover:border-[rgba(196,149,106,0.3)] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary hover:text-accent hover:border-[rgba(196,149,106,0.3)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 \u2014 SESSION TYPES                                  */}
      {/* ============================================================ */}
      <section className="bg-[#141418] py-32 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="contact-sess-header text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block w-12 h-px bg-accent" />
              <span className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
                PRESTATIONS
              </span>
              <span className="block w-12 h-px bg-accent" />
            </div>
            <h2 className="font-display text-display-md text-text-primary mt-3">
              Types de S\u00E9ance
            </h2>
            <p className="mt-4 font-body text-body-lg text-text-secondary max-w-[480px] mx-auto">
              Chaque s\u00E9ance est personnalis\u00E9e selon vos besoins et
              votre univers.
            </p>
          </div>

          {/* Cards */}
          <div className="contact-sess-cards grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {sessionTypes.map((s) => (
              <div
                key={s.title}
                className="contact-sess-card bg-[#1C1C22] border border-[rgba(245,240,235,0.06)] p-8 lg:p-12 text-center transition-all duration-400 hover:border-[rgba(196,149,106,0.3)] hover:-translate-y-1"
              >
                <s.icon className="w-10 h-10 text-accent mx-auto" />
                <h3 className="mt-4 font-display text-heading-lg text-text-primary">
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-body-sm text-text-secondary leading-[1.7]">
                  {s.description}
                </p>
                <p className="mt-4 font-display text-[1.25rem] font-medium text-accent">
                  {s.price === 'Sur devis'
                    ? s.price
                    : `\u00E0 partir de ${s.price} ${(s as {priceEur?: string}).priceEur ?? ''}`}
                </p>

                {/* Features */}
                <ul className="mt-4 pt-4 border-t border-[rgba(245,240,235,0.06)] text-left inline-block w-full">
                  {s.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 mt-2 font-body text-body-sm text-text-secondary"
                    >
                      <Check className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 border border-accent text-accent font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent hover:text-[#0A0A0C]"
                >
                  R\u00E9server
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 \u2014 MAP                                            */}
      {/* ============================================================ */}
      <section className="contact-map relative h-[400px] bg-[#141418] overflow-hidden">
        {/* Stylised map background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 50 L50 100 L0 50 Z' fill='none' stroke='rgba(245,240,235,0.03)' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(10,10,12,0.5)]" />

        {/* Map pin */}
        <div className="contact-map-pin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" style={{ animationDuration: '2s' }} />
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(196,149,106,0.4)]">
              <MapPin className="w-6 h-6 text-[#0A0A0C]" />
            </div>
          </div>
        </div>

        {/* Paris 11e label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12 z-10 text-center">
          <span className="font-body text-body-sm text-text-primary">
            Yaoundé, Cameroun
          </span>
        </div>

        {/* Location card */}
        <div className="contact-map-card absolute bottom-8 left-8 z-10 bg-[rgba(10,10,12,0.92)] backdrop-blur-sm p-6 border border-[rgba(245,240,235,0.06)] max-w-[280px]">
          <p className="font-body font-medium text-body-md text-text-primary">
            Omega Productions
          </p>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            Yaoundé, Cameroun
          </p>
          <p className="mt-1 font-body text-caption text-text-muted">
            Centre-ville
          </p>
          <a
            href="https://maps.google.com/?q=Yaoundé+Cameroun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 font-body text-body-sm text-accent hover:underline"
          >
            Ouvrir dans Google Maps &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
