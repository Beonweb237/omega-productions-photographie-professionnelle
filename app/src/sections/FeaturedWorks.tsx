import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredImages = [
  {
    src: '/featured-01.jpg',
    title: 'L\'Élégance Toghu',
    category: 'Portrait',
    large: true,
  },
  {
    src: '/featured-02.jpg',
    title: 'Marché de Mfoundi',
    category: 'Culture',
    large: false,
  },
  {
    src: '/featured-03.jpg',
    title: 'Danse Traditionnelle',
    category: 'Culture',
    large: false,
  },
  {
    src: '/featured-04.jpg',
    title: 'Monument de la Réunification',
    category: 'Architecture',
    large: false,
  },
  {
    src: '/featured-05.jpg',
    title: 'Lac Nyos',
    category: 'Paysage',
    large: false,
  },
  {
    src: '/featured-06.jpg',
    title: 'Artisan du Bois',
    category: 'Art de Vivre',
    large: false,
  },
];

function PhotoCard({ image, index }: { image: typeof featuredImages[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`featured-card relative overflow-hidden cursor-pointer group ${
        image.large ? 'row-span-2' : ''
      }`}
      data-index={index}
    >
      <div className={`relative w-full ${image.large ? 'h-full' : 'aspect-[4/3]'}`}>
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 gradient-image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        {/* Hover content */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <h3 className="font-display text-lg text-text-primary">{image.title}</h3>
          <p className="font-body text-label uppercase tracking-[0.12em] text-text-muted mt-1">
            {image.category}
          </p>
          <span className="inline-flex items-center gap-1 font-body text-body-sm text-accent mt-2 group-hover:gap-2 transition-all duration-300">
            Voir <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid clip-reveal
      const cards = gridRef.current?.querySelectorAll('.featured-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: gridRef.current,
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
      className="bg-bg-primary py-32 lg:py-40"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 opacity-0">
          <div>
            <div className="section-label mb-4">
              <span>02</span>
              <span>SÉLECTION</span>
            </div>
            <h2 className="font-display text-display-md text-text-primary">
              Œuvres Phares
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 mt-4 sm:mt-0 font-body text-body-sm text-text-secondary hover:text-accent transition-colors duration-300 group"
          >
            Voir tout le portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Row 1: Large left + 2 stacked right */}
          <div className="md:col-span-3 relative overflow-hidden">
            <PhotoCard image={featuredImages[0]} index={0} />
          </div>
          <div className="md:col-span-2 grid grid-rows-2 gap-4">
            <div className="relative overflow-hidden">
              <PhotoCard image={featuredImages[1]} index={1} />
            </div>
            <div className="relative overflow-hidden">
              <PhotoCard image={featuredImages[2]} index={2} />
            </div>
          </div>
          {/* Row 2: 3 equal */}
          <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredImages.slice(3).map((image, i) => (
              <div key={image.src} className="relative overflow-hidden">
                <PhotoCard image={image} index={i + 3} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
