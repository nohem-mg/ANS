'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import {
  ArrowRight,
  Award,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';

// --- Types ---
interface MoodboardImage {
  area: string;
  src: string;
  w: number;
  h: number;
}

// --- Data ---
const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
const P = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const MOODBOARD: MoodboardImage[] = [
  { area: 'a', src: U('1522071820081-009f0129c71c', 600, 400), w: 600, h: 400 },
  { area: 'b', src: P('espresso-machine', 400, 360), w: 400, h: 360 },
  { area: 'c', src: U('1447933601403-0c6688de566e', 500, 750), w: 500, h: 750 },
  { area: 'd', src: U('1495474472287-4d71bcdd2085', 400, 360), w: 400, h: 360 },
  { area: 'e', src: U('1509042239860-f550ce710b93', 700, 360), w: 700, h: 360 },
  { area: 'f', src: U('1461023058943-07fcbe16d735', 300, 360), w: 300, h: 360 },
  { area: 'g', src: P('team-office-wide', 900, 420), w: 900, h: 420 },
  { area: 'h', src: U('1514432324607-a09d9b4aefdd', 500, 420), w: 500, h: 420 },
  { area: 'i', src: U('1497515114629-f71d768fd07c', 300, 420), w: 300, h: 420 },
  { area: 'p', src: P('barista-portrait', 400, 650), w: 400, h: 650 },
  { area: 'k', src: P('coffee-grains', 300, 280), w: 300, h: 280 },
  { area: 'l', src: P('coffee-beans-wide', 700, 280), w: 700, h: 280 },
  { area: 'm', src: U('1553877522-43269d4ea984', 900, 280), w: 900, h: 280 },
  { area: 'n', src: U('1507133750040-4a8f57021571', 500, 280), w: 500, h: 280 },
];

const TESTIMONIALS = [
  {
    name: "Thomas D.",
    review: "Un service irréprochable et régulier. Les machines sont modernes, le café d'excellente qualité, et les équipes très réactives au moindre souci. Un vrai plus pour la pause !",
  },
  {
    name: "Sandrine L.",
    review: "Nous avons fait installer un espace détente complet avec ANS. Rien à dire, c'est design, le passage du technicien est très discret et nos collaborateurs sont ravis de la qualité des produits.",
  },
  {
    name: "Michel B.",
    review: "Entreprise à l'écoute et très pro. On sent l'esprit familial et l'envie de bien faire. Ça change vraiment des gros prestataires classiques impersonnels. Je recommande.",
  }
];

// --- Components ---

// 1. "Infusion" Loader
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep-roast text-coffee-cream"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 2.5, duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/logo-ans-entier.png"
            alt="A.N.S — Pause Évasion"
            width={280}
            height={120}
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>

        {/* Horizontal underline growing left to right */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 1.0, ease: "easeInOut" }}
          className="h-px bg-golden-extraction/60 w-[280px]"
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

// 2. Stylized Coffee Bean Background
const CoffeeBeanParticles = () => {
  // Generates random positions for background elements
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-golden-extraction blur-xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 3. Squared Button — matches /about design language
const CapsuleButton = ({ children, href, variant = 'primary' }: { children: React.ReactNode, href: string, variant?: 'primary' | 'secondary' }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center px-7 py-3 rounded font-medium text-sm tracking-widest uppercase overflow-hidden group ${variant === 'primary'
        ? 'bg-sienna-racing text-white'
        : 'bg-transparent border border-coffee-cream/20 text-coffee-cream hover:border-golden-extraction/60 hover:text-golden-extraction'
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.a>
  );
};

// 4. Moodboard Grid
const MoodboardGrid = () => {
  return (
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <style>{`
        /* ── Desktop: 12-col irregular mosaic ── */
        .ans-moodboard {
          display: grid;
          gap: 12px;
          padding: 80px 32px 32px;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 180px 200px 160px;
          grid-template-areas:
            "a  a  b  b  c  c  c  d  d  e  e  f "
            "g  g  g  g  c  c  c  h  h  i  p  p "
            "k  l  l  l  m  m  m  m  n  n  p  p ";
        }

        /* ── Tablet: 4-col simplified ── */
        @media (max-width: 1024px) {
          .ans-moodboard {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 210px);
            grid-template-areas:
              "a  a  b  c "
              "g  g  h  c "
              "k  l  l  n ";
            gap: 10px;
            padding: 10px 32px;
          }
          .ans-moodboard-cell { grid-area: unset !important; }
          .ans-cell-a { grid-area: a !important; }
          .ans-cell-b { grid-area: b !important; }
          .ans-cell-c { grid-area: c !important; }
          .ans-cell-g { grid-area: g !important; }
          .ans-cell-h { grid-area: h !important; }
          .ans-cell-k { grid-area: k !important; }
          .ans-cell-l { grid-area: l !important; }
          .ans-cell-n { grid-area: n !important; }
          .ans-cell-d, .ans-cell-e, .ans-cell-f,
          .ans-cell-i, .ans-cell-m, .ans-cell-p { display: none; }
        }

        /* ── Mobile: 2-col simple stack ── */
        @media (max-width: 640px) {
          .ans-moodboard {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 170px);
            grid-template-areas: none;
            gap: 8px;
            padding: 8px 16px;
          }
          .ans-moodboard-cell { grid-area: auto !important; }
          .ans-cell-c, .ans-cell-g, .ans-cell-h,
          .ans-cell-i, .ans-cell-l, .ans-cell-m,
          .ans-cell-n, .ans-cell-p { display: none; }
        }

        /* ── Shared cell styles ── */
        .ans-moodboard-cell {
          overflow: hidden;
          position: relative;
          border-radius: 7px;
        }
        .ans-moodboard-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 7px;
        }
        .ans-moodboard-inner img {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ans-moodboard-cell:hover .ans-moodboard-inner img {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .ans-moodboard-cell:hover .ans-moodboard-inner img { transform: none; }
        }
      `}</style>

      <div className="ans-moodboard">
        {MOODBOARD.map(({ area, src, w }) => (
          <div
            key={area}
            className={`ans-moodboard-cell ans-cell-${area}`}
            style={{ gridArea: area }}
          >
            <div className="ans-moodboard-inner">
              <Image
                src={src}
                alt=""
                fill
                unoptimized
                style={{ objectFit: 'cover' }}
                sizes={`(max-width: 640px) 50vw, (max-width: 1024px) 33vw, ${w}px`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// 5. Timeline — horizontal editorial 3-column design
const MILESTONES = [
  {
    year: '1980',
    title: 'La Genèse',
    desc: "Fondation d'une entreprise familiale avec une mission simple : apporter de la convivialité dans les bureaux.",
  },
  {
    year: '2000',
    title: "L'Expansion",
    desc: "Intégration du groupement Prodia+ pour garantir une couverture nationale tout en gardant notre indépendance.",
  },
  {
    year: '2024',
    title: 'La Révolution QVT',
    desc: "Transformation vers des solutions de bien-être global. Plus que du café, des espaces de vie.",
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <div ref={sectionRef} className="relative">
      {/* Connecting line track */}
      <div className="relative hidden md:block mb-0">
        <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-coffee-cream/8" />
        {/* Animated golden fill */}
        <motion.div
          className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-golden-extraction/40 origin-left"
          style={{ scaleX: lineScaleX }}
        />
        {/* Dots at each column center */}
        {MILESTONES.map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sienna-racing border-2 border-deep-roast"
            style={{ left: `${16.67 + i * 33.33}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.4, ease: 'backOut' }}
          />
        ))}
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            className="relative px-12 pt-16 pb-10 md:border-r border-coffee-cream/8 last:border-r-0 overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Year label */}
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-8">
              {m.year}
            </div>

            {/* Title */}
            <h3
              className="text-coffee-cream mb-5 leading-tight"
              style={{
                fontFamily: 'var(--font-sora)',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.45rem)',
                fontWeight: 600,
              }}
            >
              {m.title}
            </h3>

            {/* Hairline */}
            <div className="w-10 h-px bg-golden-extraction/40 mb-5" />

            {/* Description */}
            <p className="text-coffee-cream/45 leading-relaxed" style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-ibm-plex-sans)' }}>
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 6. Technical inline SVG icons — stroke only, no fill, no backgrounds
const CoffeeCornerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="14" height="14" rx="1" />
    <path d="M17 10h2a2 2 0 0 1 0 4h-2" />
    <path d="M7 6V4a2 2 0 0 1 4 0v2" />
    <path d="M8 13h4" />
  </svg>
);

const MaintenanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="14" r="7" />
    <path d="M12 10v4l2.5 2" />
    <path d="M9.5 3h5" />
    <path d="M12 3v3" />
  </svg>
);

const PartnershipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3l4 4-4 4" />
    <path d="M21 7H9a4 4 0 0 0-4 4v1" />
    <path d="M7 21l-4-4 4-4" />
    <path d="M3 17h12a4 4 0 0 0 4-4v-1" />
  </svg>
);

// 7. Service Row — Technical Datasheet / Spec-Sheet Style
const ServiceRow = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 65%"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, paddingTop: 'clamp(2rem, 5vw, 4rem)', paddingBottom: 'clamp(2rem, 5vw, 4rem)' }}
      className="group relative flex flex-col md:flex-row md:items-center gap-5 md:gap-16 border-b border-coffee-cream/[0.12] overflow-hidden"
    >
      {/* Left column: icon + title */}
      <div className="md:w-[30%] flex items-center gap-4 flex-shrink-0 relative z-10">
        <div className="text-coffee-cream/40 group-hover:text-golden-extraction transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
        <h3
          className="text-coffee-cream font-semibold"
          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {title}
        </h3>
      </div>

      {/* Right column: description */}
      <p
        className="md:w-[70%] text-coffee-cream/60 relative z-10 group-hover:text-coffee-cream/80 transition-colors duration-300"
        style={{ lineHeight: 1.75, fontSize: 'clamp(0.875rem, 1.05vw, 1rem)', fontFamily: 'var(--font-ibm-plex-sans)' }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

/* 8. Vision Section with Interactive Gallery */
const VISION_POINTS = [
  {
    id: 'deconnexion',
    img: '/pause-evasion.png',
    title: 'Le "Reset" Sensoriel',
    desc: "Une pause réussie mobilise les sens pour couper court à la fatigue des écrans. Le son du broyeur, l'arôme d'un grain fraîchement torréfié, la mousse d'un latte : un petit rituel physique qui fait chuter la charge mentale et relance immédiatement la concentration.",
  },
  {
    id: 'liens',
    img: '/convivialite-equipe.png',
    title: 'Le Collisionneur d\'Idées',
    desc: "Les meilleures décisions ne naissent pas toujours en salle de réunion. Nos espaces sont conçus comme des points de rencontre privilégiés : ils provoquent ces discussions informelles entre les différents départements, brisant naturellement les silos dans l'entreprise.",
  },
  {
    id: 'bienetre',
    img: '/qualite-vie-travail.png',
    title: 'Le Marqueur d\'Attention',
    desc: "Ce que vous mettez dans la tasse de vos collaborateurs en dit long sur la façon dont vous les valorisez. Offrir une expérience digne d'un véritable coffee shop sur le lieu de travail est un levier concret et quotidien de Qualité de Vie au Travail (QVT).",
  },
  {
    id: 'serenite',
    img: '/solution-simplicite.png',
    title: 'La Fluidité Invisible',
    desc: "Pour qu'une pause soit reposante, la logistique doit s'effacer. Grâce à nos parcs de machines connectées, nous anticipons l'entretien préventif et les réapprovisionnements avant que vous ne manquiez de quoi que ce soit. Vous ne voyez qu'un café toujours prêt.",
  },
];

const VisionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="pause-vision" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F2DECA]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left Side: Text Content & Navigation */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span
              className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-5"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Notre Vision
            </span>
            <h2
              className="text-coffee-cream leading-tight mb-8"
              style={{
                fontFamily: 'var(--font-sora)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 600,
              }}
            >
              La machine à café n'est plus un meuble.
              <br />
              <span className="text-sienna-racing">C'est le cœur battant de vos bureaux.</span>
            </h2>
            <p
              className="text-coffee-cream/50 leading-relaxed"
              style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              Fini le café avalé à la hâte dans un couloir froid. La vraie pause est un moment stratégique invisible. C'est le sas de décompression qui préserve le capital énergie de vos équipes, et la « place du village » où se forge votre culture d'entreprise. Chez ANS, nous aménageons ces quelques mètres carrés pour en faire de véritables refuges sensoriels et conviviaux.
            </p>
          </motion.div>

          {/* Interactive Accordion List */}
          <div className="flex flex-col gap-2 relative">
            {/* Vertical progressive line */}
            <div className="absolute left-[1px] top-0 bottom-0 w-[2px] bg-coffee-cream/10 hidden lg:block" />

            {VISION_POINTS.map((point, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={point.id}
                  className={`relative cursor-pointer pl-6 py-4 transition-all duration-500 group border-l-2 lg:border-l-0 ${isActive ? 'border-golden-extraction' : 'border-coffee-cream/10'}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Custom active line for desktop */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-golden-extraction hidden lg:block"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-center gap-4 mb-2">
                    <span className={`text-xs font-mono transition-colors duration-500 ${isActive ? 'text-golden-extraction' : 'text-coffee-cream/20'}`}>
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-xl md:text-2xl transition-colors duration-500 ${isActive ? 'text-coffee-cream font-semibold' : 'text-coffee-cream/40 font-medium group-hover:text-coffee-cream/70'}`}
                      style={{ fontFamily: 'var(--font-sora)' }}
                    >
                      {point.title}
                    </h3>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    className="overflow-hidden"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-coffee-cream/60 leading-relaxed text-sm pt-2 pb-1 pr-4"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                      {point.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Floating Image Display */}
        <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[700px] relative rounded-[2rem] overflow-hidden bg-white/5 shadow-2xl">
          {VISION_POINTS.map((point, index) => (
            <motion.div
              key={point.id}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                scale: activeIndex === index ? 1 : 1.05,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              style={{ pointerEvents: activeIndex === index ? 'auto' : 'none', zIndex: activeIndex === index ? 10 : 0 }}
            >
              <Image
                src={point.img}
                alt={point.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle inner gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-deep-roast/90 via-deep-roast/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Force scroll to top and lock body during loader
  useEffect(() => {
    window.scrollTo(0, 0);
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading]);
  return (
    <>
      {/* Loader overlay — always on top, fades out then unmounts */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div
        ref={containerRef}
        className="min-h-screen bg-deep-roast text-coffee-cream font-sans selection:bg-golden-extraction selection:text-deep-roast overflow-x-hidden"
        style={loading ? { overflow: 'hidden', height: '100vh', pointerEvents: 'none' } : undefined}
      >
        <CoffeeBeanParticles />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sienna-racing to-golden-extraction origin-left z-50"
          style={{ scaleX }}
        />

        {/* Hero Section — cream frame + dark widget */}
        <section
          style={{
            backgroundColor: '#F2DECA',
            height: 'calc(100vh - 68px)',
            padding: 'clamp(10px, 1.2vw, 14px) clamp(16px, 4vw, 48px)',
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              backgroundColor: '#2B1200',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 48px rgba(0,0,0,0.35)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Light dot grid */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            />
            {/* Amber glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '900px', height: '900px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,118,58,0.12) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Background Moodboard Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-40">
              <MoodboardGrid />
            </div>

            {/* Simple solid dark overlay for text contrast instead of gradient */}
            <div className="absolute inset-0 z-0 bg-[#2B1200]/30 pointer-events-none" />

            {/* Content — centered like /about hero */}
            {/* ── Stars · headline · subtitle · two pills ── */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center flex flex-col items-center justify-center h-full">

              {/* Stars rating */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="flex items-center justify-center gap-2.5 mb-10"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-golden-extraction text-base leading-none">★</span>
                  ))}
                </div>
                <span className="text-coffee-cream/40 text-xs font-mono tracking-widest">
                  4.9 / 5 · 200+ entreprises partenaires
                </span>
              </motion.div>

              {/* Big serif headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)',
                  fontFamily: 'var(--font-sora)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-coffee-cream)',
                  marginBottom: '1.75rem',
                }}
              >
                Faites de la pause un moment qui compte
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.8 }}
                className="text-base text-coffee-cream/80 leading-relaxed mx-auto max-w-lg mb-10"
              >
                Depuis 40 ans, nous transformons la pause café en un levier de Qualité de Vie au Travail.
                Service ultra-personnalisé, réactivité immédiate et engagement familial.
              </motion.p>

              {/* Pill CTAs — matching reference button shapes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <motion.a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      animate(window.scrollY, y, {
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate: (value) => window.scrollTo(0, value),
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-deep-roast bg-coffee-cream"
                  style={{ borderRadius: 999 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Découvrir notre approche
                </motion.a>
                <motion.a
                  href="#adn"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('adn');
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      animate(window.scrollY, y, {
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate: (value) => window.scrollTo(0, value),
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-coffee-cream border border-coffee-cream/20"
                  style={{ borderRadius: 999 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(245,230,211,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Notre Histoire
                </motion.a>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ delay: 2, duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-golden-extraction/40"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── "Notre Vision" Section (Interactive Gallery) ── */}
        <VisionSection />


        {/* Services Section — Spec-Sheet Layout */}
        <section id="services" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <span className="text-golden-extraction text-[10px] tracking-[0.22em] uppercase mb-5 block" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>Notre Savoir-Faire</span>
                <h2 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'var(--font-sora)', fontWeight: 600 }}>
                  L'Excellence de la <span className="text-sienna-racing">Pause Technique.</span>
                </h2>
              </div>
              <p className="max-w-sm text-coffee-cream/50 leading-relaxed text-sm md:text-right" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                Des équipements de pointe pilotés par une équipe humaine dédiée.{' '}
                La technologie au service de l'humain.
              </p>
            </div>

            {/* Spec-sheet rows */}
            <div className="border-t border-coffee-cream/[0.12]">
              <ServiceRow
                title="Coffee Corners"
                desc="Architecture d'espaces de pause premium. Mobilier design et ambiance feutrée pour favoriser les échanges."
                icon={<CoffeeCornerIcon />}
              />
              <ServiceRow
                title="Disponibilité Totale"
                desc="Notre promesse : une réactivité sans faille. Une machine à l'arrêt, c'est une pause gâchée. Nous ne laissons jamais cela arriver."
                icon={<MaintenanceIcon />}
              />
              <ServiceRow
                title="Partenariat Durable"
                desc="La fidélisation est notre KPI principal. Nous construisons des relations long terme basées sur la confiance et la transparence."
                icon={<PartnershipIcon />}
              />
            </div>

          </div>
        </section>

        {/* Testimonials / Cas Clients Section */}
        <section id="avis" className="py-24 relative bg-deep-roast/50">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4">
                La parole à nos clients
              </span>
              <h2
                className="text-coffee-cream leading-tight mb-8"
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 600,
                }}
              >
                Une expérience appréciée
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                  className="bg-white/5 border border-coffee-cream/10 p-8 rounded-lg flex flex-col"
                >
                  <div className="flex gap-1 mb-4 text-golden-extraction">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-coffee-cream/80 italic mb-6 flex-grow leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sienna-racing/40 flex items-center justify-center text-golden-extraction font-bold" style={{ fontFamily: 'var(--font-sora)' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-coffee-cream font-medium text-sm" style={{ fontFamily: 'var(--font-sora)' }}>{t.name}</p>
                      <p className="text-coffee-cream/40 text-xs mt-0.5" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>Avis Google</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/Prodia+%2B+ANS+(Automatique+Nord+Service)/@50.1529539,3.2171998,18z/data=!3m1!4b1!4m6!3m5!1s0x47c2966792d94f13:0x824371045fc07674!8m2!3d50.1529539!4d3.2187845!16s%2Fg%2F1ptwl3984?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-golden-extraction hover:text-white transition-colors duration-300 border-b border-golden-extraction/30 pb-1 text-sm tracking-widest uppercase font-mono"
              >
                Voir nos avis sur Google <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ADN Section (Timeline) */}
        <section id="adn" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-10 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
            >
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4">
                  Notre Histoire
                </span>
                <h2
                  className="text-coffee-cream leading-tight"
                  style={{
                    fontFamily: 'var(--font-sora)',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 600,
                  }}
                >
                  40 Ans d'Excellence
                </h2>
              </div>
              <p className="text-coffee-cream/35 text-sm max-w-xs leading-relaxed md:text-right" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                De l'entreprise familiale au partenaire QVT de référence.
              </p>
            </motion.div>

            <Timeline />
          </div>
        </section>



        {/* Footer / Contact CTA */}
        <section id="contact" className="py-20 relative overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-sienna-racing/10 to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl mb-8 tracking-tight" style={{ fontFamily: 'var(--font-sora)', fontWeight: 600 }}>Prêt pour l'infusion ?</h2>
            <p className="text-xl text-coffee-cream/60 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
              Discutons de votre projet d'espace détente. Nos experts sont prêts à concevoir la solution idéale pour vos collaborateurs.
            </p>

            <form className="max-w-md mx-auto space-y-4 text-left">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="w-full bg-white/5 border border-coffee-cream/10 rounded px-6 py-4 text-coffee-cream text-sm focus:outline-none focus:border-golden-extraction/50 transition-colors"
                  style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                />
                <div className="absolute inset-0 rounded bg-gradient-to-r from-sienna-racing/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <button className="w-full bg-golden-extraction text-deep-roast font-bold py-4 rounded text-sm tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                Lancer la discussion <ArrowRight className="w-5 h-5" />
              </button>
            </form>


          </div>
        </section>


      </div>
    </>
  );
}
