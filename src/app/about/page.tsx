'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Github, Globe } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPESCRIPT INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

interface Value {
  letter: string;
  title: string;
  description: string;
}

interface Job {
  title: string;
  location: string;
}

interface TeamMember {
  name: string;
  role: string;
  picId: number;
  twitter?: string;
  github?: string;
  website?: string;
}

interface Partner {
  name: string;
}

interface NewsItem {
  tag: string;
  title: string;
  picSeed: string;
}

interface NavItem {
  label: string;
  anchor: string;
}

interface MoodboardImage {
  area: string;
  src: string;
  w: number;
  h: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Nos Valeurs', anchor: 'nos-valeurs' },
  { label: "Rejoindre l'équipe", anchor: 'rejoindre' },
  { label: "L'Équipe", anchor: 'equipe' }
];

const VALUES: Value[] = [
  {
    letter: 'A',
    title: 'Fiabilité',
    description:
      "Nos machines tournent. Toujours. La disponibilité n'est pas une option, c'est notre standard.",
  },
  {
    letter: 'B',
    title: 'Transparence',
    description:
      'Reporting clair, interventions traçables. Vous savez exactement ce qui se passe sur votre parc.',
  },
  {
    letter: 'C',
    title: 'Réactivité',
    description:
      "Une panne signalée, c'est une panne résolue en moins de 4h. Nous ne laissons jamais une pause gâchée.",
  },
  {
    letter: 'D',
    title: 'Qualité',
    description:
      "Sélection rigoureuse des produits et des machines. Nous ne proposons que ce que nous servons nous-mêmes.",
  },
  {
    letter: 'E',
    title: 'Proximité',
    description:
      "Un interlocuteur dédié. Pas un call center, une vraie relation de partenariat.",
  },
  {
    letter: 'F',
    title: 'Innovation',
    description:
      "Nous intégrons continuellement les nouvelles technologies pour améliorer l'expérience utilisateur.",
  },
];

const JOBS: Job[] = [
  { title: 'Technicien de Maintenance', location: 'Île-de-France' },
  { title: 'Responsable de Compte', location: 'Paris' },
  { title: 'Chargé(e) de Logistique', location: 'National' },
  { title: 'Commercial(e) B2B', location: 'Région Parisienne' },
];

const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Marc Dufresne', role: 'PDG / Fondateur', picId: 1011, twitter: '#', website: '#' },
  { name: 'Sophie Renard', role: 'Directrice des Opérations', picId: 1024, twitter: '#', github: '#' },
  { name: 'Julien Moreau', role: 'Responsable Technique', picId: 1025, twitter: '#', github: '#', website: '#' },
  { name: 'Claire Petit', role: 'Chargée de Relation Client', picId: 1027, twitter: '#', website: '#' },
  { name: 'Antoine Lefebvre', role: 'Technicien Senior', picId: 1012, twitter: '#', github: '#' },
  { name: 'Emma Blanc', role: 'Responsable Commercial', picId: 1047, twitter: '#', website: '#' },
  { name: 'Thomas Girard', role: 'Ingénieur Produit', picId: 1015, twitter: '#', github: '#', website: '#' },
  { name: 'Lucie Bernard', role: 'Chargée Marketing', picId: 1032, twitter: '#' },
  { name: 'Alexandre Faure', role: 'Technicien de Maintenance', picId: 1062, twitter: '#', github: '#' },
  { name: 'Camille Dupont', role: 'Chargée des Ressources Humaines', picId: 1042, twitter: '#', website: '#' },
  { name: 'Nicolas Brun', role: 'Responsable Logistique', picId: 1033, twitter: '#' },
  { name: 'Marie-Laure Vidal', role: 'Ingénieure Qualité', picId: 1053, twitter: '#', github: '#' },
  { name: 'Romain Tessier', role: 'Développeur IoT', picId: 1019, twitter: '#', github: '#', website: '#' },
  { name: 'Isabelle Morin', role: 'Directrice Financière', picId: 1035, twitter: '#', website: '#' },
];

const PARTNERS: Partner[] = [
  { name: 'Sodexo' },
  { name: 'Elior' },
  { name: 'Lactalis' },
  { name: 'Renault' },
  { name: 'BNP Paribas' },
  { name: 'Crédit Agricole' },
  { name: 'Sanofi' },
  { name: 'Thales' },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    tag: 'Innovation',
    title: 'Nos nouvelles machines connectées arrivent en 2025',
    picSeed: 'ans-news-tech',
  },
  {
    tag: 'Partenariat',
    title: 'Partenariat stratégique : 200 nouveaux points de vente',
    picSeed: 'ans-news-partner',
  },
  {
    tag: 'Produit',
    title: "Comment nous avons réduit le temps d'intervention de 60%",
    picSeed: 'ans-news-product',
  },
];

/* Replace: team photo, office, machine installation, client site, maintenance tech, barista/coffee moment */
// Replace src values with your own production photos
const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
const P = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const MOODBOARD: MoodboardImage[] = [
  { area: 'a', src: U('1522071820081-009f0129c71c', 600, 400), w: 600, h: 400 }, /* team collaboration */
  { area: 'b', src: P('espresso-machine', 400, 360), w: 400, h: 360 }, /* espresso machine */
  { area: 'c', src: U('1447933601403-0c6688de566e', 500, 750), w: 500, h: 750 }, /* coffee beans tall */
  { area: 'd', src: U('1495474472287-4d71bcdd2085', 400, 360), w: 400, h: 360 }, /* latte art */
  { area: 'e', src: U('1509042239860-f550ce710b93', 700, 360), w: 700, h: 360 }, /* coffee on desk */
  { area: 'f', src: U('1461023058943-07fcbe16d735', 300, 360), w: 300, h: 360 }, /* pour-over coffee */
  { area: 'g', src: P('team-office-wide', 900, 420), w: 900, h: 420 }, /* team building wide */
  { area: 'h', src: U('1514432324607-a09d9b4aefdd', 500, 420), w: 500, h: 420 }, /* coffee shop */
  { area: 'i', src: U('1497515114629-f71d768fd07c', 300, 420), w: 300, h: 420 }, /* coffee beans */
  { area: 'p', src: P('barista-portrait', 400, 650), w: 400, h: 650 }, /* barista tall */
  { area: 'k', src: P('coffee-grains', 300, 280), w: 300, h: 280 }, /* coffee grains */
  { area: 'l', src: P('coffee-beans-wide', 700, 280), w: 700, h: 280 }, /* coffee beans wide */
  { area: 'm', src: U('1553877522-43269d4ea984', 900, 280), w: 900, h: 280 }, /* team meeting wide */
  { area: 'n', src: U('1507133750040-4a8f57021571', 500, 280), w: 500, h: 280 }, /* coffee steam */
];

const FOOTER_NAV = [
  { label: 'À Propos', href: '/about' },
  { label: 'Nos Solutions', href: '#' },
  { label: 'Contact', href: '#' }
];

const FOOTER_LEGAL = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
];

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg: '#2B1200',
  surface: '#3A1A06',
  footer: '#1A0800',
  accent: '#C8763A',
  textPrimary: '#F5E6D3',
  textMuted: 'rgba(245,230,211,0.55)',
  divider: 'rgba(245,230,211,0.12)',
} as const;

const FONT = {
  display: "var(--font-sora, var(--font-playfair, 'Georgia', serif))",
  body: "var(--font-ibm-plex-sans, var(--font-geist-sans, sans-serif))",
  mono: "var(--font-ibm-plex-mono, var(--font-geist-mono, monospace))",
} as const;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const staggerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  if (shouldReduce) {
    return (
      <div ref={ref} style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerIn({
  children,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (shouldReduce) {
    return (
      <div ref={ref} style={style} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChild({
  children,
  style = {},
  className = '',
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUpVariant} style={style} className={className}>
      {children}
    </motion.div>
  );
}

function GhostNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontSize: 'clamp(120px, 15vw, 200px)',
        fontFamily: FONT.mono,
        fontWeight: 700,
        opacity: 0.06,
        position: 'absolute',
        left: '-0.04em',
        top: '-0.35em',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        color: C.textPrimary,
        zIndex: 0,
      }}
    >
      {n}
    </span>
  );
}

function SectionTag({ index, label }: { index: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: '11px',
          color: C.textMuted,
          letterSpacing: '0.1em',
        }}
      >
        {index}
      </span>
      <span
        style={{
          width: 28,
          height: 1,
          backgroundColor: C.divider,
          display: 'inline-block',
        }}
      />
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: '11px',
          color: C.accent,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// InternalNav removed — now using shared Header from layout

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: HERO / MANIFESTO
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    /* Hero fills its absolutely-positioned container */
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(48px, 8vw, 100px) clamp(24px, 6vw, 80px)',
      }}
    >
      {/* Light dot grid on dark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />
      {/* Warm amber glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(200,118,58,0.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 860,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          style={{
            fontFamily: FONT.mono,
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: C.accent,
            textTransform: 'uppercase',
            marginBottom: '44px',
          }}
        >
          À Propos · ANS
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: EASE_OUT }}
          style={{
            fontSize: 'clamp(26px, 3.8vw, 50px)',
            fontFamily: FONT.display,
            fontWeight: 600,
            lineHeight: 1.22,
            color: C.textPrimary,
            letterSpacing: '-0.025em',
            margin: 0,
          }}
        >
          Les distributeurs de boissons sont le premier point de contact
          entre une entreprise et ses collaborateurs.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease: EASE_OUT }}
          style={{
            fontSize: 'clamp(26px, 3.8vw, 50px)',
            fontFamily: FONT.display,
            fontWeight: 300,
            lineHeight: 1.22,
            color: C.accent,
            letterSpacing: '-0.025em',
            marginTop: '14px',
            marginBottom: 0,
          }}
        >
          Chez ANS, nous faisons en sorte que ce moment soit toujours
          parfait.
        </motion.p>

        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.45 }}
          transition={{ duration: 1.2, delay: 1.1, ease: 'easeOut' }}
          style={{
            width: 1,
            height: 52,
            backgroundColor: C.accent,
            margin: '52px auto 0',
            transformOrigin: 'top',
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: PHOTO MOODBOARD GRID
// ─────────────────────────────────────────────────────────────────────────────

function MoodboardGrid() {
  return (
    /* Moodboard fills its absolutely-positioned container; scroll-driven reveal handled by parent */
    <div style={{ height: '100%', overflow: 'hidden' }}>
      <style>{`
        /* ── Desktop: 12-col irregular mosaic ── */
        .ans-moodboard {
          display: grid;
          gap: 12px;
          padding: 80px 32px 32px;
          background-color: #2B1200;
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
          /* Reset all inline grid-area styles so named areas above apply cleanly */
          .ans-moodboard-cell { grid-area: unset !important; }
          .ans-cell-a { grid-area: a !important; }
          .ans-cell-b { grid-area: b !important; }
          .ans-cell-c { grid-area: c !important; }
          .ans-cell-g { grid-area: g !important; }
          .ans-cell-h { grid-area: h !important; }
          .ans-cell-k { grid-area: k !important; }
          .ans-cell-l { grid-area: l !important; }
          .ans-cell-n { grid-area: n !important; }
          /* Hide cells not in tablet layout */
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
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .ans-moodboard-cell:hover .ans-moodboard-inner {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .ans-moodboard-cell:hover .ans-moodboard-inner { transform: none; }
        }
      `}</style>

      <div className="ans-moodboard">
        {MOODBOARD.map(({ area, src, w, h }) => (
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
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: NOS VALEURS
// ─────────────────────────────────────────────────────────────────────────────

function ValueCard({ value, index }: { value: Value; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: EASE_OUT,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `1px solid ${C.divider}`,
        padding: '28px 0 32px',
        cursor: 'default',
      }}
    >
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: '48px',
          fontWeight: 700,
          color: C.accent,
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
          lineHeight: 1,
          display: 'block',
          marginBottom: '18px',
        }}
      >
        {value.letter}
      </span>
      <h3
        style={{
          fontFamily: FONT.display,
          fontSize: '19px',
          fontWeight: 700,
          color: C.textPrimary,
          marginBottom: '10px',
          letterSpacing: '-0.01em',
        }}
      >
        {value.title}
      </h3>
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: '14px',
          color: C.textMuted,
          lineHeight: 1.7,
          maxWidth: 340,
          margin: 0,
        }}
      >
        {value.description}
      </p>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section
      id="nos-valeurs"
      style={{
        backgroundColor: C.bg,
        padding: '128px 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn style={{ marginBottom: '80px', position: 'relative' }}>
          <GhostNumber n="03" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag index="03" label="Valeurs" />
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                color: C.textPrimary,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '18px',
              }}
            >
              Nos Valeurs
            </h2>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: '16px',
                color: C.textMuted,
                maxWidth: 520,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Nous construisons des partenariats durables avec rigueur et
              transparence.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '0 56px',
          }}
        >
          {VALUES.map((v, i) => (
            <ValueCard key={v.letter} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: CARRIÈRES / NOUS REJOINDRE
// ─────────────────────────────────────────────────────────────────────────────

function JobRow({ job, index }: { job: Job; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE_OUT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 0',
        borderBottom: `1px solid ${C.divider}`,
        cursor: 'pointer',
        gap: '24px',
      }}
    >
      <span
        style={{
          fontFamily: FONT.body,
          fontSize: '15px',
          fontWeight: 500,
          color: hovered ? C.textPrimary : `rgba(245,230,211,0.85)`,
          transition: 'color 0.2s',
        }}
      >
        {job.title}
      </span>

      {/* Location pill badge */}
      <span
        style={{
          fontFamily: FONT.mono,
          fontSize: '11px',
          color: hovered ? C.textPrimary : C.textMuted,
          letterSpacing: '0.06em',
          border: `1px solid ${hovered ? C.textMuted : C.divider}`,
          borderRadius: '999px',
          padding: '4px 12px',
          flexShrink: 0,
          transition: 'color 0.2s, border-color 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {job.location}
      </span>
    </motion.div>
  );
}

function CareersSection() {
  return (
    <section
      id="rejoindre"
      style={{
        backgroundColor: C.surface,
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '80px',
          alignItems: 'start',
        }}
      >
        {/* ── Left column: heading + description + CTA ── */}
        <FadeIn style={{ position: 'relative' }}>
          <GhostNumber n="04" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag index="04" label="Carrières" />
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                color: C.textPrimary,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}
            >
              Nous Rejoindre
            </h2>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: '14px',
                color: C.textMuted,
                lineHeight: 1.75,
                margin: '0 0 8px',
              }}
            >
              Le café, c&apos;est sérieux.
            </p>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: '14px',
                color: C.textMuted,
                lineHeight: 1.75,
                margin: '0 0 32px',
                maxWidth: 300,
              }}
            >
              Rejoignez une équipe passionnée qui le prouve chaque jour sur
              le terrain.
            </p>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: FONT.mono,
                fontSize: '12px',
                color: C.textPrimary,
                textDecoration: 'none',
                border: `1px solid ${C.divider}`,
                borderRadius: '999px',
                padding: '10px 20px',
                letterSpacing: '0.06em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.accent;
                e.currentTarget.style.color = C.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.divider;
                e.currentTarget.style.color = C.textPrimary;
              }}
            >
              Voir toutes nos offres
              <ArrowRight size={12} />
            </a>
          </div>
        </FadeIn>

        {/* ── Right column: job rows ── */}
        <div style={{ paddingTop: '4px' }}>
          {/* Top border above first row */}
          <div style={{ borderTop: `1px solid ${C.divider}` }} />
          {JOBS.map((job, i) => (
            <JobRow key={i} job={job} index={i} />
          ))}
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #rejoindre > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: L'ÉQUIPE
// ─────────────────────────────────────────────────────────────────────────────

// Inline X (Twitter) icon — stable across lucide-react versions
const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function TeamCard({
  member,
  isFirstRow,
}: {
  member: TeamMember;
  isFirstRow: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hasSocial = member.twitter || member.github || member.website;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 28px 24px',
        borderRight: `1px solid ${C.divider}`,
        borderBottom: isFirstRow ? `1px solid ${C.divider}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '200px',
        cursor: 'default',
      }}
    >
      {/* Circular grayscale photo */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '20px',
          flexShrink: 0,
        }}
      >
        <Image
          src={`https://picsum.photos/seed/${member.picId}/200/200`}
          alt={member.name}
          fill
          unoptimized
          style={{ objectFit: 'cover', filter: 'grayscale(100%)' }}
          sizes="52px"
        />
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: FONT.display,
          fontSize: 'clamp(16px, 1.5vw, 21px)',
          fontWeight: 700,
          color: hovered ? C.accent : C.textPrimary,
          transition: 'color 0.25s',
          margin: '0 0 6px',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        {member.name}
      </p>

      {/* Role */}
      <p
        style={{
          fontFamily: FONT.body,
          fontSize: '12px',
          color: C.textMuted,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {member.role}
      </p>

      {/* Social icons — pushed to bottom */}
      {hasSocial && (
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {member.twitter && (
            <a
              href={member.twitter}
              style={{
                color: C.textMuted,
                transition: 'color 0.2s',
                display: 'flex',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.textPrimary)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              aria-label="X / Twitter"
            >
              <XIcon size={14} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              style={{
                color: C.textMuted,
                transition: 'color 0.2s',
                display: 'flex',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.textPrimary)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              style={{
                color: C.textMuted,
                transition: 'color 0.2s',
                display: 'flex',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.textPrimary)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
              aria-label="Site web"
            >
              <Globe size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

const CARD_COL_WIDTH = 310; // px — fixed column width drives scroll math

function ScrollArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={dir === 'left' ? 'Précédent' : 'Suivant'}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: `1px solid ${hovered && !disabled ? C.accent : C.divider}`,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.25 : 1,
        transition: 'border-color 0.2s, opacity 0.2s',
        color: hovered && !disabled ? C.accent : C.textMuted,
        flexShrink: 0,
      }}
    >
      {dir === 'left' ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
    </button>
  );
}

function TeamSection() {
  const numCols = Math.ceil(TEAM_MEMBERS.length / 2);
  const firstRow = TEAM_MEMBERS.slice(0, numCols);
  const secondRow = TEAM_MEMBERS.slice(numCols);
  const ordered = [...firstRow, ...secondRow];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'right' ? CARD_COL_WIDTH * 2 : -CARD_COL_WIDTH * 2,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="equipe"
      style={{ backgroundColor: C.bg, padding: '128px 0' }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px 56px',
          position: 'relative',
        }}
      >
        <FadeIn>
          <GhostNumber n="05" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '48px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <SectionTag index="05" label="Équipe" />
              <h2
                style={{
                  fontFamily: FONT.display,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 700,
                  color: C.textPrimary,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                L&apos;Équipe
              </h2>
            </div>

            {/* Subtitle + arrow controls */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '20px',
              }}
            >
              <p
                style={{
                  fontFamily: FONT.body,
                  fontSize: '15px',
                  color: C.textMuted,
                  maxWidth: 400,
                  lineHeight: 1.7,
                  margin: 0,
                  textAlign: 'right',
                }}
              >
                Techniciens, commerciaux, logisticiens, designers
                d&apos;expérience. Tous passionnés.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ScrollArrow
                  dir="left"
                  disabled={!canScrollLeft}
                  onClick={() => scroll('left')}
                />
                <ScrollArrow
                  dir="right"
                  disabled={!canScrollRight}
                  onClick={() => scroll('right')}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scrollable grid */}
      <style>{`
        .team-scroll::-webkit-scrollbar { display: none; }
        .team-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div style={{ position: 'relative' }}>
        {/* Left fade — shown when scrolled right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: `linear-gradient(to right, ${C.bg}, transparent)`,
            pointerEvents: 'none',
            zIndex: 10,
            opacity: canScrollLeft ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
        {/* Right fade — shown when more content to the right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: `linear-gradient(to left, ${C.bg}, transparent)`,
            pointerEvents: 'none',
            zIndex: 10,
            opacity: canScrollRight ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        <div
          ref={scrollRef}
          className="team-scroll"
          style={{
            overflowX: 'auto',
            paddingLeft: 80,
          }}
        >
          <StaggerIn
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numCols}, ${CARD_COL_WIDTH}px)`,
              gridTemplateRows: 'auto auto',
              minWidth: `${numCols * CARD_COL_WIDTH}px`,
            }}
          >
            {ordered.map((member, i) => (
              <StaggerChild key={member.name}>
                <TeamCard member={member} isFirstRow={i < numCols} />
              </StaggerChild>
            ))}
          </StaggerIn>
        </div>
      </div>
    </section>
  );
}


// SiteFooter removed — now using shared Footer from layout

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// HERO + MOODBOARD — scroll-driven cross-fade inside a single sticky widget
// ─────────────────────────────────────────────────────────────────────────────

function HeroMoodboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring-smoothed progress — adds gentle lag so the animation feels physical
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.0005,
  });

  // Hero: long hold, then gentle fade + barely-noticeable scale-down over ~40 % of scroll
  const heroOpacity = useTransform(smoothProgress, [0, 0.28, 0.68], [1, 1, 0]);
  const heroScale = useTransform(smoothProgress, [0.28, 0.68], [1, 0.97]);

  // Moodboard: starts drifting in while hero is still fading — long overlap zone
  const moodOpacity = useTransform(smoothProgress, [0.38, 0.75], [0, 1]);
  const moodY = useTransform(smoothProgress, [0.38, 0.75], ['4%', '0%']);

  return (
    // 200 vh scroll space — the sticky frame fills one viewport the whole time
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 68,
          height: 'calc(100vh - 68px)',
          overflow: 'hidden',
          backgroundColor: '#F2DECA',
          padding: 'clamp(10px, 1.2vw, 14px) clamp(16px, 4vw, 48px)',
          boxSizing: 'border-box',
        }}
      >
        {/* Single dark rounded widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EASE_OUT }}
          style={{
            height: '100%',
            backgroundColor: C.bg,
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 48px rgba(0,0,0,0.35)',
            position: 'relative',
          }}
        >
          {/* ── Hero panel (z-index above moodboard so it covers it while visible) ── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              opacity: shouldReduce ? 1 : heroOpacity,
              scale: shouldReduce ? 1 : heroScale,
            }}
          >
            <HeroSection />
          </motion.div>

          {/* ── Moodboard panel (revealed beneath the hero) ── */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              opacity: shouldReduce ? 1 : moodOpacity,
              y: shouldReduce ? 0 : moodY,
            }}
          >
            <MoodboardGrid />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div
      style={{
        backgroundColor: C.bg,
        color: C.textPrimary,
        fontFamily: FONT.body,
        minHeight: '100vh',
      }}
    >
      <HeroMoodboardSection />
      <ValuesSection />
      <CareersSection />
      <TeamSection />
    </div>
  );
}
