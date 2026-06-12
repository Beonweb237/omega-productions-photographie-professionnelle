import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Video fade in
      tl.fromTo(
        videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0
      );

      // Label fade-up
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      // Title - character by character
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          titleRef.current!.appendChild(span);
          return span;
        });
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'expo.out',
          },
          0.4
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.0
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.4
      );

      // Scroll-driven parallax on video
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (videoRef.current) {
            gsap.set(videoRef.current, {
              y: progress * -80,
              scale: 1 + progress * 0.05,
            });
          }
        },
      });

      // Fade out content on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '30% top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              opacity: 1 - progress,
              y: progress * -30,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        style={{ zIndex: 1 }}
      >
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* Image fallback / overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-main.jpg)',
          zIndex: 1,
          opacity: 0.7,
        }}
      />

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 gradient-image-overlay" style={{ zIndex: 2 }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative px-8 lg:px-16 text-center max-w-[900px] mx-auto"
        style={{ zIndex: 3 }}
      >
        {/* Label */}
        <div ref={labelRef} className="section-label-center mb-8 opacity-0">
          <span>01</span>
          <span>PHOTOGRAPHE &amp; PROMOTEUR</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-display-xl text-text-primary"
        >
          OMEGA PRODUCTIONS
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 font-body text-body-lg text-text-secondary max-w-[560px] mx-auto opacity-0"
        >
          L'Art de Capturer l'Essence Africaine. Par François Achille Omgba, photographe médaillé à Yaoundé, Cameroun.
        </p>

        {/* CTA Group */}
        <div ref={ctaRef} className="flex flex-row gap-4 justify-center mt-10 flex-wrap">
          <Link to="/portfolio" className="btn-primary opacity-0">
            Découvrir le Portfolio
          </Link>
          <Link to="/boutique" className="btn-outline opacity-0">
            Acheter un Tirage
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ zIndex: 3 }}
      >
        <div className="w-px h-10 bg-text-muted animate-bounce-scroll" />
        <span className="font-body text-caption uppercase tracking-[0.08em] text-text-muted">
          Défiler
        </span>
      </div>
    </section>
  );
}