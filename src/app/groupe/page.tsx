'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Users, MapPin, Cog, Handshake, ShieldCheck, Zap } from 'lucide-react';

// ─── Design tokens ───────────────────────────────────────────────────────────
const C = {
    bg: '#FAF2E9',
    surface: '#FFFFFF',
    accent: '#C8763A',
    gold: '#DE9E67',
    textPrimary: '#2B1200',
    textMuted: 'rgba(43,18,0,0.6)',
    divider: 'rgba(43,18,0,0.1)',
} as const;

const FONT = {
    display: "var(--font-sora, 'Georgia', serif)",
    body: "var(--font-ibm-plex-sans, sans-serif)",
    mono: "var(--font-ibm-plex-mono, monospace)",
} as const;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

// ─── KEY FIGURES DATA ────────────────────────────────────────────────────────
const FIGURES = [
    { value: 35, suffix: '+', label: 'Membres du réseau', description: 'PME indépendantes à travers la France' },
    { value: 96, suffix: '%', label: 'Couverture nationale', description: 'Du territoire français couvert' },
    { value: 50000, suffix: '+', label: 'Machines installées', description: 'En service sur tout le territoire' },
    { value: 40, suffix: '+', label: "Années d'expertise", description: "D'expérience cumulée dans la distribution" },
];

// ─── ADVANTAGES DATA ─────────────────────────────────────────────────────────
const ADVANTAGES = [
    {
        icon: <Handshake size={24} strokeWidth={1.5} />,
        title: 'Pouvoir de Négociation',
        description: "La force du collectif : des conditions d'achat négociées auprès des plus grands fabricants européens, répercutées sur chaque membre.",
    },
    {
        icon: <Cog size={24} strokeWidth={1.5} />,
        title: 'Mutualisation Logistique',
        description: "Partage des infrastructures logistiques, des outils de gestion et des plateformes d'approvisionnement pour une efficacité maximale.",
    },
    {
        icon: <ShieldCheck size={24} strokeWidth={1.5} />,
        title: 'Standards de Qualité',
        description: "Un cahier des charges commun exigeant garantit un niveau de service homogène sur tout le territoire, quelle que soit l'entreprise membre.",
    },
    {
        icon: <Users size={24} strokeWidth={1.5} />,
        title: "Partage d'Expertise",
        description: "Séminaires, formations croisées et retours d'expérience permanents. Chaque membre bénéficie du savoir-faire de l'ensemble du réseau.",
    },
    {
        icon: <MapPin size={24} strokeWidth={1.5} />,
        title: 'Proximité Locale',
        description: "Chaque membre est ancré dans son territoire. Vous bénéficiez de la réactivité d'un acteur local adossé à un réseau national.",
    },
    {
        icon: <Zap size={24} strokeWidth={1.5} />,
        title: 'Innovation Continue',
        description: "Veille technologique mutualisée : nouvelles machines connectées, paiement sans contact, solutions éco-responsables déployées en priorité.",
    },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    const formatted = target >= 1000
        ? `${(count / 1000).toFixed(count >= target ? 0 : 1).replace('.0', '')}k`
        : `${count}`;

    return (
        <span ref={ref} style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: C.accent,
            letterSpacing: '-0.03em',
            lineHeight: 1,
        }}>
            {formatted}{suffix}
        </span>
    );
}
// ─── ADVANTAGE CARD ──────────────────────────────────────────────────────────
function AdvantageCard({ adv, index }: { adv: typeof ADVANTAGES[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
            style={{
                padding: 'clamp(28px, 3vw, 40px)',
                borderBottom: `1px solid ${C.divider}`,
                borderRight: `1px solid ${C.divider}`,
            }}
        >
            <div style={{ color: C.accent, marginBottom: 16 }}>
                {adv.icon}
            </div>
            <h3 style={{
                fontFamily: FONT.display,
                fontSize: 17, fontWeight: 600,
                color: C.textPrimary,
                margin: '0 0 10px',
                letterSpacing: '-0.01em',
            }}>
                {adv.title}
            </h3>
            <p style={{
                fontFamily: FONT.body, fontSize: 13,
                color: C.textMuted, lineHeight: 1.7, margin: 0,
            }}>
                {adv.description}
            </p>
        </motion.div>
    );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function GroupePage() {
    return (
        <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

            <section
                style={{
                    backgroundColor: '#F2DECA',
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
                        backgroundColor: '#2B1200',
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
                    {/* Glow */}
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
                            Le Réseau
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
                                color: '#F5E6D3',
                                marginBottom: 24,
                            }}
                        >
                            Le Groupe <span style={{ color: C.accent }}>Prodia+</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.8 }}
                            style={{
                                fontSize: 16, color: 'rgba(245,230,211,0.55)', lineHeight: 1.7,
                                maxWidth: 580, margin: '0 auto',
                            }}
                        >
                            Un réseau national de PME indépendantes spécialisées dans la distribution automatique.
                            La force d&apos;un grand groupe avec la proximité et la réactivité d&apos;un acteur local.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ── PRÉSENTATION ── */}
            <section style={{ padding: 'clamp(64px, 10vw, 128px) 24px' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                        gap: 'clamp(40px, 6vw, 80px)',
                        alignItems: 'start',
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                        >
                            <span style={{
                                fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                                color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 16,
                            }}>
                                Qui sommes-nous
                            </span>
                            <h2 style={{
                                fontFamily: FONT.display,
                                fontSize: 'clamp(28px, 4vw, 48px)',
                                fontWeight: 600, color: C.textPrimary,
                                letterSpacing: '-0.02em', lineHeight: 1.15,
                                margin: '0 0 24px',
                            }}>
                                Un Collectif d&apos;Experts<br />Indépendants
                            </h2>
                            <div style={{ width: 48, height: 2, background: C.accent, marginBottom: 24 }} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                        >
                            <p style={{ fontFamily: FONT.body, fontSize: 15, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                                <strong style={{ color: C.textPrimary }}>Prodia+</strong> est un groupement de PME indépendantes
                                spécialisées dans la distribution automatique et les solutions de pause en entreprise.
                                Chaque membre est un entrepreneur local, ancré dans son territoire,
                                qui partage les mêmes valeurs d&apos;excellence et de proximité.
                            </p>
                            <p style={{ fontFamily: FONT.body, fontSize: 15, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                                En rejoignant Prodia+ il y a plus de 20 ans, ANS a renforcé sa capacité
                                à proposer les meilleurs équipements aux meilleures conditions, tout en conservant
                                son indépendance et sa culture familiale. Le réseau mutualise les achats,
                                la logistique et les innovations technologiques.
                            </p>
                            <p style={{ fontFamily: FONT.body, fontSize: 15, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                                Résultat : nos clients bénéficient de la force d&apos;un réseau national
                                avec le service personnalisé d&apos;une entreprise locale qui connaît le terrain.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CHIFFRES CLÉS ── */}
            <section style={{
                backgroundColor: C.surface,
                padding: 'clamp(64px, 10vw, 100px) 24px',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        style={{ textAlign: 'center', marginBottom: 64 }}
                    >
                        <span style={{
                            fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                            color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 16,
                        }}>
                            En chiffres
                        </span>
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(28px, 4vw, 44px)',
                            fontWeight: 600, color: C.textPrimary,
                            letterSpacing: '-0.02em', margin: 0,
                        }}>
                            La Force du Réseau
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'clamp(24px, 3vw, 40px)',
                    }}>
                        {FIGURES.map((fig, i) => (
                            <motion.div
                                key={fig.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7, ease: EASE_OUT }}
                                style={{
                                    textAlign: 'center',
                                    padding: '32px 16px',
                                    borderRadius: 12,
                                    border: `1px solid ${C.divider}`,
                                    background: '#FAF2E9',
                                }}
                            >
                                <AnimatedCounter target={fig.value} suffix={fig.suffix} />
                                <p style={{
                                    fontFamily: FONT.display, fontSize: 15, fontWeight: 600,
                                    color: C.textPrimary, margin: '16px 0 6px',
                                }}>
                                    {fig.label}
                                </p>
                                <p style={{
                                    fontFamily: FONT.body, fontSize: 12,
                                    color: C.textMuted, margin: 0, lineHeight: 1.5,
                                }}>
                                    {fig.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── AVANTAGES DU RÉSEAU ── */}
            <section style={{ padding: 'clamp(64px, 10vw, 128px) 24px' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
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
                            Avantages
                        </span>
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(28px, 4vw, 48px)',
                            fontWeight: 600, color: C.textPrimary,
                            letterSpacing: '-0.02em', lineHeight: 1.15,
                            margin: '0 0 16px',
                        }}>
                            Pourquoi Prodia+ fait la différence
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                        gap: 0,
                    }}>
                        {ADVANTAGES.map((adv, i) => (
                            <AdvantageCard key={adv.title} adv={adv} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ANS DANS LE RÉSEAU ── */}
            <section style={{
                backgroundColor: C.surface,
                padding: 'clamp(64px, 10vw, 100px) 24px',
            }}>
                <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                    >
                        <span style={{
                            fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                            color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 20,
                        }}>
                            ANS × Prodia+
                        </span>
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(24px, 3.5vw, 40px)',
                            fontWeight: 600, color: C.textPrimary,
                            letterSpacing: '-0.02em', lineHeight: 1.2,
                            margin: '0 0 24px',
                        }}>
                            Membre du réseau depuis 2000,<br />
                            ANS incarne la promesse Prodia+.
                        </h2>
                        <p style={{
                            fontFamily: FONT.body, fontSize: 15, color: C.textMuted,
                            lineHeight: 1.8, maxWidth: 640, margin: '0 auto 32px',
                        }}>
                            Notre appartenance au groupement nous permet de proposer les meilleurs équipements
                            du marché tout en conservant notre ADN familial. Vous travaillez avec ANS,
                            vous bénéficiez de la puissance Prodia+.
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
                                href="/about"
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
                                Découvrir ANS
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
