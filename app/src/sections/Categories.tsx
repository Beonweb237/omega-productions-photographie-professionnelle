import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    number: '01',
    title: 'Portrait',
    description: "L'ame humaine sous toutes ses lumieres. Seances studio et environnementales qui revelent la personnalite authentique de chaque sujet.",
  },
  {
    number: '02',
    title: 'Paysage',
    description: "Des vastes etendues aux details infimes. La nature comme musee infini, capturee aux heures magiques du lever et du coucher.",
  },
  {
    number: '03',
    title: 'Architecture',
    description: "Lignes, courbes, lumiere et ombre. La beaute structurelle des espaces construits, de l'ancien au contemporain.",
  },
  {
    number: '04',
    title: 'Art de Vivre',
    description: "Moments de vie, gastronomie, voyage. La photographie editoriale qui raconte des histoires sensorielles et immersives.",
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-up
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.category-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-secondary py-32 overflow-hidden"
    >
      {/* Warm vignette overlay */}
      <div className="absolute inset-0 gradient-warm-vignette pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <div className="section-label-center mb-6">
            <span>03</span>
            <span>DOMAINES</span>
          </div>
          <h2 className="font-display text-display-md text-text-primary">
            Specialites
          </h2>
          <p className="mt-4 font-body text-body-lg text-text-secondary max-w-[520px] mx-auto">
            De la lumiere naturelle au studio, chaque domaine est une exploration
          </p>
        </div>

        {/* Category Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <div
              key={cat.number}
              className="category-card group bg-bg-tertiary border border-[rgba(245,240,235,0.06)] p-12 hover:border-[rgba(196,149,106,0.3)] hover:-translate-y-0.5 transition-all duration-400 opacity-0"
            >
              <span className="font-display text-5xl text-accent opacity-30">
                {cat.number}
              </span>
              <h3 className="font-display text-heading-lg text-text-primary mt-4">
                {cat.title}
              </h3>
              <p className="font-body text-body-md text-text-secondary mt-3 leading-[1.7]">
                {cat.description}
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 mt-6 font-body text-body-sm text-accent hover:gap-3 transition-all duration-300"
              >
                Explorer <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
