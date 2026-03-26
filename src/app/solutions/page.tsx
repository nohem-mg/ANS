'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Gallery4, type Gallery4Item } from '@/components/ui/gallery4';
import { SOLUTIONS } from '@/app/solutions/data';

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
      "Nous analysons vos espaces, vos flux et vos usages réels. Nombre de collaborateurs, habitudes de consommation, contraintes techniques rien n'est laissé au hasard.",
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Releve technique sur site',
      },
      {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Analyse d equipe en reunion',
      },
      {
        src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Observation des usages en entreprise',
      },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: '02',
    tag: 'PROJECTION CLAIRE',
    title: 'Proposition Sur-Mesure',
    subtitle: 'Une offre lisible, sans angle mort.',
    description:
      "Nous concevons une offre personnalisée : choix des machines, sélection des produits, plan d'implantation et budget transparent. Pas de surprise.",
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Presentation de proposition client',
      },
      {
        src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Budget et cadrage de projet',
      },
      {
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Documents de recommandation',
      },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: '03',
    tag: 'MISE EN PLACE',
    title: 'Installation & Mise en Service',
    subtitle: 'Opérationnel dès le premier jour.',
    description:
      "Notre équipe technique installe, configure et teste l'ensemble. Formation de vos référents incluse. Vous êtes opérationnels dès le premier jour.",
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Installation technique sur site',
      },
      {
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Reglages et verification des equipements',
      },
      {
        src: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Formation et prise en main des equipes',
      },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: '04',
    tag: 'CONTINUITÉ DE SERVICE',
    title: 'Maintenance & SAV Réactif',
    subtitle: "Moins d'interruptions, plus de sérénité.",
    description:
      'Intervention en moins de 4 heures. Approvisionnement régulier, entretien préventif et curatif. Votre parc fonctionne, toujours.',
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Maintenance preventive en intervention',
      },
      {
        src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Technicien en visite rapide',
      },
      {
        src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Suivi operationnel et reapprovisionnement',
      },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: '05',
    tag: 'PILOTAGE DANS LA DURÉE',
    title: 'Suivi & Optimisation',
    subtitle: 'Le dispositif évolue avec vous.',
    description:
      "Reporting de consommation, évolution du parc, ajustement des gammes produits. Nous pilotons votre installation dans la durée.",
    photos: [
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Analyse de donnees et reporting',
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Suivi de performance et optimisation',
      },
      {
        src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
        alt: 'Recommandations annuelles en reunion',
      },
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  const step = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      className="process-section-outer"
      style={{
        background: '#FAF2E9',
        minHeight: '100vh',
        padding: '120px 0',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(180,100,20,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=DM+Serif+Display:ital@0;1&display=swap');

        .process-nav-item { cursor: pointer; border: none; background: none; padding: 0; width: 100%; text-align: left; }
        .process-nav-item:hover .nav-title { color: #e8c88a !important; }
        .detail-card { transition: opacity 0.4s ease, transform 0.4s ease; }
        .step-number { font-size: 11px; letter-spacing: 0.12em; color: rgba(200,150,60,0.5); font-weight: 500; font-family: 'DM Sans', sans-serif; }

        @media (max-width: 980px) {
          .process-main-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .process-section-outer { padding-top: 80px !important; padding-bottom: 80px !important; }
        }

        @media (max-width: 640px) {
          .process-section-outer { padding-top: 56px !important; padding-bottom: 56px !important; }
          .process-section-inner { padding: 0 20px !important; }
          .process-detail-card { padding: 28px 20px !important; }
          .process-header { margin-bottom: 48px !important; }
        }
      `}</style>

      <div className="process-section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
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
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            NOTRE PROCESS
          </p>
          <h2
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
            <br />
            <span style={{ color: '#8c4f25' }}>au suivi.</span>
          </h2>
          <p
            style={{
              marginTop: '24px',
              color: 'rgba(36,19,12,0.78)',
              fontSize: '16px',
              lineHeight: 1.7,
              maxWidth: '420px',
              fontWeight: 300,
            }}
          >
            Cinq étapes courtes, lisibles et documentées pour garder votre projet simple à suivre et facile à piloter.
          </p>
        </div>

        <div className="process-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div
            style={{
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
                style={{ borderBottom: '1px solid rgba(36,19,12,0.10)', padding: '24px 0' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div
                    style={{
                      width: '3px',
                      height: '40px',
                      borderRadius: '2px',
                      background: activeStep === i ? '#8c4f25' : 'rgba(36,19,12,0.16)',
                      transition: 'background 0.3s',
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                      <span className="step-number">{s.id}</span>
                      <span
                        className="nav-title"
                        style={{
                          fontSize: '17px',
                          fontWeight: activeStep === i ? 600 : 400,
                          color: activeStep === i ? '#24130c' : 'rgba(36,19,12,0.70)',
                          transition: 'color 0.3s',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {s.title}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'rgba(140,79,37,0.82)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {s.tag}
                    </p>
                  </div>

                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: activeStep === i ? 1 : 0, transition: 'opacity 0.3s', color: '#8c4f25', flexShrink: 0 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            ))}

            <div style={{ marginTop: '40px' }}>
              <a
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  border: '1px solid rgba(154,90,45,0.35)',
                  borderRadius: '4px',
                  color: '#8c4f25',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  background: 'rgba(140,79,37,0.06)',
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
                DEMANDER UN DEVIS
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div
            key={activeStep}
            className="detail-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : 'translateX(20px)',
              transition: 'all 0.8s ease 0.3s',
            }}
          >
            <div
              className="process-detail-card"
              style={{
                border: '1px solid rgba(36,19,12,0.12)',
                borderRadius: '12px',
                padding: '48px',
                background: 'rgba(255,248,242,0.56)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: 'radial-gradient(circle at top right, rgba(140,79,37,0.12), transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div>
                  <p
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      color: 'rgba(140,79,37,0.9)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      margin: '0 0 2px',
                    }}
                  >
                    {step.tag}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(36,19,12,0.48)', margin: 0 }}>{step.id} / 05</p>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  color: '#451F17',
                  margin: '0 0 8px',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '17px',
                  color: '#8c4f25',
                  margin: '0 0 24px',
                  fontFamily: 'var(--font-sora)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.subtitle}
              </p>

              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(36,19,12,0.82)',
                  lineHeight: 1.75,
                  margin: '0 0 36px',
                  fontWeight: 300,
                }}
              >
                {step.description}
              </p>

              <div style={{ height: '1px', background: 'rgba(36,19,12,0.12)', marginBottom: '32px' }} />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '12px',
                }}
              >
                {step.photos.map((photo, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      aspectRatio: '1 / 1',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid rgba(36,19,12,0.10)',
                      background: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 30vw, 180px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '40px' }}>
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    style={{
                      width: i === activeStep ? '24px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: i === activeStep ? '#8c4f25' : 'rgba(36,19,12,0.18)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  return (
    <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

      <section
        style={{
          backgroundColor: '#FAF2E9',
          height: 'calc(100vh - 68px)',
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
          style={{
            flex: 1,
            backgroundColor: C.bg,
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: 'none',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 100px) clamp(24px, 6vw, 80px)',
          }}
        >
          {/* Dot grid */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
            backgroundSize: '32px 32px', opacity: 0.06, pointerEvents: 'none',
          }} />
          {/* Amber glow */}
          <div aria-hidden style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 800, height: 800, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,118,58,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800 }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
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
              style={{
                fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
                fontFamily: 'var(--font-sora)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: C.textPrimary,
                marginBottom: 24,
              }}
            >
              La Technologie au Service<br />de la <span style={{ color: C.accent }}>Pause Parfaite.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              style={{
                fontSize: 18, color: 'rgba(245,230,211,0.9)', lineHeight: 1.6,
                maxWidth: 580, margin: '0 auto', fontWeight: 300,
              }}
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

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(64px, 10vw, 128px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to top, rgba(178,111,53,0.08), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 600, color: C.textPrimary,
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            Prêt à équiper vos espaces ?
          </h2>
          <p style={{
            fontFamily: FONT.body, fontSize: 16, color: C.textMuted,
            lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px',
          }}>
            Parlons de votre projet. Audit gratuit, proposition sur-mesure et installation rapide.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
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
