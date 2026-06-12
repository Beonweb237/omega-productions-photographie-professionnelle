import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Alexandre a un don unique pour capter l'essence d'un moment. Ses portraits de notre famille sont devenus des tresors inestimables.",
    name: 'Claire et Thomas Martin',
    role: 'Clients particuliers',
  },
  {
    quote: "Une vision artistique exceptionnelle alliee a une technique parfaite. Les tirages pour notre hotel sont magnifiques.",
    name: 'Sophie Delacroix',
    role: 'Directrice Hotel Le Meurice',
  },
  {
    quote: "Travailler avec Alexandre, c'est faire confiance a un veritable artiste. Son regard sur notre collection a depasse toutes nos attentes.",
    name: 'Marc Benhamou',
    role: "Directeur Artistique, Vogue Paris",
  },
  {
    quote: "Il a su capturer l'atmosphere intime de notre mariage avec une discretion et une elegance rares.",
    name: 'Isabelle & Pierre Lefranc',
    role: 'Maries',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const next = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sliderRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary py-32 lg:py-40"
    >
      <div className="max-w-[1000px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="section-label-center mb-6">
            <span>04</span>
            <span>TEMOIGNAGES</span>
          </div>
          <h2 className="font-display text-display-md text-text-primary">
            Ce Qu'ils Disent
          </h2>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="relative opacity-0">
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full border border-[rgba(245,240,235,0.06)] items-center justify-center text-text-secondary hover:text-accent hover:border-[rgba(196,149,106,0.3)] transition-all duration-300"
            aria-label="Precedent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full border border-[rgba(245,240,235,0.06)] items-center justify-center text-text-secondary hover:text-accent hover:border-[rgba(196,149,106,0.3)] transition-all duration-300"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Content */}
          <div className="overflow-hidden">
            <div
              key={active}
              className="text-center transition-all duration-400 ease-out"
              style={{
                animation: `fadeSlideIn 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              }}
            >
              <blockquote className="font-display text-display-md text-text-primary leading-[1.3] italic">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="w-12 h-px bg-accent mx-auto my-8" />
              <p className="font-body text-body-md text-text-primary font-medium">
                {current.name}
              </p>
              <p className="font-body text-body-sm text-text-muted mt-1">
                {current.role}
              </p>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-accent w-6'
                    : 'bg-[rgba(245,240,235,0.06)] hover:bg-[rgba(245,240,235,0.15)]'
                }`}
                aria-label={`Temoignage ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint arrows */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary"
              aria-label="Precedent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(${direction * 40}px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
