import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Category = 'Tous' | 'Portrait' | 'Paysage' | 'Architecture' | 'Urbain' | 'Noir & Blanc';

const CATEGORIES: Category[] = ['Tous', 'Portrait', 'Paysage', 'Architecture', 'Urbain', 'Noir & Blanc'];

interface GalleryItem {
  id: number;
  title: string;
  category: Category;
  year: number;
  image: string;
  aspect: '3:4' | '4:3' | '1:1';
}

const GALLERY_DATA: GalleryItem[] = [
  { id: 1, title: "L'Élégance Toghu", category: 'Portrait', year: 2025, image: '/featured-01.jpg', aspect: '3:4' },
  { id: 2, title: 'Marché de Mfoundi', category: 'Architecture', year: 2024, image: '/featured-02.jpg', aspect: '4:3' },
  { id: 3, title: 'Danse Traditionnelle', category: 'Noir & Blanc', year: 2024, image: '/featured-03.jpg', aspect: '3:4' },
  { id: 4, title: 'Monument de la Réunification', category: 'Urbain', year: 2024, image: '/featured-04.jpg', aspect: '4:3' },
  { id: 5, title: 'Forêt Tropicale', category: 'Paysage', year: 2023, image: '/featured-05.jpg', aspect: '3:4' },
  { id: 6, title: 'Artisan du Bois', category: 'Urbain', year: 2023, image: '/featured-06.jpg', aspect: '4:3' },
  { id: 7, title: 'Forêt Tropicale', category: 'Paysage', year: 2024, image: '/portfolio-thumb-01.jpg', aspect: '3:4' },
  { id: 8, title: "Artiste de Yaoundé", category: 'Portrait', year: 2024, image: '/portfolio-thumb-02.jpg', aspect: '3:4' },
  { id: 9, title: 'Waza au Crépuscule', category: 'Noir & Blanc', year: 2023, image: '/portfolio-thumb-03.jpg', aspect: '4:3' },
  { id: 10, title: 'Palais de Foumban', category: 'Architecture', year: 2023, image: '/portfolio-thumb-04.jpg', aspect: '4:3' },
  { id: 11, title: 'Pirogues sur le Wouri', category: 'Paysage', year: 2022, image: '/portfolio-thumb-05.jpg', aspect: '3:4' },
  { id: 12, title: 'Chutes de la Lobé', category: 'Paysage', year: 2024, image: '/portfolio-thumb-06.jpg', aspect: '4:3' },
  { id: 13, title: "Le Maître à l'Oeuvre", category: 'Portrait', year: 2025, image: '/francois-camera.png', aspect: '3:4' },
  { id: 14, title: 'Cathédrale de la Brousse', category: 'Architecture', year: 2024, image: '/shop-04.jpg', aspect: '4:3' },
  { id: 15, title: 'Rites du Matin', category: 'Noir & Blanc', year: 2024, image: '/featured-03.jpg', aspect: '3:4' },
  { id: 16, title: 'Couleurs du Marché', category: 'Urbain', year: 2024, image: '/featured-04.jpg', aspect: '4:3' },
  { id: 17, title: "Aube sur le Mont Cameroun", category: 'Paysage', year: 2023, image: '/shop-01.jpg', aspect: '3:4' },
  { id: 18, title: 'Puissance et Grâce', category: 'Urbain', year: 2023, image: '/shop-05.jpg', aspect: '4:3' },
  { id: 19, title: "L'Essence Africaine", category: 'Paysage', year: 2024, image: '/shop-06.jpg', aspect: '3:4' },
  { id: 20, title: 'Mains du Terroir', category: 'Portrait', year: 2024, image: '/portfolio-thumb-02.jpg', aspect: '3:4' },
  { id: 21, title: 'Brumes Camerounaises', category: 'Noir & Blanc', year: 2023, image: '/portfolio-thumb-03.jpg', aspect: '4:3' },
  { id: 22, title: 'Palais Royal', category: 'Architecture', year: 2023, image: '/portfolio-thumb-04.jpg', aspect: '4:3' },
  { id: 23, title: 'Rizières de Bafou', category: 'Paysage', year: 2022, image: '/portfolio-thumb-05.jpg', aspect: '3:4' },
  { id: 24, title: 'Coucher de Soleil sur le Wouri', category: 'Paysage', year: 2024, image: '/portfolio-thumb-06.jpg', aspect: '4:3' },
];

function getAspectClass(aspect: string) {
  switch (aspect) {
    case '3:4':
      return 'aspect-[3/4]';
    case '1:1':
      return 'aspect-square';
    default:
      return 'aspect-[4/3]';
  }
}

/* ------------------------------------------------------------------ */
/*  LIGHTBOX COMPONENT (Radix Dialog based)                            */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

function Lightbox({ open, onOpenChange, items, currentIndex, onNavigate }: LightboxProps) {
  const item = items[currentIndex];

  const goPrev = useCallback(() => {
    if (items.length === 0) return;
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (items.length === 0) return;
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  /* keyboard navigation */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, goPrev, goNext, onOpenChange]);

  /* lock body scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!item) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-[100] bg-[rgba(10,10,12,0.95)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          onClick={() => onOpenChange(false)}
        />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center outline-none"
          onPointerDownOutside={() => onOpenChange(false)}
        >
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-[#A8A29E] hover:text-[#F5F0EB] hover:border-[rgba(196,149,106,0.3)] transition-all duration-300 z-10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-[#A8A29E] hover:text-[#F5F0EB] hover:border-[rgba(196,149,106,0.3)] transition-all duration-300 z-10"
              aria-label="Precedent"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-[#A8A29E] hover:text-[#F5F0EB] hover:border-[rgba(196,149,106,0.3)] transition-all duration-300 z-10"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-[90vw] max-h-[80vh] flex items-center justify-center px-16 lg:px-24">
            <img
              key={item.id}
              src={item.image}
              alt={item.title}
              className="max-w-full max-h-[75vh] object-contain animate-in fade-in duration-400"
            />
          </div>

          {/* Info bar */}
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2">
            <span className="font-body text-caption uppercase tracking-[0.08em] text-[#6B6560]">
              {currentIndex + 1} / {items.length}
            </span>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-heading-md text-[#F5F0EB]">
                {item.title}
              </h3>
              <span className="text-[#6B6560]">—</span>
              <span className="font-body text-label uppercase tracking-[0.12em] text-[#C4956A]">
                {item.category}
              </span>
              <span className="text-[#6B6560]">—</span>
              <span className="font-body text-body-sm text-[#6B6560]">{item.year}</span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PORTFOLIO PAGE                                                */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const labelLineRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<Category>('Tous');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  /* derive filtered items */
  const filteredItems = useMemo(() => {
    if (activeCategory === 'Tous') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  /* category counts */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: GALLERY_DATA.length };
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = GALLERY_DATA.filter((item) => item.category === cat).length;
    }
    return counts;
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  /* -------------------------------------------------------------- */
  /*  GSAP ANIMATIONS                                                */
  /* -------------------------------------------------------------- */

  useGSAP(
    () => {
      if (!containerRef.current) return;

      /* ---- Hero clip-reveal + fade-up ---- */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Label line draw
      if (labelLineRef.current) {
        gsap.set(labelLineRef.current, { width: 0, opacity: 0 });
        tl.to(labelLineRef.current, { width: 48, opacity: 1, duration: 0.6 }, 0.2);
      }

      // Label text
      if (labelTextRef.current) {
        gsap.set(labelTextRef.current, { opacity: 0, y: 20 });
        tl.to(labelTextRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
      }

      // Title text-split animation (word by word)
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        const words = text.split(' ');
        const wordSpans = words.map((word) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          const inner = document.createElement('span');
          inner.textContent = word;
          inner.style.display = 'inline-block';
          inner.style.willChange = 'transform';
          span.innerHTML = '';
          span.appendChild(inner);
          titleRef.current!.appendChild(span);
          titleRef.current!.appendChild(document.createTextNode(' '));
          return inner;
        });

        gsap.set(wordSpans, { y: '100%', opacity: 0 });
        tl.to(
          wordSpans,
          { y: '0%', opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
          0.4
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
      }

      /* ---- Filter bar slide-down ---- */
      if (filterBarRef.current) {
        gsap.set(filterBarRef.current, { y: -10, opacity: 0 });
        tl.to(filterBarRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.6);
      }

      /* ---- Gallery fade-up-stagger with ScrollTrigger ---- */
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll('.gallery-item');
        gsap.set(items, { opacity: 0, y: 40 });

        ScrollTrigger.batch(items, {
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: 'power3.out',
            });
          },
          start: 'top 90%',
          once: true,
        });
      }

      /* ---- Hero clip-reveal ---- */
      if (heroRef.current) {
        gsap.set(heroRef.current, {
          clipPath: 'inset(100% 0 0 0)',
        });
        tl.to(
          heroRef.current,
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            ease: 'power3.inOut',
          },
          0
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  /* Re-animate gallery items on filter change */
  useEffect(() => {
    if (!galleryRef.current) return;
    const items = galleryRef.current.querySelectorAll('.gallery-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.05 }
    );
  }, [activeCategory]);

  /* scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-[100dvh] pt-[72px]">
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] max-h-[60vh] flex items-end bg-bg-primary overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(196,149,106,0.08) 0%, transparent 60%)',
        }}
      >
        <div className="w-full px-8 lg:px-16 pb-16 lg:pb-20 max-w-[1440px] mx-auto">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <div
              ref={labelLineRef}
              className="h-px bg-[#C4956A]"
              style={{ width: 0 }}
            />
            <span
              ref={labelTextRef}
              className="font-body text-label uppercase tracking-[0.12em] text-[#6B6560] opacity-0"
            >
              PORTFOLIO
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-display text-display-lg text-[#F5F0EB] leading-[1.0] tracking-[-0.02em]"
            style={{ fontWeight: 300 }}
          >
            Galerie
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-4 lg:mt-6 font-body text-body-lg text-[#A8A29E] max-w-[600px] opacity-0"
            style={{ fontWeight: 300, lineHeight: 1.7 }}
          >
Une sélection de photographies réalisées au fil des années, des traditions ancestrales aux œuvres contemporaines.
          </p>
        </div>
      </section>

      {/* ============ FILTER BAR ============ */}
      <div
        ref={filterBarRef}
        className="sticky top-[72px] z-40 bg-[rgba(10,10,12,0.95)] backdrop-blur-md border-b border-[rgba(245,240,235,0.06)] opacity-0"
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'relative flex items-center gap-2 px-5 py-2 font-body text-label uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-250 border shrink-0',
                  activeCategory === cat
                    ? 'bg-[#C4956A] border-[#C4956A] text-[#0A0A0C]'
                    : 'bg-transparent border-[rgba(245,240,235,0.06)] text-[#A8A29E] hover:border-[rgba(196,149,106,0.3)] hover:text-[#F5F0EB]'
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0A0A0C] text-[#C4956A] font-body text-[10px] font-semibold">
                    {categoryCounts[cat]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MASONRY GALLERY ============ */}
      <section className="bg-bg-primary px-8 lg:px-16 pt-12 pb-32">
        <div className="max-w-[1440px] mx-auto">
          <div
            ref={galleryRef}
            className="columns-1 md:columns-2 lg:columns-3 gap-3 md:gap-4"
          >
            {filteredItems.map((item, idx) => (
              <div
                key={`${activeCategory}-${item.id}`}
                className="gallery-item break-inside-avoid mb-3 md:mb-4 relative overflow-hidden group cursor-pointer opacity-0"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(idx); }}
                aria-label={`Ouvrir ${item.title}`}
              >
                <div className={cn('relative overflow-hidden', getAspectClass(item.aspect))}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[rgba(10,10,12,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-350 ease-out" />

                  {/* Expand icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-5 h-5 text-[#F5F0EB]" />
                  </div>

                  {/* Info panel */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-display text-heading-md text-[#F5F0EB] text-center px-4">
                      {item.title}
                    </h3>
                    <span className="mt-2 font-body text-label uppercase tracking-[0.12em] text-[#C4956A]">
                      {item.category}
                    </span>
                    <span className="mt-1 font-body text-body-sm text-[#6B6560]">{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="font-display text-display-md text-[#6B6560]">Aucune photo dans cette categorie</p>
            </div>
          )}
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      <Lightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
