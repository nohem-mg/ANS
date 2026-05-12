'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4';
import { ImageAutoSlider } from '@/components/ui/image-auto-slider';
import { SOLUTIONS } from '@/app/(main)/solutions/data';

// ─── Design tokens (matching global palette) ────────────────────────────────
const C = {
  bg: '#2B1200',
  surface: '#3A1A06',
  accent: '#C8763A',
  gold: '#DE9E67',
  textPrimary: '#F5E6D3',
  textMuted: 'rgba(245,230,211,0.55)',
  divider: 'rgba(245,230,211,0.12)',
} as const;

const FONT = {
  display: "var(--font-sora, 'Georgia', serif)",
  body: "var(--font-ibm-plex-sans, sans-serif)",
  mono: "var(--font-ibm-plex-mono, monospace)",
} as const;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const PARK_GALLERY_ITEMS: Gallery4Item[] = SOLUTIONS.map((solution) => ({
  id: solution.slug,
  title: solution.title,
  description: solution.summary,
  href: `/solutions/${solution.slug}`,
  image: solution.image,
}));

const steps = [
  {
    id: '01',
    tag: 'IMMERSION TERRAIN',
    title: 'Audit & Diagnostic',
    subtitle: 'On vient voir, avant de proposer.',
    description:
      "Nous analysons vos espaces, vos flux et vos usages réels. Nombre de collaborateurs, habitudes de consommation, contraintes techniques, rien n'est laissé au hasard.",
    photo: {
      src: '/bureau-ans.jpeg',
      alt: 'Bureau ANS — audit et diagnostic terrain',
    },
    keyPoints: ['Visite sur site', 'Analyse des flux', 'Relevé technique'],
  },
  {
    id: '02',
    tag: 'PROJECTION CLAIRE',
    title: 'Proposition Sur-Mesure',
    subtitle: 'Une offre lisible, sans angle mort.',
    description:
      "Nous concevons une offre personnalisée : choix des machines, sélection des produits, plan d'implantation et budget transparent. Pas de surprise.",
    photo: {
      src: '/projec.jpg',
      alt: 'Distributeur dans entrepôt ANS — sélection sur-mesure',
    },
    keyPoints: ['Choix machines', 'Budget transparent', 'Plan d\'implantation'],
  },
  {
    id: '03',
    tag: 'MISE EN PLACE',
    title: 'Installation & Mise en Service',
    subtitle: 'Opérationnel dès le premier jour.',
    description:
      "Notre équipe technique installe, configure et teste l'ensemble. Formation de vos référents incluse. Vous êtes opérationnels dès le premier jour.",
    photo: {
      src: '/ddg.png',
      alt: 'Installation et mise en service des équipements ANS',
    },
    keyPoints: ['Installation complète', 'Configuration', 'Formation incluse'],
  },
  {
    id: '04',
    tag: 'CONTINUITÉ DE SERVICE',
    title: 'Maintenance & SAV Réactif',
    subtitle: "Moins d'interruptions, plus de sérénité.",
    description:
      'Intervention en moins de 4 heures. Approvisionnement régulier, entretien préventif et curatif. Votre parc fonctionne, toujours.',
    photo: {
      src: '/camp.jpg',
      alt: 'Maintenance ANS — intervention rapide sur site',
    },
    keyPoints: ['Réponse < 4h', 'Entretien préventif', 'Approvisionnement'],
  },
  {
    id: '05',
    tag: 'PILOTAGE DANS LA DURÉE',
    title: 'Suivi & Optimisation',
    subtitle: 'Le dispositif évolue avec vous.',
    description:
      "Reporting de consommation, évolution du parc, ajustement des gammes produits. Nous pilotons votre installation dans la durée.",
    photo: {
      src: '/bureau-ans.jpeg',
      alt: 'Bureau ANS — suivi et optimisation continue',
    },
    keyPoints: ['Reporting détaillé', 'Évolution du parc', 'Ajustement gammes'],
  },
];

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setPhotoLoaded(false);
    const timer = setTimeout(() => setPhotoLoaded(true), 60);
    return () => clearTimeout(timer);
  }, [activeStep]);

  const step = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      className="process-section-outer"
      style={{
        background: '#FAF2E9',
        padding: '120px 0 40px',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(180,100,20,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        .process-nav-item { cursor: pointer; border: none; background: none; padding: 0; width: 100%; text-align: left; }
        .process-nav-item:hover .nav-title { color: #8c4f25 !important; }
        .process-photo-main {
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .process-photo-main img { transition: transform 6s ease !important; }
        .process-photo-main:hover img { transform: scale(1.05) !important; }
        .process-kp-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px; letter-spacing: 0.06em;
          color: #8c4f25; background: rgba(140,79,37,0.08);
          font-family: var(--font-ibm-plex-mono);
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .process-main-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .process-section-outer { padding-top: 80px !important; padding-bottom: 40px !important; }
          .process-detail-right { position: static !important; }
        }

        @media (max-width: 640px) {
          .process-section-outer { padding-top: 56px !important; padding-bottom: 40px !important; }
          .process-section-inner { padding: 0 20px !important; }
          .process-detail-card { padding: 22px 18px !important; }
          .process-header { margin-bottom: 40px !important; }
          .process-header .process-h2 { font-size: clamp(30px, 8vw, 44px) !important; }
          .process-kp-row { flex-wrap: wrap !important; }
          .process-photo-main { aspect-ratio: 4 / 3 !important; }
          .process-photo-overlay { padding: 22px 18px 18px !important; }
          .process-photo-title { font-size: clamp(20px, 5vw, 26px) !important; }
          .process-nav-cta { width: 100% !important; justify-content: center !important; }
          /* Hide left nav on mobile */
          .process-left-nav { display: none !important; }
          /* Show mobile nav arrows */
          .process-mobile-nav { display: flex !important; }
          /* Full width on mobile */
          .process-main-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>

      <div className="process-section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <div
          className="process-header"
          style={{
            marginBottom: '80px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: '#8c4f25',
              fontWeight: 500,
              textTransform: 'uppercase',
              margin: '0 0 20px',
              fontFamily: 'var(--font-ibm-plex-mono)',
            }}
          >
            NOTRE PROCESS
          </p>
          <h2
            className="process-h2"
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: 'clamp(40px, 5vw, 68px)',
              color: '#451F17',
              lineHeight: 1.05,
              margin: 0,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Du cadrage

            <span style={{ color: '#8c4f25' }}> au suivi.</span>
          </h2>
          <p
            style={{
              marginTop: '24px',
              color: 'rgba(36,19,12,0.65)',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '460px',
              fontWeight: 300,
              fontFamily: 'var(--font-ibm-plex-sans)',
            }}
          >
            Cinq étapes courtes, lisibles et documentées pour garder votre projet simple à suivre et facile à piloter.
          </p>
        </div>

        {/* Main grid */}
        <div className="process-main-grid" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Left nav */}
          <div className="process-left-nav" style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : 'translateX(-20px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            {steps.map((s, i) => (
              <button
                key={s.id}
                className="process-nav-item"
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                style={{
                  borderBottom: '1px solid rgba(36,19,12,0.08)',
                  padding: '20px 0',
                  transition: 'background 0.2s',
                  borderRadius: activeStep === i ? '8px' : '0',
                  background: activeStep === i ? 'rgba(140,79,37,0.04)' : 'transparent',
                  paddingLeft: activeStep === i ? '16px' : '0',
                  paddingRight: activeStep === i ? '16px' : '0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: activeStep === i ? '#8c4f25' : 'rgba(36,19,12,0.06)',
                      color: activeStep === i ? '#FFF6EF' : 'rgba(36,19,12,0.35)',
                      transition: 'all 0.3s',
                      flexShrink: 0,
                      fontSize: '13px',
                      fontWeight: 600,
                      fontFamily: 'var(--font-ibm-plex-mono)',
                    }}
                  >
                    {s.id}
                  </div>

                  <div style={{ flex: 1 }}>
                    <span
                      className="nav-title"
                      style={{
                        fontSize: '15px',
                        fontWeight: activeStep === i ? 600 : 400,
                        color: activeStep === i ? '#24130c' : 'rgba(36,19,12,0.55)',
                        transition: 'all 0.3s',
                        letterSpacing: '-0.01em',
                        display: 'block',
                        marginBottom: '2px',
                      }}
                    >
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: activeStep === i ? 'rgba(140,79,37,0.8)' : 'rgba(36,19,12,0.3)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontWeight: 400,
                        transition: 'color 0.3s',
                        fontFamily: 'var(--font-ibm-plex-mono)',
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            <div style={{ marginTop: '36px' }}>
              <a
                className="process-nav-cta"
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  border: '1px solid rgba(154,90,45,0.35)',
                  borderRadius: '8px',
                  color: '#8c4f25',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.25s',
                  background: 'rgba(140,79,37,0.06)',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(140,79,37,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(140,79,37,0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(140,79,37,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(140,79,37,0.35)';
                }}
              >
                Demander un devis
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: photo + detail card */}
          <div
            className="process-detail-right"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : 'translateX(20px)',
              transition: 'all 0.8s ease 0.3s',
              position: 'sticky',
              top: '100px',
            }}
          >
            {/* Large photo */}
            <div
              className="process-photo-main"
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 8',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '0',
                boxShadow: '0 20px 60px rgba(43,18,0,0.15)',
                opacity: photoLoaded ? 1 : 0,
                transform: photoLoaded ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <Image
                src={step.photo.src}
                alt={step.photo.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(36,19,12,0.65) 0%, rgba(36,19,12,0.1) 35%, transparent 55%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Step badge on photo */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(140,79,37,0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '8px',
                  padding: '7px 14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    color: '#FFF6EF',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Étape {step.id}
                </span>
              </div>

              {/* Mobile prev/next arrows — hidden on desktop */}
              <div
                className="process-mobile-nav"
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  transform: 'translateY(-50%)',
                  justifyContent: 'space-between',
                  padding: '0 12px',
                  pointerEvents: 'none',
                }}
              >
                <button
                  onClick={() => setActiveStep(i => Math.max(0, i - 1))}
                  disabled={activeStep === 0}
                  aria-label="Étape précédente"
                  style={{
                    pointerEvents: 'all',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeStep === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.85)',
                    color: activeStep === 0 ? 'rgba(43,18,0,0.3)' : '#2B1200',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: activeStep === 0 ? 'default' : 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActiveStep(i => Math.min(steps.length - 1, i + 1))}
                  disabled={activeStep === steps.length - 1}
                  aria-label="Étape suivante"
                  style={{
                    pointerEvents: 'all',
                    width: '40px', height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: activeStep === steps.length - 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.85)',
                    color: activeStep === steps.length - 1 ? 'rgba(43,18,0,0.3)' : '#2B1200',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: activeStep === steps.length - 1 ? 'default' : 'pointer',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Title overlay at bottom */}
              <div
                className="process-photo-overlay"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '28px 24px 22px',
                }}
              >
                <h3
                  className="process-photo-title"
                  style={{
                    fontFamily: 'var(--font-sora)',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: '#F5E6D3',
                    margin: '0 0 4px',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(222,158,103,0.9)',
                    margin: 0,
                    fontFamily: 'var(--font-sora)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>

            {/* Detail card below photo */}
            <div
              className="process-detail-card"
              style={{
                border: '1px solid rgba(36,19,12,0.10)',
                borderTop: 'none',
                borderRadius: '0 0 16px 16px',
                padding: '24px 24px 22px',
                background: 'rgba(255,250,245,0.7)',
                backdropFilter: 'blur(10px)',
                opacity: photoLoaded ? 1 : 0,
                transform: photoLoaded ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(36,19,12,0.75)',
                  lineHeight: 1.75,
                  margin: '0 0 24px',
                  fontWeight: 300,
                  fontFamily: 'var(--font-ibm-plex-sans)',
                }}
              >
                {step.description}
              </p>

              {/* Key points as tags */}
              <div className="process-kp-row" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {step.keyPoints.map((kp, i) => (
                  <span key={i} className="process-kp-tag">
                    {kp}
                  </span>
                ))}
              </div>

              {/* Pagination dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    aria-label={`Étape ${i + 1}`}
                    style={{
                      width: i === activeStep ? '28px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === activeStep ? '#8c4f25' : 'rgba(36,19,12,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                    fontSize: '11px',
                    color: 'rgba(36,19,12,0.35)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {step.id} / 05
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SHOWCASE ────────────────────────────────────────────────────────────────

function ShowcaseSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section
      ref={sectionRef}
      style={{ background: '#FAF2E9', padding: '0 0 52px' }}
    >
      <style>{`
        .showcase-handle {
          cursor: ew-resize;
          transition: transform 0.15s;
        }
        .showcase-handle:hover { transform: translateX(-50%) scale(1.1); }
        .showcase-compare * { user-select: none !important; -webkit-user-select: none !important; }
        .showcase-compare img { pointer-events: none !important; -webkit-user-drag: none !important; }
        .showcase-compare { touch-action: pan-y; }
        @media (max-width: 768px) {
          .showcase-inner { padding: 0 20px !important; }
          .showcase-header { margin-bottom: 32px !important; }
          .showcase-h2 { font-size: clamp(28px, 8vw, 40px) !important; }
          .showcase-desc { font-size: 14px !important; line-height: 1.7 !important; }
          .showcase-compare { border-radius: 14px !important; }
          .showcase-badge { top: 12px !important; padding: 5px 10px !important; font-size: 9px !important; }
          .showcase-badge-left { left: 12px !important; }
          .showcase-badge-right { right: 12px !important; }
          .showcase-handle-knob { width: 32px !important; height: 32px !important; }
          .showcase-hint { font-size: 8px !important; bottom: 10px !important; }
        }
      `}</style>

      <div className="showcase-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

        {/* ── Header ── */}
        <div
          className="showcase-header"
          style={{
            marginBottom: 52,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#8c4f25',
            fontWeight: 500,
            marginBottom: 16,
            textTransform: 'uppercase',
            fontFamily: FONT.mono,
          }}>
            RÉALISATIONS
          </p>
          <h2
            className="showcase-h2"
            style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              color: '#451F17',
              lineHeight: 1.06,
              margin: 0,
              fontWeight: 600,
              letterSpacing: '-0.025em',
            }}
          >
            Avant & Après

          </h2>
          <p
            className="showcase-desc"
            style={{
              marginTop: 20,
              color: 'rgba(36,19,12,0.65)',
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 480,
              fontFamily: FONT.body,
            }}
          >
            Un espace pause ordinaire peut devenir un vrai lieu de vie. Faites glisser pour comparer l&apos;avant et l&apos;après d&apos;une installation type.
          </p>
        </div>


        {/* ── Before / After slider ── */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(28px)',
            transition: 'all 0.9s ease 0.15s',
            marginBottom: 20,
          }}
        >
          <div
            ref={containerRef}
            className="showcase-compare"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => isDragging && handleMove(e.clientX)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={(e) => isDragging && handleMove(e.touches[0].clientX)}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 920,
              margin: '0 auto',
              aspectRatio: '2048 / 1150',
              borderRadius: 20,
              overflow: 'hidden',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              cursor: 'ew-resize',
              boxShadow: '0 24px 60px rgba(43,18,0,0.14)',
            }}
          >
            {/* AFTER */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="/photoap-flou.jpg"
                alt="Après : espace pause aménagé"
                fill
                unoptimized
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none' }}
                sizes="100vw"
              />
              <div
                className="showcase-badge showcase-badge-right"
                style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'rgba(140,79,37,0.92)', backdropFilter: 'blur(8px)',
                  borderRadius: 6, padding: '6px 14px',
                  fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.16em',
                  color: '#FFF6EF', textTransform: 'uppercase', pointerEvents: 'none',
                }}
              >APRÈS</div>
            </div>

            {/* BEFORE */}
            <div style={{
              position: 'absolute', inset: 0,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              transition: isDragging ? 'none' : 'clip-path 0.05s',
            }}>
              <Image
                src="/photoav-flou.png"
                alt="Avant : coin café basique"
                fill
                unoptimized
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none' }}
                sizes="100vw"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.08)', filter: 'saturate(0.6)', pointerEvents: 'none',
              }} />
              <div
                className="showcase-badge showcase-badge-left"
                style={{
                  position: 'absolute', top: 20, left: 20,
                  background: 'rgba(36,19,12,0.78)', backdropFilter: 'blur(8px)',
                  borderRadius: 6, padding: '6px 14px',
                  fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.16em',
                  color: 'rgba(245,230,211,0.9)', textTransform: 'uppercase', pointerEvents: 'none',
                }}
              >AVANT</div>
            </div>

            {/* Label centré en bas */}
            <div
              className="showcase-hint"
              style={{
                position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                fontFamily: FONT.mono, fontSize: 9, letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
                pointerEvents: 'none', whiteSpace: 'nowrap',
              }}
            >
              Faites glisser pour comparer
            </div>

            {/* Handle */}
            <div
              className="showcase-handle"
              style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `${sliderPos}%`, transform: 'translateX(-50%)',
                width: 2, background: 'rgba(255,255,255,0.85)', pointerEvents: 'none',
              }}
            >
              <div
                className="showcase-handle-knob"
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#FAF2E9', border: '2px solid rgba(140,79,37,0.4)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function AutresRealisationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="autres-section"
      style={{
        background: '#FAF2E9',
        padding: 'clamp(22px, 4vw, 34px) 0 clamp(72px, 12vw, 120px)',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .autres-inner { padding: 0 20px !important; }
          .autres-header { margin-bottom: 28px !important; }
          .autres-h2 { font-size: clamp(24px, 7.5vw, 40px) !important; }
        }
      `}</style>

      <div
        className="autres-inner process-section-inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <div
          className="autres-header"
          style={{
            marginBottom: 48,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(16px)',
            transition: 'all 0.75s ease',
          }}
        >
          <h2
            className="autres-h2"
            style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              color: '#451F17',
              lineHeight: 1.08,
              margin: 0,
              fontWeight: 600,
              letterSpacing: '-0.025em',
            }}
          >
            Autres réalisations
          </h2>
        </div>

        <div
          style={{
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : 'translateY(24px)',
            transition: 'all 0.85s ease 0.12s',
          }}
        >
          <ImageAutoSlider />
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

      <style>{`
        @media (max-width: 767px) {
          .solutions-hero-section { min-height: 0 !important; height: auto !important; max-height: none !important; padding: 8px 12px 18px !important; }
          .solutions-hero-widget { border-radius: 14px !important; padding: 48px 24px !important; min-height: 0 !important; height: auto !important; }
          .solutions-hero-content {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .solutions-hero-label { margin-bottom: 12px !important; letter-spacing: 0.2em !important; }
          .solutions-hero-h1 {
            margin-bottom: 14px !important;
            line-height: 1.1 !important;
          }
          .solutions-hero-desc { line-height: 1.6 !important; margin-bottom: 0 !important; }
        }
        @media (min-width: 768px) and (max-height: 900px) {
          .solutions-hero-widget { padding-top: 24px !important; padding-bottom: 24px !important; }
          .solutions-hero-label { margin-bottom: 16px !important; }
          .solutions-hero-h1 { margin-bottom: 16px !important; }
        }
      `}</style>

      <section
        className="solutions-hero-section"
        style={{
          backgroundColor: '#FAF2E9',
          height: 'calc(100vh - 84px)',
          maxHeight: 'calc(100vh - 84px)',
          overflow: 'hidden',
          padding: 'clamp(10px, 1.2vw, 14px) clamp(16px, 4vw, 48px)',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="solutions-hero-widget"
          style={{
            flex: 1,
            minHeight: 0,
            backgroundColor: C.bg,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: 'none',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(32px, 4vw, 72px) clamp(24px, 6vw, 80px)',
          }}
        >
          {/* Background Image & Gradients */}
          <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[20px]">
              {/* Image */}
              <div className="absolute inset-0" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2560&auto=format&fit=crop)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              {/* Rich gradient overlays for Deep Roast mood & readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1200] via-[#2B1200]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#2B1200]/90 via-transparent to-[#2B1200]/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B1200]/60 via-transparent to-[#2B1200]/60" />
          </div>

          <div className="solutions-hero-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="solutions-hero-label"
              style={{
                fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.22em',
                color: C.accent, textTransform: 'uppercase', marginBottom: 36,
              }}
            >
              Solutions Techniques
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT }}
              className="solutions-hero-h1"
              style={{
                fontSize: 'clamp(3.2rem, 7vw, 6rem)',
                fontFamily: 'var(--font-sora)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#F5E6D3',
                marginBottom: 24,
              }}
            >
              La Technologie au Service<br />de la <span style={{ color: C.accent, fontStyle: 'italic' }}>Pause Parfaite.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="solutions-hero-desc text-[1.05rem] md:text-lg text-coffee-cream/90 leading-relaxed mx-auto max-w-xl mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-light"
              style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              Des distributeurs de dernière génération aux coffee corners sur-mesure,
              nous déployons un parc technique adapté à votre entreprise et à vos collaborateurs.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <Gallery4
        title="Trois gammes, une meme exigence de service"
        description="Retrouvez nos principales familles de machines pour l’entreprise. Chaque carte ouvre sur une page detaillee avec usages, points forts et type d’implantation."
        items={PARK_GALLERY_ITEMS}
      />

      <ProcessSection />

      <ShowcaseSection />

      <AutresRealisationsSection />

      {/* ── CTA ── */}
      <section
        className="solutions-cta"
        style={{
          padding: 'clamp(56px, 10vw, 128px) clamp(20px, 5vw, 24px)',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#2B1200',
        }}
      >
        <style>{`
          @media (max-width: 600px) {
            .solutions-cta-actions { flex-direction: column !important; align-items: stretch !important; }
            .solutions-cta-actions a { justify-content: center !important; width: 100% !important; }
          }
        `}</style>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: 600, color: C.textPrimary,
            letterSpacing: '-0.02em', marginBottom: 16,
            lineHeight: 1.15,
          }}>
            Prêt à équiper vos espaces ?
          </h2>
          <p style={{
            fontFamily: FONT.body, fontSize: 'clamp(14px, 2.4vw, 16px)', color: C.textMuted,
            lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px',
          }}>
            Parlons de votre projet. Audit gratuit, proposition sur-mesure et installation rapide.
          </p>
          <div className="solutions-cta-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <motion.a
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.mono, fontSize: 12, fontWeight: 600,
                color: '#1C0A00', background: C.gold,
                borderRadius: 8, padding: '14px 28px',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Nous contacter <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="/groupe"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.mono, fontSize: 12,
                color: C.textPrimary,
                border: `1px solid ${C.divider}`, borderRadius: 8,
                padding: '14px 28px', letterSpacing: '0.08em',
                textTransform: 'uppercase', textDecoration: 'none',
              }}
              whileHover={{ scale: 1.03, borderColor: C.accent }}
              whileTap={{ scale: 0.97 }}
            >
              Notre Réseau Prodia+
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
