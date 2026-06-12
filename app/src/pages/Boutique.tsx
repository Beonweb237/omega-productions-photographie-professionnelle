import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import {
  ChevronDown,
  Shield,
  Truck,
  Award,
  RotateCcw,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartContext } from '@/App';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  format: string;
  edition: string;
  badge?: 'edition' | 'nouveau' | 'last';
  image: string;
}

const products: Product[] = [
  {
    id: 'shop-01',
    title: "Aube sur le Mont Cameroun",
    category: 'Paysages',
    price: 450,
    format: '90 x 60 cm',
    edition: '3/15',
    badge: 'edition',
    image: '/shop-01.jpg',
  },
  {
    id: 'shop-02',
    title: "L'Essence Africaine",
    category: 'Portraits',
    price: 320,
    format: '60 x 40 cm',
    edition: '7/25',
    image: '/shop-02.jpg',
  },
  {
    id: 'shop-03',
    title: 'Forêt Sacrée',
    category: 'Paysages',
    price: 280,
    format: '90 x 60 cm',
    edition: '1/10',
    badge: 'nouveau',
    image: '/shop-03.jpg',
  },
  {
    id: 'shop-04',
    title: 'Cathédrale de la Brousse',
    category: 'Architecture',
    price: 380,
    format: '60 x 40 cm',
    edition: '12/20',
    image: '/shop-04.jpg',
  },
  {
    id: 'shop-05',
    title: 'Couleurs du Marché',
    category: 'Urbain',
    price: 350,
    format: '60 x 40 cm',
    edition: '4/15',
    badge: 'edition',
    image: '/shop-05.jpg',
  },
  {
    id: 'shop-06',
    title: 'Puissance et Grâce',
    category: 'Nature',
    price: 180,
    format: '90 x 60 cm',
    edition: '2/10',
    badge: 'last',
    image: '/shop-06.jpg',
  },
];

const categories = ['Tous', 'Paysages', 'Portraits', 'Architecture', 'Nature', 'Urbain'];

const sortOptions = [
  { value: 'newest', label: 'Nouveaut\u00E9s' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix d\u00E9croissant' },
];

const trustItems = [
  { icon: Award, text: "Tirages mus\u00E9e" },
  { icon: Shield, text: "\u00C9dition limit\u00E9e" },
  { icon: Truck, text: "Livraison internationale" },
  { icon: RotateCcw, text: "Retours sous 14 jours" },
];

/* ------------------------------------------------------------------ */
/*  Product Card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartContext();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [addItem, product]);

  const badgeText =
    product.badge === 'edition'
      ? "\u00C9dition limit\u00E9e"
      : product.badge === 'nouveau'
        ? 'Nouveau'
        : product.badge === 'last'
          ? '2 restants'
          : null;

  return (
    <div className="group bg-bg-secondary overflow-hidden relative transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-transparent hover:border-[rgba(196,149,106,0.3)]"
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
      {/* Image area */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.05]"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Badge */}
        {badgeText && (
          <span
            className={cn(
              'absolute top-3 left-3 px-3 py-1.5 text-caption uppercase tracking-[0.08em] font-medium',
              product.badge === 'edition' && 'bg-accent text-bg-primary',
              product.badge === 'nouveau' && 'bg-text-primary text-bg-primary',
              product.badge === 'last' && 'bg-transparent border border-error text-error'
            )}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Content area */}
      <div className="p-5 lg:p-6">
        <p className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
          {product.category}
        </p>
        <h3 className="font-display text-heading-md text-text-primary mt-1">
          {product.title}
        </h3>
        <p className="font-body text-body-sm text-text-secondary mt-2 line-clamp-2">
          Tirage d&apos;art photographique sur papier archival Hahnem&uuml;hle, sign&eacute; et num&eacute;rot&eacute;.
        </p>

        {/* Specs */}
        <div className="flex items-center gap-6 mt-3 pt-3 border-t border-[rgba(245,240,235,0.06)]">
          <span className="font-body text-body-sm text-text-muted">{product.format}</span>
          <span className="font-body text-body-sm text-text-muted">Tirage {product.edition}</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl text-accent font-medium">
              {Math.round(product.price * 655.957).toLocaleString('fr-FR')}&nbsp;FCFA
              <span className="text-sm text-text-muted ml-1">({product.price.toLocaleString('fr-FR')}&nbsp;&euro;)</span>
            </span>
            {product.oldPrice && (
              <span className="font-display text-base text-text-muted line-through">
                {product.oldPrice.toLocaleString('fr-FR')}&nbsp;&euro;
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={cn(
              'px-4 py-2 border font-body text-label uppercase tracking-[0.1em] text-[0.625rem] transition-all duration-300',
              added
                ? 'bg-success border-success text-bg-primary'
                : 'border-accent text-accent hover:bg-accent hover:text-bg-primary'
            )}
          >
            {added ? (
              <span className="flex items-center gap-1.5">
                <Check className="w-3 h-3" />
                Ajout&eacute; !
              </span>
            ) : (
              'Ajouter au panier'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Boutique() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    if (!sortOpen) return;
    const handle = () => setSortOpen(false);
    document.addEventListener('click', handle, { once: true });
    return () => document.removeEventListener('click', handle);
  }, [sortOpen]);

  /* ---- GSAP animations ---- */
  useGSAP(() => {
    const ctx = gsap.context(() => {
      /* Hero: text-split on title */
      const titleEl = heroRef.current?.querySelector('.hero-title');
      if (titleEl) {
        const split = new SplitText(titleEl, { type: 'chars,words' });
        gsap.from(split.chars, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.03,
          ease: 'expo.out',
          delay: 0.3,
        });
        return () => split.revert();
      }
    }, heroRef);

    return () => ctx.revert();
  }, { scope: heroRef });

  useGSAP(() => {
    /* Hero label + subtitle fade-up */
    const els = heroRef.current?.querySelectorAll('.hero-anim');
    if (els && els.length > 0) {
      gsap.from(els, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        delay: 0.1,
      });
    }
  }, { scope: heroRef });

  useGSAP(() => {
    /* Product cards: fade-up-stagger */
    const cards = productsRef.current?.querySelectorAll('.product-card');
    if (cards && cards.length > 0) {
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: productsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, { scope: productsRef });

  useGSAP(() => {
    /* Trust banner: fade-up-stagger */
    const items = trustRef.current?.querySelectorAll('.trust-item');
    if (items && items.length > 0) {
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: trustRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }
  }, { scope: trustRef });

  useGSAP(() => {
    /* Newsletter: fade-up */
    const els = newsletterRef.current?.querySelectorAll('.newsletter-anim');
    if (els && els.length > 0) {
      gsap.from(els, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }
  }, { scope: newsletterRef });

  /* ---- Filter & Sort logic ---- */
  const filtered =
    activeCategory === 'Tous'
      ? [...products]
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // newest = default order
  });

  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label ?? sortOptions[0].label;

  /* ---- Handlers ---- */
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                             */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative pt-[72px] bg-bg-secondary overflow-hidden"
        style={{
          minHeight: '40vh',
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(196,149,106,0.08) 0%, transparent 60%)',
        }}
      >
        <div className="px-8 lg:px-16 pb-16 pt-12 flex flex-col justify-end">
          {/* Label */}
          <div className="hero-anim flex items-center gap-4">
            <span className="block w-12 h-px bg-accent" />
            <span className="font-body text-label uppercase tracking-[0.12em] text-text-muted">
              Boutique
            </span>
          </div>

          {/* Title with text-split */}
          <h1 className="hero-title font-display text-display-lg text-text-primary mt-3" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300 }}>
            Tirages d&apos;Art
          </h1>

          {/* Subtitle */}
          <p className="hero-anim mt-4 font-body text-body-lg text-text-secondary max-w-[560px]" style={{ fontWeight: 300 }}>
            Tirages limit&eacute;s, sign&eacute;s et num&eacute;rot&eacute;s. Chaque &oelig;uvre est produite avec les plus hauts standards de qualit&eacute; mus&eacute;e.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 2 — FILTER & SORT BAR                                */}
      {/* ============================================================ */}
      <div className="sticky top-[72px] z-40 bg-[rgba(10,10,12,0.95)] backdrop-blur-md border-b border-[rgba(245,240,235,0.06)]">
        <div className="px-8 lg:px-16 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'shrink-0 px-4 py-1.5 font-body text-body-sm transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-accent text-bg-primary'
                    : 'border border-[rgba(245,240,235,0.06)] text-text-secondary hover:text-text-primary hover:border-[rgba(245,240,235,0.12)]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSortOpen((v) => !v);
              }}
              className="flex items-center gap-2 font-body text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <span>Trier par : {currentSortLabel}</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  sortOpen && 'rotate-180'
                )}
              />
            </button>

            {sortOpen && (
              <div
                className="absolute right-0 top-full mt-2 bg-bg-secondary border border-[rgba(245,240,235,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 min-w-[200px] origin-top"
                onClick={(e) => e.stopPropagation()}
              >
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2.5 font-body text-body-sm transition-colors duration-200',
                      sortBy === opt.value
                        ? 'text-text-primary bg-[rgba(245,240,235,0.04)]'
                        : 'text-text-secondary hover:text-text-primary hover:bg-[rgba(245,240,235,0.04)]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 3 — PRODUCT GRID                                     */}
      {/* ============================================================ */}
      <section className="bg-bg-primary px-8 lg:px-16 pt-12 pb-32">
        <div ref={productsRef} className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-display-md text-text-muted">
              Aucun tirage dans cette cat&eacute;gorie
            </p>
          </div>
        )}
      </section>

      {/* ============================================================ */}
      {/*  SECTION 4 — TRUST BANNER                                     */}
      {/* ============================================================ */}
      <section
        ref={trustRef}
        className="bg-bg-tertiary px-8 lg:px-16 py-16"
      >
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {trustItems.map((item) => (
            <div
              key={item.text}
              className="trust-item flex items-center gap-3"
            >
              <item.icon className="w-5 h-5 text-accent shrink-0" />
              <span className="font-body text-body-sm text-text-secondary whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SECTION 5 — NEWSLETTER                                       */}
      {/* ============================================================ */}
      <section
        ref={newsletterRef}
        className="bg-bg-primary px-8 lg:px-16 py-24 relative overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(196,149,106,0.15) 0%, transparent 70%)',
        }}
      >
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="newsletter-anim font-display text-display-md text-text-primary" style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 400 }}>
            Inscrivez-vous pour d&eacute;couvrir les nouvelles &eacute;ditions
          </h2>
          <p className="newsletter-anim mt-4 font-body text-body-md text-text-secondary" style={{ fontWeight: 300 }}>
            Soyez inform&eacute; en avant-premi&egrave;re des nouveaux tirages et &eacute;ditions exclusives.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="newsletter-anim mt-8 flex flex-col sm:flex-row gap-0 max-w-[480px] mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 bg-bg-secondary border border-[rgba(245,240,235,0.06)] px-5 py-3.5 font-body text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <button
                type="submit"
                className="shrink-0 px-6 py-3.5 bg-accent text-bg-primary font-body text-label uppercase tracking-[0.12em] hover:bg-accent-light transition-colors duration-300 mt-3 sm:mt-0"
              >
                S&apos;inscrire
              </button>
            </form>
          ) : (
            <div className="newsletter-anim mt-8 flex items-center justify-center gap-2 text-success font-body text-body-md">
              <Check className="w-5 h-5" />
              <span>Vous &ecirc;tes inscrit ! Merci.</span>
            </div>
          )}

          {!subscribed && (
            <p className="newsletter-anim mt-3 font-body text-caption text-text-muted tracking-[0.08em]">
              Aucun spam. D&eacute;sinscription &agrave; tout moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
