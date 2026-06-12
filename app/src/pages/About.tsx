import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { MapPin, MessageCircle, Camera, Printer } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const timelineData = [
  {
    year: '2008',
    title: 'Débuts passionnés',
    description:
      'Acquisition du premier reflex. Les rues de Yaoundé deviennent le terrain de jeu et l\'école de photographie.',
  },
  {
    year: '2011',
    title: 'Premier studio',
    description:
      'Ouverture du premier studio photo dans la capitale camerounaise. Début des couvertures d\'événements institutionnels.',
  },
  {
    year: '2014',
    title: 'Reconnaissance nationale',
    description:
      'Couverture des plus grands événements présidentiels et gouvernementaux. François Achille Omgba devient une référence.',
  },
  {
    year: '2017',
    title: 'Médaille d\'honneur',
    description:
      'Distinction officielle pour contribution exceptionnelle aux arts visuels et à la promotion de la culture camerounaise.',
  },
  {
    year: '2020',
    title: 'Expositions itinérantes',
    description:
      'Expositions photographiques à travers le Cameroun — Douala, Bafoussam, Garoua — partageant la vision africaine.',
  },
  {
    year: '2024',
    title: 'Lancement d\'Omega Productions',
    description:
      'Naissance d\'Omega Productions. Expansion internationale tout en conservant l\'âme africaine au cœur de chaque image.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Consultation & Vision',
    description:
      'Chaque projet commence par une conversation. Je prends le temps de comprendre vos attentes, votre univers, l\u2019\u00E9motion que vous souhaitez capturer. Cet \u00E9change est la fondation de tout.',
    Icon: MessageCircle,
  },
  {
    num: '02',
    title: 'S\u00E9ance Photographique',
    description:
      'En studio ou en ext\u00E9rieur, je travaille avec la lumi\u00E8re naturelle autant que possible. Je privil\u00E9gie les s\u00E9ances longues, sans pr\u00E9cipitation, pour laisser l\u2019authenticit\u00E9 \u00E9merger.',
    Icon: Camera,
  },
  {
    num: '03',
    title: 'Tirage d\u2019Art',
    description:
      'Chaque image s\u00E9lectionn\u00E9e subit un travail de post-traitement manuel, minutieux. Les tirages sont r\u00E9alis\u00E9s sur papier Hahnem\u00FChle avec des encres archive \u2014 des oeuvres destin\u00E9es \u00E0 durer des g\u00E9n\u00E9rations.',
    Icon: Printer,
  },
];

const statsData = [
  { target: 16, suffix: '+', label: 'ans d\u2019exp\u00E9rience' },
  { target: 500, suffix: '+', label: 's\u00E9ances' },
  { target: 40, suffix: '+', label: 'expositions' },
  { target: 12, suffix: '', label: 'pays parcourus' },
];

/* ------------------------------------------------------------------ */
/*  Section Label helper                                               */
/* ------------------------------------------------------------------ */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="block w-12 h-px bg-accent" />
      <span className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
        {text}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Count-up Stat component                                            */
/* ------------------------------------------------------------------ */

function StatItem({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useGSAP(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent =
                Math.floor(obj.val) + suffix;
            }
          },
        });
      },
    });
  });

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block font-display font-light text-[clamp(2.5rem,5vw,4rem)] text-accent"
      >
        0{suffix}
      </span>
      <span className="block mt-2 font-body text-body-sm text-text-secondary">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Page                                                    */
/* ------------------------------------------------------------------ */

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [countersReady, setCountersReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      /* ---- Hero ---- */
      gsap.fromTo(
        '.about-hero-img',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          delay: 0.2,
        }
      );
      gsap.from('.about-hero-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
      });
      gsap.from('.about-hero-title span', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.6,
      });
      gsap.from('.about-hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.9,
      });
      gsap.from('.about-hero-bio', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1,
      });
      gsap.from('.about-hero-loc', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.3,
      });

      /* ---- Philosophy ---- */
      gsap.from('.about-phil-label', {
        scrollTrigger: { trigger: '.about-phil-label', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.about-phil-quote-word', {
        scrollTrigger: { trigger: '.about-phil-quote', start: 'top 85%' },
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
      });
      gsap.from('.about-phil-text', {
        scrollTrigger: { trigger: '.about-phil-text', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.about-phil-vline', {
        scrollTrigger: { trigger: '.about-phil-vline', start: 'top 80%' },
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.8,
        ease: 'power3.out',
      });

      /* ---- Timeline ---- */
      gsap.from('.about-tl-header', {
        scrollTrigger: { trigger: '.about-tl-header', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.fromTo(
        '.about-tl-line',
        { scaleY: 0 },
        {
          scrollTrigger: { trigger: '.about-tl-line', start: 'top 85%' },
          scaleY: 1,
          transformOrigin: 'top',
          duration: 1.2,
          ease: 'power3.out',
        }
      );
      gsap.from('.about-tl-item', {
        scrollTrigger: { trigger: '.about-timeline', start: 'top 85%' },
        opacity: 0,
        x: (i: number) => (i % 2 === 0 ? -40 : 40),
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.about-tl-dot', {
        scrollTrigger: { trigger: '.about-timeline', start: 'top 85%' },
        scale: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });

      /* ---- Process ---- */
      gsap.from('.about-proc-header', {
        scrollTrigger: { trigger: '.about-proc-header', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.about-proc-card', {
        scrollTrigger: { trigger: '.about-proc-cards', start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.about-studio-img', {
        scrollTrigger: { trigger: '.about-studio-img', start: 'top 85%' },
        clipPath: 'inset(100% 0 0 0)',
        duration: 1,
        ease: 'power3.inOut',
      });

      /* ---- Stats ---- */
      setCountersReady(true);

      /* ---- CTA ---- */
      gsap.from('.about-cta-title span', {
        scrollTrigger: { trigger: '.about-cta-title', start: 'top 85%' },
        opacity: 0,
        y: 15,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
      });
      gsap.from('.about-cta-sub', {
        scrollTrigger: { trigger: '.about-cta-sub', start: 'top 85%' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.about-cta-btn', {
        scrollTrigger: { trigger: '.about-cta-btn', start: 'top 90%' },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const titleWords = 'François Achille Omgba'.split('');
  const quoteWords =
    '\u00AB La photographie n\u2019est pas ce que l\u2019on voit, c\u2019est la mani\u00E8re dont on le voit. \u00BB'.split(
      ' '
    );
  const ctaWords = 'Travaillons Ensemble'.split('');

  return (
    <div ref={containerRef} className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/*  SECTION 1 \u2014 HERO                                            */}
      {/* ============================================================ */}
      <section className="min-h-[100dvh] bg-[#0A0A0C] flex flex-col lg:flex-row">
        {/* Left \u2014 Portrait */}
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-full relative overflow-hidden">
          <img
            src="/francois-ceremonie.png"
            alt="François Achille Omgba"
            className="about-hero-img w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Right \u2014 Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0">
          <div className="about-hero-label flex items-center gap-4 mb-4">
            <span className="block w-12 h-px bg-accent" />
            <span className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
              A PROPOS
            </span>
          </div>

          <h1 className="about-hero-title font-display text-display-lg text-text-primary mt-4">
            {titleWords.map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <p className="about-hero-tagline mt-4 font-body text-body-lg text-text-secondary italic">
            Photographe. Conteur. Chasseur de lumi\u00E8re.
          </p>

          <p className="about-hero-bio mt-6 font-body text-body-lg text-text-secondary leading-[1.8] max-w-[480px]">
            François Achille Omgba est un photographe camerounais de renom, médaillé pour ses contributions à la promotion de la culture et de l'art visuel au Cameroun. Fort de plus de 16 ans d'expérience, il a couvert les plus grands événements institutionnels, culturels et artistiques du pays. À travers Omega Productions, il capture l'essence de l'Afrique avec une vision unique alliant tradition et modernité.
          </p>

          <div className="about-hero-loc flex items-center gap-2 mt-8">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-body text-body-sm text-text-muted">
              Basé à Yaoundé, Cameroun \u2014 Disponible internationalement
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 \u2014 PHILOSOPHY                                      */}
      {/* ============================================================ */}
      <section className="bg-[#141418] py-32 px-8 lg:px-16 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-full lg:w-[55%]">
            <div className="about-phil-label">
              <SectionLabel text="PHILOSOPHIE" />
            </div>

            <div className="about-phil-quote font-display text-display-md text-text-primary mt-8 leading-[1.3]">
              {quoteWords.map((word, i) => (
                <span
                  key={i}
                  className="about-phil-quote-word inline-block mr-[0.3em]"
                >
                  {word}
                </span>
              ))}
            </div>

            <p className="mt-4 font-body text-body-sm text-text-muted">
              \u2014 Ma devise de travail
            </p>

            <p className="about-phil-text mt-8 font-body text-body-lg text-text-secondary leading-[1.8] max-w-[520px]">
              Je crois profond\u00E9ment que chaque image doit raconter une histoire.
              Pas une histoire impos\u00E9e, mais celle qui \u00E9merge naturellement du
              sujet, de la lumi\u00E8re et du moment. Mon approche est minimaliste en
              \u00E9quipement, maximaliste en attention. Je pr\u00E9f\u00E8re attendre des
              heures pour la lumi\u00E8re parfaite plut\u00F4t que de corriger
              artificiellement. Cette patience, cette exigence du naturel, d\u00E9finit
              chacune de mes photographies.
            </p>
          </div>

          {/* Decorative vertical line */}
          <div className="about-phil-vline hidden lg:block absolute right-[20%] top-32 w-px h-[120px] bg-accent opacity-30" />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 3 \u2014 TIMELINE                                       */}
      {/* ============================================================ */}
      <section className="bg-[#0A0A0C] py-32 px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto about-tl-header">
          <SectionLabel text="PARCOURS" />
          <h2 className="font-display text-display-md text-text-primary mt-3">
            Une Vie de Lumière
          </h2>
        </div>

        <div className="about-timeline relative max-w-[1000px] mx-auto mt-16">
          {/* Central vertical line */}
          <div className="about-tl-line absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-[rgba(245,240,235,0.06)]" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`about-tl-item relative flex items-start ${
                    isLeft
                      ? 'lg:flex-row lg:text-right'
                      : 'lg:flex-row-reverse lg:text-left'
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="about-tl-dot absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-[3px] border-[#0A0A0C] z-10" />

                  {/* Content \u2014 positioned left or right */}
                  <div
                    className={`pl-12 lg:pl-0 lg:w-[45%] ${
                      isLeft ? 'lg:pr-12 lg:ml-0 lg:mr-auto' : 'lg:pl-12 lg:ml-auto lg:mr-0'
                    }`}
                  >
                    <span className="font-display text-[1.25rem] text-accent">
                      {item.year}
                    </span>
                    <h3 className="mt-1 font-body font-medium text-body-md text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-body text-body-sm text-text-secondary leading-[1.6]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 \u2014 PROCESS                                        */}
      {/* ============================================================ */}
      <section className="bg-[#141418] py-32 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="about-proc-header">
            <SectionLabel text="APPROCHE" />
            <h2 className="font-display text-display-md text-text-primary mt-3">
              Mon Processus
            </h2>
          </div>

          <div className="about-proc-cards grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="about-proc-card relative"
              >
                <span className="block font-display font-light text-[4rem] text-accent opacity-25 leading-none">
                  {step.num}
                </span>
                <h3 className="mt-2 font-display text-heading-lg text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-body-md text-text-secondary leading-[1.7]">
                  {step.description}
                </p>
                <step.Icon className="mt-4 w-8 h-8 text-accent" />
              </div>
            ))}
          </div>

          {/* Studio Image */}
          <div className="mt-16">
            <div className="about-studio-img overflow-hidden" style={{ clipPath: 'inset(0% 0 0 0)' }}>
              <img
                src="/francois-medaille.png"
                alt="Fran\u00E7ois Achille Omgba, M\u00E9daille d'honneur"
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
            <p className="mt-3 font-body text-caption text-text-muted text-center">
              François Achille Omgba, lauréat de la médaille d'honneur
            </p>
          </div>

          {/* Darkroom process image */}
          <div className="mt-8">
            <div className="about-studio-img overflow-hidden max-w-[800px] mx-auto" style={{ clipPath: 'inset(0% 0 0 0)' }}>
              <img
                src="/process-darkroom.jpg"
                alt="Tirage photographique en cours de d\u00E9veloppement"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <p className="mt-3 font-body text-caption text-text-muted text-center">
              Tirage d\u2019art \u2014 processus artisanal
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 \u2014 STATS                                          */}
      {/* ============================================================ */}
      <section className="bg-[#0A0A0C] py-24 px-8 lg:px-16 relative overflow-hidden">
        {/* Subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(196,149,106,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-[1000px] mx-auto relative grid grid-cols-2 lg:grid-cols-4 gap-8">
          {countersReady &&
            statsData.map((s, i) => (
              <StatItem
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                delay={i * 0.1}
              />
            ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 6 \u2014 CTA                                            */}
      {/* ============================================================ */}
      <section className="bg-[#141418] py-24 px-8 lg:px-16">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="about-cta-title font-display text-display-md text-text-primary">
            {ctaWords.map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h2>

          <p className="about-cta-sub mt-4 font-body text-body-lg text-text-secondary">
            Chaque projet est unique. Discutons de votre vision et cr\u00E9ons
            ensemble quelque chose d\u2019exceptionnel.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="about-cta-btn inline-flex items-center justify-center px-8 py-3.5 bg-accent text-[#0A0A0C] font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent-light hover:scale-[1.02]"
            >
              R\u00E9server une s\u00E9ance
            </Link>
            <Link
              to="/portfolio"
              className="about-cta-btn inline-flex items-center justify-center px-8 py-3.5 border border-accent text-accent font-body font-medium text-sm tracking-wide transition-all duration-300 hover:bg-accent hover:text-[#0A0A0C]"
            >
              Voir le Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
