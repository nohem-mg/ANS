'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Coffee, Droplets, Cookie, Sofa, ChevronDown, ClipboardCheck, FileText, Truck, Wrench, TrendingUp } from 'lucide-react';

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

// ─── MACHINES DATA ───────────────────────────────────────────────────────────
const MACHINES = [
    {
        icon: <Coffee size={28} strokeWidth={1.5} />,
        title: 'Distributeurs Boissons Chaudes',
        subtitle: 'Café, thé, chocolat',
        description: "Des machines de dernière génération avec broyeur intégré, sélection de cafés en grains premium et boissons lactées. De l'expresso corsé au cappuccino onctueux.",
        specs: ['Grains fraîchement moulus', 'Jusqu\'à 20 recettes', 'Écran tactile intuitif', 'Technologie éco-énergétique'],
    },
    {
        icon: <Droplets size={28} strokeWidth={1.5} />,
        title: 'Fontaines à Eau',
        subtitle: 'Micro-filtration avancée',
        description: "Eau fraîche, tempérée ou pétillante en libre-service. Raccordement réseau avec filtration multi-étapes pour une qualité irréprochable.",
        specs: ['Eau plate, fraîche ou gazeuse', 'Filtration 0.5 micron', 'Raccordement réseau', 'Design compact'],
    },
    {
        icon: <Cookie size={28} strokeWidth={1.5} />,
        title: 'Distributeurs Snacks & Frais',
        subtitle: 'Alimentation variée',
        description: "Une sélection de produits frais, snacks et boissons fraîches pour satisfaire tous les goûts et toutes les envies, à toute heure.",
        specs: ['Produits frais quotidiens', 'Gamme bio & équitable', 'Paiement sans contact', 'Réfrigération optimale'],
    },
    {
        icon: <Sofa size={28} strokeWidth={1.5} />,
        title: 'Coffee Corners',
        subtitle: 'Espaces clé en main',
        description: "Conception et aménagement complet d'espaces de pause premium. Mobilier soigné, ambiance chaleureuse, machines intégrées.",
        specs: ['Design sur-mesure', 'Mobilier inclus', 'Installation complète', 'Maintenance intégrée'],
    },
];

// ─── PROCESS STEPS ───────────────────────────────────────────────────────────
const STEPS = [
    {
        icon: <ClipboardCheck size={24} strokeWidth={1.5} />,
        num: '01',
        title: 'Audit & Diagnostic',
        description: "Nous analysons vos besoins, vos espaces et vos attentes. Nombre de collaborateurs, habitudes de consommation, contraintes techniques — rien n'est laissé au hasard.",
    },
    {
        icon: <FileText size={24} strokeWidth={1.5} />,
        num: '02',
        title: 'Proposition Sur-Mesure',
        description: "Nous concevons une offre personnalisée : choix des machines, sélection des produits, plan d'implantation et budget transparent. Pas de surprise.",
    },
    {
        icon: <Truck size={24} strokeWidth={1.5} />,
        num: '03',
        title: 'Installation & Mise en Service',
        description: "Notre équipe technique installe, configure et teste l'ensemble. Formation de vos référents incluse. Vous êtes opérationnels dès le premier jour.",
    },
    {
        icon: <Wrench size={24} strokeWidth={1.5} />,
        num: '04',
        title: 'Maintenance & SAV Réactif',
        description: "Intervention en moins de 4 heures. Approvisionnement régulier, entretien préventif et curatif. Votre parc fonctionne, toujours.",
    },
    {
        icon: <TrendingUp size={24} strokeWidth={1.5} />,
        num: '05',
        title: 'Suivi & Optimisation',
        description: "Reporting de consommation, évolution du parc, ajustement des gammes produits. Nous pilotons votre installation dans la durée.",
    },
];

// ─── MACHINE CARD ────────────────────────────────────────────────────────────
function MachineCard({ machine, index }: { machine: typeof MACHINES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_OUT }}
            style={{
                background: C.surface,
                borderRadius: 16,
                padding: 'clamp(28px, 3vw, 40px)',
                border: `1px solid ${C.divider}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'relative',
                overflow: 'hidden',
            }}
            whileHover={{ borderColor: 'rgba(200,118,58,0.3)' }}
        >
            {/* Subtle glow */}
            <div
                aria-hidden
                style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 120, height: 120, borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(200,118,58,0.08) 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Icon */}
            <div style={{ color: C.accent, display: 'flex', alignItems: 'center', gap: 14 }}>
                {machine.icon}
                <span style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.2em', color: C.textMuted, textTransform: 'uppercase' }}>
                    {machine.subtitle}
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: FONT.display,
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 600,
                color: C.textPrimary,
                letterSpacing: '-0.01em',
                margin: 0,
            }}>
                {machine.title}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: FONT.body,
                fontSize: 14,
                color: C.textMuted,
                lineHeight: 1.7,
                margin: 0,
            }}>
                {machine.description}
            </p>

            {/* Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
                {machine.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: C.accent, flexShrink: 0,
                        }} />
                        <span style={{
                            fontFamily: FONT.mono,
                            fontSize: 11,
                            color: 'rgba(245,230,211,0.7)',
                            letterSpacing: '0.02em',
                        }}>
                            {spec}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── PROCESS STEP ────────────────────────────────────────────────────────────
function ProcessStep({ step, index, isLast }: { step: typeof STEPS[0]; index: number; isLast: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_OUT }}
            style={{ display: 'flex', gap: 'clamp(20px, 3vw, 32px)' }}
        >
            {/* Left: number + connector */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `linear-gradient(135deg, ${C.accent}20, ${C.accent}08)`,
                    border: `1px solid ${C.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: C.accent,
                }}>
                    {step.icon}
                </div>
                {!isLast && (
                    <div style={{
                        width: 1, flex: 1, minHeight: 40,
                        background: `linear-gradient(to bottom, ${C.accent}40, ${C.divider})`,
                    }} />
                )}
            </div>

            {/* Right: content */}
            <div style={{ paddingBottom: isLast ? 0 : 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{
                        fontFamily: FONT.mono,
                        fontSize: 11,
                        color: C.accent,
                        letterSpacing: '0.15em',
                    }}>
                        {step.num}
                    </span>
                    <div style={{ width: 20, height: 1, background: C.divider }} />
                </div>
                <h3 style={{
                    fontFamily: FONT.display,
                    fontSize: 'clamp(18px, 2.2vw, 24px)',
                    fontWeight: 600,
                    color: C.textPrimary,
                    letterSpacing: '-0.01em',
                    margin: '0 0 10px',
                }}>
                    {step.title}
                </h3>
                <p style={{
                    fontFamily: FONT.body,
                    fontSize: 14,
                    color: C.textMuted,
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: 520,
                }}>
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
    return (
        <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

            {/* ── HERO ── */}
            <section
                style={{
                    backgroundColor: '#F2DECA',
                    minHeight: 'calc(70vh - 68px)',
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
                        boxShadow: '0 4px 48px rgba(0,0,0,0.35)',
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
                                fontFamily: 'var(--font-playfair)',
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
                                fontSize: 16, color: C.textMuted, lineHeight: 1.7,
                                maxWidth: 560, margin: '0 auto',
                            }}
                        >
                            Des distributeurs de dernière génération aux coffee corners sur-mesure,
                            nous déployons un parc technique adapté à votre entreprise et à vos collaborateurs.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ── MACHINES GRID ── */}
            <section style={{ padding: 'clamp(64px, 10vw, 128px) 24px' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                        style={{ marginBottom: 64 }}
                    >
                        <span style={{
                            fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                            color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 16,
                        }}>
                            Notre Parc
                        </span>
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(28px, 4vw, 48px)',
                            fontWeight: 600,
                            color: C.textPrimary,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15,
                            margin: '0 0 16px',
                        }}>
                            Des Équipements de Pointe
                        </h2>
                        <p style={{
                            fontFamily: FONT.body, fontSize: 15, color: C.textMuted,
                            lineHeight: 1.7, maxWidth: 480, margin: 0,
                        }}>
                            Sélectionnés auprès des meilleurs fabricants européens, nos équipements
                            allient performance, fiabilité et design.
                        </p>
                    </motion.div>

                    {/* Cards grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 20,
                    }}>
                        {MACHINES.map((machine, i) => (
                            <MachineCard key={machine.title} machine={machine} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS TIMELINE ── */}
            <section style={{
                backgroundColor: C.surface,
                padding: 'clamp(64px, 10vw, 128px) 24px',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.5fr',
                        gap: 'clamp(48px, 6vw, 100px)',
                        alignItems: 'start',
                    }}>
                        {/* Left: section header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            style={{ position: 'sticky', top: 100 }}
                        >
                            <span style={{
                                fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                                color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 16,
                            }}>
                                Notre Process
                            </span>
                            <h2 style={{
                                fontFamily: FONT.display,
                                fontSize: 'clamp(28px, 4vw, 48px)',
                                fontWeight: 600,
                                color: C.textPrimary,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.15,
                                margin: '0 0 20px',
                            }}>
                                Comment ça se passe<br />avec <span style={{ color: C.accent }}>ANS ?</span>
                            </h2>
                            <p style={{
                                fontFamily: FONT.body, fontSize: 14, color: C.textMuted,
                                lineHeight: 1.75, maxWidth: 360, margin: '0 0 32px',
                            }}>
                                De la première rencontre à la gestion quotidienne,
                                notre process est pensé pour votre tranquillité.
                                Chaque étape est cadrée, tracée et transparente.
                            </p>
                            <motion.a
                                href="/contact"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    fontFamily: FONT.mono, fontSize: 12,
                                    color: C.textPrimary, textDecoration: 'none',
                                    border: `1px solid ${C.divider}`, borderRadius: 999,
                                    padding: '10px 22px', letterSpacing: '0.06em',
                                    transition: 'border-color 0.2s, color 0.2s',
                                }}
                                whileHover={{ borderColor: C.accent, color: C.accent }}
                            >
                                Demander un devis <ArrowRight size={13} />
                            </motion.a>
                        </motion.div>

                        {/* Right: steps */}
                        <div>
                            {STEPS.map((step, i) => (
                                <ProcessStep key={step.num} step={step} index={i} isLast={i === STEPS.length - 1} />
                            ))}
                        </div>
                    </div>

                    {/* Responsive: stack on mobile */}
                    <style>{`
            @media (max-width: 768px) {
              #__next section > div > div[style*="grid-template-columns"] {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
                </div>
            </section>

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
