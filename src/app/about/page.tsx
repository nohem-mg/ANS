'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Github, Globe } from 'lucide-react';
import { ZoomParallax } from '../components/ZoomParallax';

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
  { label: 'Notre Histoire', anchor: 'notre-histoire' },
  { label: "L'Équipe", anchor: 'equipe' },
  { label: "Rejoindre l'équipe", anchor: 'rejoindre' }
];

const STORY_DATA = [
  {
    title: 'Les Origines',
    description: "Ce qui a commencé comme une modeste aventure s'est transformé en une véritable mission : redonner ses lettres de noblesse à la pause en entreprise. Dès nos premiers pas, nous avons eu la conviction que la qualité de l'expérience et le sens du service devaient primer avant tout.",
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    title: 'Le Développement',
    description: "En rejoignant le groupement Prodia+, nous avons franchi un cap. Cette étape décisive nous a permis d'acquérir l'envergure d'un réseau national, tout en conservant jalouseusement notre esprit d'artisan et notre ancrage local. Un pont parfait entre puissance logistique et relation de proximité.",
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&auto=format&q=80',
  },
  {
    title: 'Aujourd\'hui',
    description: "Nous ne livrons plus seulement du café, nous aménageons de véritables refuges pour redynamiser vos équipes. Nos espaces de pause sont devenus les places centrales de vos bureaux, là où les silos se brisent, où soufflent les collaborateurs et où l'intelligence collective prend forme.",
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=80',
  }
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
  bg: '#FAF2E9',
  surface: '#FFFFFF',
  footer: '#1A0800',
  accent: '#C8763A',
  textPrimary: '#2B1200',
  textMuted: 'rgba(43,18,0,0.6)',
  divider: 'rgba(43,18,0,0.1)',
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
        color: '#2B1200',
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
            color: '#F5E6D3',
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
// SECTION 3: NOTRE HISTOIRE
// ─────────────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section
      id="notre-histoire"
      style={{
        backgroundColor: C.bg,
        padding: '128px 24px',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn style={{ marginBottom: '80px', position: 'relative' }}>
          <GhostNumber n="03" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
            <SectionTag index="03" label="Histoire" />
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
              Notre Histoire
            </h2>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: '16px',
                color: C.textMuted,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Plus de 40 ans de passion à transformer l'univers du travail autour de moments chaleureux et de services irréprochables.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
          {STORY_DATA.map((item, i) => {
            const isImageLeft = i % 2 !== 0; // 0: text left, 1: image left, 2: text left

            return (
              <FadeIn key={i}>
                <div
                  className="story-row"
                  style={{
                    display: 'flex',
                    flexDirection: isImageLeft ? 'row-reverse' : 'row',
                    gap: '48px',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3
                      style={{
                        fontFamily: FONT.display,
                        fontSize: 'clamp(28px, 3.5vw, 42px)',
                        fontWeight: 600,
                        color: C.textPrimary,
                        margin: 0,
                        lineHeight: 1.1,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ width: 48, height: 2, backgroundColor: C.accent, borderRadius: 2 }} />
                    <p
                      style={{
                        fontFamily: FONT.body,
                        fontSize: '16px',
                        color: C.textMuted,
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div style={{ flex: '1 1 50%', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {/* Outer wrapper without overflow: hidden so tape can bleed outside */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        transform: isImageLeft ? 'rotate(-2.5deg)' : 'rotate(2.5deg)',
                      }}
                    >
                      {/* Inner wrapper for aspect ratio and image */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '75%',
                          overflow: 'hidden',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                          backgroundColor: '#111',
                          borderRadius: '2px', // very subtle rounding just to soften digital edges
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          unoptimized
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 800px) 100vw, 50vw"
                        />
                      </div>

                      {/* Top-left tape */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '-14px',
                          left: '-42px',
                          width: '100px',
                          height: '24px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(2px)',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.08)',
                          transform: 'rotate(-42deg)',
                          zIndex: 10,
                          // CSS mask to simulate uneven/torn tape edges
                          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 8%, black 50%, rgba(0,0,0,0.6) 92%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 8%, black 50%, rgba(0,0,0,0.6) 92%, transparent 100%)',
                        }}
                      />

                      {/* Bottom-right tape */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-14px',
                          right: '-42px',
                          width: '100px',
                          height: '24px',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(2px)',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.08)',
                          transform: 'rotate(-42deg)',
                          zIndex: 10,
                          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 8%, black 50%, rgba(0,0,0,0.6) 92%, transparent 100%)',
                          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.6) 8%, black 50%, rgba(0,0,0,0.6) 92%, transparent 100%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .story-row {
            flex-direction: column !important;
            gap: 32px !important;
          }
        }
      `}</style>
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
          color: hovered ? C.textPrimary : `rgba(43,18,0,0.85)`,
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
        backgroundColor: "#F6EDE5",
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
// SECTION 5: L'ÉQUIPE — Zoom Parallax
// ─────────────────────────────────────────────────────────────────────────────

const TEAM_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Équipe en collaboration',
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Réunion d\'équipe',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Travail en équipe',
  },
  {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Meeting professionnel',
  },
  {
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=800&fit=crop&auto=format&q=80',
    alt: 'Collaboration créative',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Espace de travail moderne',
  },
  {
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1280&h=720&fit=crop&auto=format&q=80',
    alt: 'Esprit d\'équipe',
  },
];

function TeamSection() {
  return (
    <section
      id="equipe"
      style={{ backgroundColor: C.bg }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '128px 24px 0',
          position: 'relative',
        }}
      >
        <FadeIn style={{ marginBottom: '80px', position: 'relative' }}>
          <GhostNumber n="05" />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 640,
            }}
          >
            <SectionTag index="05" label="Équipe" />
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                color: C.textPrimary,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}
            >
              L&apos;Équipe
            </h2>
            <p
              style={{
                fontFamily: FONT.body,
                fontSize: '15px',
                color: C.textMuted,
                maxWidth: 480,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Techniciens, commerciaux, logisticiens, designers
              d&apos;expérience. Tous passionnés.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={TEAM_IMAGES} />
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
          backgroundColor: '#F9F1E8',
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
            backgroundColor: '#2B1200',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: 'none',
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
      {/* 3. NOTRE HISTOIRE */}
      <StorySection />
      <TeamSection />
      <CareersSection />
    </div>
  );
}
