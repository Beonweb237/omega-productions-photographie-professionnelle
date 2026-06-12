import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title - word by word
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        const words = text.split(' ');
        titleRef.current.innerHTML = '';
        const wordSpans = words.map((word) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.style.marginRight = '0.3em';
          titleRef.current!.appendChild(span);
          return span;
        });

        gsap.to(wordSpans, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        });
      }

      // Subtitle fade-up with delay
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          delay: 0.2,
        }
      );

      // CTA buttons stagger
      gsap.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg-secondary py-40 overflow-hidden"
    >
      {/* Accent glow */}
      <div className="absolute inset-0 gradient-accent-glow pointer-events-none" />

      <div className="relative max-w-[700px] mx-auto px-8 lg:px-16 text-center">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-display-lg text-text-primary"
        >
          Chaque Image Raconte une Histoire
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 font-body text-body-lg text-text-secondary max-w-[560px] mx-auto opacity-0"
        >
          Que vous cherchiez un photographe pour votre prochain projet ou un tirage d'exception pour votre interieur, je serais honore de collaborer avec vous.
        </p>

        {/* CTA Group */}
        <div ref={ctaRef} className="flex flex-row gap-4 justify-center mt-10 flex-wrap">
          <Link to="/contact" className="btn-primary opacity-0">
            Reserver une Seance
          </Link>
          <Link to="/boutique" className="btn-outline opacity-0">
            Visiter la Boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
