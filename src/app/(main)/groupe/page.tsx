'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Headphones, Store, Building2, Factory, HeartPulse, GraduationCap, Truck } from 'lucide-react';
import Image from 'next/image';

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

/** Titres seuls — section « Pourquoi Prodia+ fait la différence » (schéma à part) */
const AVANTAGE_TITLES = [
    'Pouvoir de négociation',
    'Mutualisation logistique',
    'Standards de qualité',
    "Partage d'expertise",
    'Proximité locale',
    'Innovation continue',
] as const;

/** Bento « en chiffres » : 1 carte mise en avant + 4 cartes (indices 01–04 / 05 ; la mise en avant porte « * »). */
const KEY_FIGURES_TOTAL = 5;

const FEATURED_CHIFFRE = {
    value: 60000 as const,
    suffix: '',
    label: 'Distributeurs automatiques',
    headline: 'Le parc le plus dense du marché.',
    description: 'déployés et exploités en France et au Benelux par les membres du réseau.',
};

const CHIFFRES_BENTO_PETITS: readonly {
    value: number;
    suffix: string;
    label: string;
    description: string;
    icon: ReactNode;
}[] = [
    { value: 47, suffix: '', label: 'Adhérents', description: 'répartis sur toute la France, dont 2 en Belgique.', icon: <Headphones size={22} strokeWidth={1.5} aria-hidden /> },
    { value: 119, suffix: '', label: 'Agences', description: 'dont 2 en Belgique et 1 au Luxembourg.', icon: <Store size={22} strokeWidth={1.5} aria-hidden /> },
    { value: 2200, suffix: '', label: 'Collaborateurs', description: '680 approvisionneurs, 160 techniciens, administratifs, commerciaux, logistique, direction...', icon: <Users size={22} strokeWidth={1.5} aria-hidden /> },
    { value: 15000, suffix: '', label: 'Sites gérés', description: 'sièges, sites industriels, hôpitaux, universités, hôtels, plateformes…', icon: <MapPin size={22} strokeWidth={1.5} aria-hidden /> },
];

// ─── Chiffres statiques (pas d’animation « compteur ») ─────────────────────────
function StatNumber({
    value,
    suffix,
    color,
    fontSize,
}: {
    value: number;
    suffix: string;
    color: string;
    fontSize: string;
}) {
    const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return (
        <span style={{
            fontFamily: FONT.display,
            fontSize,
            fontWeight: 700,
            color,
            letterSpacing: '-0.035em',
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
        }}>
            {formatted}{suffix}
        </span>
    );
}

function BentoFeaturedSection() {
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return () => {};
        const observer = new IntersectionObserver(
            ([e]) => {
                if (e?.isIntersecting) el.classList.add('kf-bento-in');
            },
            { threshold: 0.12 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .kf-bento-wrap {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: clamp(10px, 1.1vw, 14px);
                    align-items: stretch;
                }
                @media (min-width: 1024px) {
                    .kf-bento-wrap {
                        grid-template-columns: 1fr 1fr;
                    }
                    .kf-bento-cluster {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-auto-rows: 1fr;
                        gap: clamp(10px, 1.1vw, 14px);
                    }
                    .kf-bento-featured {
                        min-height: 0;
                    }
                }
                @media (min-width: 640px) and (max-width: 1023px) {
                    .kf-bento-cluster {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                        gap: clamp(10px, 1.2vw, 14px);
                    }
                }
                @media (max-width: 639px) {
                    .kf-bento-cluster {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: clamp(10px, 1.2vw, 14px);
                    }
                }

                .kf-bento-featured {
                    position: relative;
                    border-radius: 18px;
                    padding: clamp(22px, 2.8vw, 34px);
                    background: radial-gradient(ellipse at 42% 32%, rgba(90,52,38,1) 0%, #231008 62%, #1a0c06 100%);
                    border: 1px solid rgba(245, 230, 211, 0.06);
                    color: #F5E6D3;
                    overflow: hidden;
                    isolation: isolate;
                    display: flex;
                    flex-direction: column;
                    min-height: clamp(280px, 52vw, 420px);
                }
                .kf-bento-featured-dot {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(245,230,211,0.12) 1px, transparent 1px);
                    background-size: 28px 28px;
                    opacity: 0.28;
                    pointer-events: none;
                    z-index: 0;
                }
                .kf-bento-featured-glow {
                    position: absolute;
                    width: min(460px, 90vw);
                    height: min(460px, 90vw);
                    border-radius: 50%;
                    right: -18%;
                    top: -30%;
                    background: radial-gradient(circle, rgba(200,118,58,0.28) 0%, transparent 65%);
                    filter: blur(10px);
                    pointer-events: none;
                    z-index: 0;
                }
                .kf-bento-featured > .kf-inner { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; gap: clamp(14px, 2vw, 20px); }
                .kf-bento-fe-index {
                    align-self: flex-end;
                    font-family: ${FONT.mono};
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    color: rgba(245,230,211,0.45);
                    text-transform: uppercase;
                }
                .kf-bento-fe-num { line-height: 0.94; margin-top: 4px; }
                .kf-bento-fe-label {
                    font-family: ${FONT.display};
                    font-size: clamp(16px, 1.85vw, 22px);
                    font-weight: 600;
                    color: #F5E6D3;
                    margin: 0;
                    letter-spacing: -0.02em;
                }
                .kf-bento-fe-headline {
                    font-family: ${FONT.display};
                    font-size: clamp(13px, 1.35vw, 17px);
                    font-style: italic;
                    color: ${C.gold};
                    margin: 0;
                    line-height: 1.35;
                }
                .kf-bento-fe-desc {
                    font-family: ${FONT.body};
                    font-size: 13px;
                    line-height: 1.6;
                    color: rgba(245,230,211,0.72);
                    margin: 0;
                    margin-top: auto;
                    padding-top: 8px;
                    max-width: 46ch;
                }
                .kf-bento-fe-bar {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 2px;
                    width: 0%;
                    background: linear-gradient(90deg, ${C.accent}, ${C.gold});
                    transition: width 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s;
                    z-index: 2;
                }
                .kf-bento-in .kf-bento-fe-bar { width: 56%; }

                .kf-bento-cell {
                    position: relative;
                    background: #FFFBF4;
                    border: 1px solid ${C.divider};
                    border-radius: 14px;
                    padding: clamp(16px, 1.9vw, 22px);
                    display: flex;
                    flex-direction: column;
                    gap: clamp(12px, 1.7vw, 16px);
                    overflow: hidden;
                    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, border-color 0.4s;
                }
                .kf-bento-cell:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 32px rgba(43,18,0,0.065);
                    border-color: rgba(200,118,58,0.28);
                }
                .kf-bento-cell-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }
                .kf-bento-cell-ic {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: rgba(200,118,58,0.1);
                    color: ${C.accent};
                    flex-shrink: 0;
                }
                .kf-bento-cell-ic svg { width: 16px; height: 16px; }
                .kf-bento-cell-index {
                    font-family: ${FONT.mono};
                    font-size: 9px;
                    letter-spacing: 0.16em;
                    color: rgba(43,18,0,0.42);
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .kf-bento-cell-num { line-height: 0.94; text-align: left; }
                .kf-bento-cell-label {
                    font-family: ${FONT.display};
                    font-size: clamp(13px, 1.22vw, 15px);
                    font-weight: 600;
                    color: ${C.textPrimary};
                    margin: 0;
                    letter-spacing: -0.015em;
                }
                .kf-bento-cell-desc {
                    font-family: ${FONT.body};
                    font-size: 11.8px;
                    color: ${C.textMuted};
                    line-height: 1.5;
                    margin: 0;
                }
                .kf-bento-ce-bar {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 2px;
                    width: 0%;
                    background: linear-gradient(90deg, ${C.accent}, ${C.gold});
                    transition: width 1s cubic-bezier(0.16,1,0.3,1);
                }
                .kf-bento-cell:hover .kf-bento-ce-bar { width: 100%; }
                .kf-bento-in .kf-bento-ce-bar { width: 52%; }

                .kf-bento-star-lbl { letter-spacing: 0.2em; }
            `}</style>

            <section
                ref={rootRef}
                id="kf-bento-anchor"
                className="kf-bento-block"
                style={{
                    padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 36px)',
                    backgroundColor: C.bg,
                }}
            >
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        style={{ marginBottom: 'clamp(24px, 4vw, 32px)', textAlign: 'center' }}
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

                    <div className="kf-bento-wrap">
                        <motion.article
                            className="kf-bento-featured"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75, ease: EASE_OUT }}
                        >
                            <div className="kf-bento-featured-dot" aria-hidden />
                            <div className="kf-bento-featured-glow" aria-hidden />

                            <div className="kf-inner">
                                <div className="kf-bento-fe-index" aria-hidden>
                                    <span className="kf-bento-star-lbl"><span aria-hidden>01</span> / {String(KEY_FIGURES_TOTAL).padStart(2, '0')}</span>
                                </div>
                                <div className="kf-bento-fe-num">
                                    <StatNumber
                                        value={FEATURED_CHIFFRE.value}
                                        suffix={FEATURED_CHIFFRE.suffix}
                                        color="#F5E6D3"
                                        fontSize="clamp(42px, 7vw, 92px)"
                                    />
                                </div>
                                <p className="kf-bento-fe-label">{FEATURED_CHIFFRE.label}</p>
                                <p className="kf-bento-fe-headline">{FEATURED_CHIFFRE.headline}</p>
                                <p className="kf-bento-fe-desc">{FEATURED_CHIFFRE.description}</p>
                            </div>
                            <span className="kf-bento-fe-bar" aria-hidden />
                        </motion.article>

                        <div className="kf-bento-cluster" role="list">
                            {CHIFFRES_BENTO_PETITS.map((fig, idx) => {
                                const idxStr = String(idx + 2).padStart(2, '0');
                                const totalStr = String(KEY_FIGURES_TOTAL).padStart(2, '0');

                                return (
                                    <motion.article
                                        key={fig.label}
                                        role="listitem"
                                        className="kf-bento-cell"
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.65, delay: idx * 0.06, ease: EASE_OUT }}
                                    >
                                        <div className="kf-bento-cell-top">
                                            <span className="kf-bento-cell-ic">{fig.icon}</span>
                                            <span className="kf-bento-cell-index">{idxStr} / {totalStr}</span>
                                        </div>
                                        <div className="kf-bento-cell-num">
                                            <StatNumber
                                                value={fig.value}
                                                suffix={fig.suffix}
                                                color="#2B1200"
                                                fontSize="clamp(26px, 3.6vw, 44px)"
                                            />
                                        </div>
                                        <p className="kf-bento-cell-label">{fig.label}</p>
                                        <p className="kf-bento-cell-desc">{fig.description}</p>
                                        <span className="kf-bento-ce-bar" aria-hidden />
                                    </motion.article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function GroupePage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

            <style>{`
                @media (max-width: 767px) {
                    .groupe-hero-section { min-height: 0 !important; height: auto !important; max-height: none !important; padding-bottom: 18px !important; }
                    .groupe-hero-widget { min-height: 0 !important; height: auto !important; padding: 48px 24px !important; }
                }
                @media (min-width: 768px) and (max-height: 900px) {
                    .groupe-hero-widget { padding-top: 24px !important; padding-bottom: 24px !important; }
                }
            `}</style>
            <section
                className="groupe-hero-section"
                style={{
                    backgroundColor: '#F9F1E8',
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
                    className="groupe-hero-widget"
                    style={{
                        flex: 1,
                        minHeight: 0,
                        backgroundColor: '#2B1200',
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
                                fontSize: 'clamp(3.2rem, 7vw, 6rem)',
                                fontFamily: 'var(--font-sora)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: '#F5E6D3',
                                marginBottom: 24,
                            }}
                        >
                            Le Groupe <span style={{ color: C.accent, fontStyle: 'italic' }}>Prodia+</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.8 }}
                            className="text-[1.05rem] md:text-lg text-coffee-cream/90 leading-relaxed mx-auto max-w-xl mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-light"
                            style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                        >
                            Le premier réseau français d’indépendants en distribution automatique, au service de vos espaces de pause.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ── PRÉSENTATION ── */}
            <section style={{ padding: 'clamp(64px, 10vw, 128px) 24px clamp(16px, 3vw, 32px)' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                        style={{ marginBottom: 40 }}
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
                        <div style={{ width: 48, height: 2, background: C.accent }} />
                    </motion.div>

                    <div 
                        className="presentation-grid"
                        style={{
                            display: 'grid',
                            alignItems: 'center',
                        }}
                    >
                        <style>{`
                            .presentation-grid {
                                grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
                                gap: clamp(24px, 6vw, 80px);
                            }
                            @media (max-width: 768px) {
                                .presentation-grid {
                                    gap: 20px;
                                }
                                .presentation-text {
                                    padding-top: 0 !important;
                                }
                            }
                        `}</style>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE_OUT }}
                            style={{ position: 'relative', width: '100%', aspectRatio: '3/2', maxWidth: 650, margin: '0 auto' }}
                        >
                            <Image 
                                src="/Prodiaplusweb.png" 
                                alt="Réseau Prodia+" 
                                fill 
                                style={{ objectFit: 'contain' }} 
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
                            className="presentation-text"
                            style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: '20px' }}
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

            <BentoFeaturedSection />

            {/* ── AVANTAGES DU RÉSEAU (titres + schéma) ── */}
            <section hidden aria-hidden="true" style={{
                padding: 'clamp(20px, 3vw, 32px) clamp(20px, 4vw, 32px) clamp(32px, 5vw, 48px)',
                backgroundColor: C.bg,
            }}>
                <style>{`
                    .adv-simple {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: clamp(32px, 5vw, 48px);
                        align-items: center;
                    }
                    @media (min-width: 768px) {
                        .adv-simple {
                            grid-template-columns: minmax(0, 1fr) minmax(200px, 280px);
                            gap: clamp(40px, 6vw, 64px);
                        }
                    }
                    .adv-simple-list {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        gap: clamp(14px, 2vw, 18px);
                    }
                    .adv-simple-row {
                        display: flex;
                        align-items: baseline;
                        gap: 14px;
                        padding-bottom: clamp(12px, 1.5vw, 16px);
                        border-bottom: 1px solid rgba(43,18,0,0.07);
                    }
                    .adv-simple-row:last-child { border-bottom: none; padding-bottom: 0; }
                    .adv-simple-idx {
                        font-family: ${FONT.mono};
                        font-size: 10px;
                        letter-spacing: 0.14em;
                        color: ${C.accent};
                        opacity: 0.85;
                        min-width: 1.5em;
                        flex-shrink: 0;
                    }
                    .adv-simple-title {
                        font-family: ${FONT.display};
                        font-size: clamp(15px, 1.5vw, 18px);
                        font-weight: 600;
                        color: ${C.textPrimary};
                        letter-spacing: -0.02em;
                        line-height: 1.35;
                    }
                    .adv-simple-schema {
                        width: 100%;
                        max-width: 260px;
                        margin: 0 auto;
                        aspect-ratio: 1;
                    }
                    .adv-simple-schema svg {
                        width: 100%;
                        height: auto;
                        display: block;
                    }
                `}</style>

                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}
                    >
                        <span style={{
                            fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                            color: C.accent, textTransform: 'uppercase', display: 'block', marginBottom: 16,
                        }}>
                            Avantages
                        </span>
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(26px, 3.6vw, 44px)',
                            fontWeight: 600, color: C.textPrimary,
                            letterSpacing: '-0.02em', lineHeight: 1.15,
                            margin: 0,
                        }}>
                            Pourquoi Prodia+ fait la différence
                        </h2>
                    </motion.div>

                    <div className="adv-simple">
                        <ul className="adv-simple-list">
                            {AVANTAGE_TITLES.map((title, i) => (
                                <motion.li
                                    key={title}
                                    className="adv-simple-row"
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    style={{ cursor: 'pointer' }}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_OUT }}
                                >
                                    <span className="adv-simple-idx" style={{ color: activeIndex === i ? C.accent : 'rgba(43,18,0,0.42)', transition: 'color 0.3s' }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="adv-simple-title" style={{ 
                                        color: activeIndex === i ? C.accent : C.textPrimary, 
                                        transform: activeIndex === i ? 'translateX(6px)' : 'none', 
                                        transition: 'all 0.3s ease' 
                                    }}>
                                        {title}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            className="adv-simple-schema hidden md:block"
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: EASE_OUT }}
                            aria-hidden
                        >
                            <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="110" cy="110" r="88" stroke="rgba(200,118,58,0.12)" strokeWidth="1" />
                                {[0, 60, 120, 180, 240, 300].map((deg, index) => {
                                    const r = 78;
                                    const a = (deg * Math.PI) / 180;
                                    const x2 = 110 + r * Math.cos(a - Math.PI / 2);
                                    const y2 = 110 + r * Math.sin(a - Math.PI / 2);
                                    const isActive = activeIndex === index;
                                    return (
                                        <line
                                            key={deg}
                                            x1="110"
                                            y1="110"
                                            x2={x2}
                                            y2={y2}
                                            stroke={isActive ? C.accent : "rgba(200,118,58,0.25)"}
                                            strokeWidth={isActive ? "2" : "1"}
                                            strokeDasharray={isActive ? "none" : "3 4"}
                                            style={{ transition: 'all 0.3s ease' }}
                                        />
                                    );
                                })}
                                <circle cx="110" cy="110" r={activeIndex !== null ? "26" : "22"} fill="rgba(200,118,58,0.12)" stroke="#C8763A" strokeWidth="1.4" style={{ transition: 'all 0.3s ease' }} />
                                <circle cx="110" cy="110" r={activeIndex !== null ? "8" : "5"} fill="#C8763A" opacity={activeIndex !== null ? "0.6" : "0.35"} style={{ transition: 'all 0.3s ease' }} />
                                {[0, 60, 120, 180, 240, 300].map((deg, index) => {
                                    const r = 78;
                                    const a = (deg * Math.PI) / 180 - Math.PI / 2;
                                    const cx = 110 + r * Math.cos(a);
                                    const cy = 110 + r * Math.sin(a);
                                    const isActive = activeIndex === index;
                                    return (
                                        <circle
                                            key={`n-${deg}`}
                                            cx={cx}
                                            cy={cy}
                                            r={isActive ? "9" : "6"}
                                            fill={isActive ? C.accent : "#FFFBF4"}
                                            stroke="#C8763A"
                                            strokeWidth="1.2"
                                            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onMouseLeave={() => setActiveIndex(null)}
                                        />
                                    );
                                })}
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── VIDÉO DE PRÉSENTATION PRODIA+ ── */}
            <section style={{
                backgroundColor: C.bg,
                padding: 'clamp(24px, 4vw, 40px) 24px clamp(36px, 6vw, 56px)',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                    style={{ maxWidth: 980, margin: '0 auto' }}
                >
                    <div style={{ marginBottom: 'clamp(18px, 3vw, 24px)' }}>
                        <div>
                            <span style={{
                                fontFamily: FONT.mono,
                                fontSize: 10,
                                letterSpacing: '0.22em',
                                color: C.accent,
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: 12,
                            }}>
                                Présentation
                            </span>
                            <h2 style={{
                                fontFamily: FONT.display,
                                fontSize: 'clamp(24px, 3.2vw, 38px)',
                                fontWeight: 600,
                                color: C.textPrimary,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.16,
                                margin: 0,
                            }}>
                                Découvrir Prodia+ en vidéo
                            </h2>
                        </div>
                    </div>

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        overflow: 'hidden',
                        borderRadius: 8,
                        border: `1px solid ${C.divider}`,
                        backgroundColor: '#120804',
                        boxShadow: '0 24px 60px rgba(43,18,0,0.14)',
                    }}>
                        <iframe
                            src="https://player.vimeo.com/video/1191686194?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                            title="Présentation Prodia+"
                            loading="lazy"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                            }}
                        />
                    </div>
                </motion.div>
            </section>


            {/* ── ANS DANS LE RÉSEAU ── */}
            <section style={{
                backgroundColor: '#FAF2E9',
                padding: 'clamp(32px, 5vw, 48px) 24px',
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

            {/* Bandeau « Ils nous font confiance » — bas de page */}
            <section style={{
                padding: 'clamp(18px, 3vw, 32px) 0 clamp(24px, 4vw, 40px)',
                backgroundColor: '#FAF2E9',
                borderTop: '1px solid rgba(43,18,0,0.06)',
            }}>
                <div className="w-full flex flex-col items-center overflow-hidden">
                    <span style={{
                        fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.22em',
                        color: 'rgba(43,18,0,0.4)', textTransform: 'uppercase',
                        marginBottom: 'clamp(24px, 4vw, 32px)', textAlign: 'center', display: 'block',
                    }}>
                        Ils nous font confiance
                    </span>

                    <div
                        className="w-full flex overflow-hidden relative"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                        }}
                    >
                        <motion.div
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{
                                repeat: Infinity,
                                ease: 'linear',
                                duration: 35,
                            }}
                            className="flex items-center gap-16 md:gap-32 w-max"
                        >
                            {[...Array(2)].map((_, loopIdx) => (
                                <div key={loopIdx} className="flex items-center gap-16 md:gap-32">
                                    {[
                                        { label: 'PME & Grands Groupes', icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                        { label: 'Industrie', icon: <Factory className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                        { label: 'Santé & Hôpitaux', icon: <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                        { label: 'Universités', icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                        { label: 'Transport & Logistique', icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                        { label: 'Hôtellerie & Retail', icon: <Store className="w-6 h-6 sm:w-8 sm:h-8 mb-3 opacity-60 text-[#2B1200] group-hover:text-[#C8763A] group-hover:opacity-100 transition-all duration-300" /> },
                                    ].map((sector) => (
                                        <div
                                            key={`${loopIdx}-${sector.label}`}
                                            className="flex flex-col items-center text-center group cursor-default min-w-[140px]"
                                        >
                                            {sector.icon}
                                            <span className="font-medium text-xs sm:text-[0.9rem] leading-snug text-[#2B1200]/70 group-hover:text-[#2B1200] transition-colors duration-300" style={{ fontFamily: FONT.body }}>
                                                {sector.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
