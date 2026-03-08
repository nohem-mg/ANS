'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

// ─── Design tokens ───────────────────────────────────────────────────────────
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

// ─── INPUT STYLE ─────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,246,239,0.04)',
    border: `1px solid ${C.divider}`,
    borderRadius: 8,
    padding: '14px 18px',
    fontFamily: FONT.body,
    fontSize: 14,
    color: C.textPrimary,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
};

// ─── CONTACT INFO ────────────────────────────────────────────────────────────
const CONTACT_INFO = [
    {
        icon: <Phone size={18} strokeWidth={1.5} />,
        label: 'Téléphone',
        value: '03 27 37 16 84',
        href: 'tel:+33327371684',
    },
    {
        icon: <Mail size={18} strokeWidth={1.5} />,
        label: 'Email',
        value: 'contact@ans-da.fr',
        href: 'mailto:contact@ans-da.fr',
    },
    {
        icon: <MapPin size={18} strokeWidth={1.5} />,
        label: 'Adresse',
        value: '780 rue Blaise Pascal, 59267 Proville',
        href: 'https://maps.google.com/?q=780+rue+Blaise+Pascal+59267+Proville',
    },
    {
        icon: <Clock size={18} strokeWidth={1.5} />,
        label: 'Horaires',
        value: 'Lun–Ven : 8h00 – 18h00',
        href: undefined,
    },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const isFormInView = useInView(formRef, { once: true, margin: '-40px' });

    return (
        <div style={{ backgroundColor: C.bg, color: C.textPrimary, fontFamily: FONT.body, minHeight: '100vh' }}>

            {/* ── HERO ── */}
            <section
                style={{
                    backgroundColor: '#F2DECA',
                    minHeight: 'calc(50vh - 68px)',
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
                        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px)',
                    }}
                >
                    {/* Dot grid */}
                    <div aria-hidden style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                        backgroundSize: '32px 32px', opacity: 0.06, pointerEvents: 'none',
                    }} />
                    <div aria-hidden style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                        width: 700, height: 700, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200,118,58,0.1) 0%, transparent 65%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            style={{
                                fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.22em',
                                color: C.accent, textTransform: 'uppercase', marginBottom: 28,
                            }}
                        >
                            Contact
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.9, ease: EASE_OUT }}
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                                fontFamily: 'var(--font-sora)',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: C.textPrimary,
                                marginBottom: 16,
                            }}
                        >
                            Parlons de votre <span style={{ color: C.accent }}>projet.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.8 }}
                            style={{
                                fontSize: 15, color: C.textMuted, lineHeight: 1.7,
                                maxWidth: 500, margin: '0 auto',
                            }}
                        >
                            Audit gratuit, proposition sur-mesure et accompagnement personnalisé.
                            Notre équipe est à votre écoute.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ── FORM + INFO ── */}
            <section style={{ padding: 'clamp(64px, 10vw, 120px) 24px' }}>
                <div ref={formRef} style={{
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr',
                    gap: 'clamp(40px, 6vw, 80px)',
                    alignItems: 'start',
                }}>

                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isFormInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.8, ease: EASE_OUT }}
                    >
                        <h2 style={{
                            fontFamily: FONT.display,
                            fontSize: 'clamp(22px, 3vw, 32px)',
                            fontWeight: 600, color: C.textPrimary,
                            letterSpacing: '-0.02em', margin: '0 0 8px',
                        }}>
                            Envoyez-nous un message
                        </h2>
                        <p style={{
                            fontFamily: FONT.body, fontSize: 13, color: C.textMuted,
                            lineHeight: 1.6, margin: '0 0 32px',
                        }}>
                            Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                        >
                            {/* Row: Nom + Email */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Jean Dupont"
                                        style={inputStyle}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                        Email professionnel
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="jean@entreprise.fr"
                                        style={inputStyle}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                    />
                                </div>
                            </div>

                            {/* Row: Téléphone + Entreprise */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div>
                                    <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="06 12 34 56 78"
                                        style={inputStyle}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                        Entreprise
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nom de l'entreprise"
                                        style={inputStyle}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                    />
                                </div>
                            </div>

                            {/* Nombre de collaborateurs */}
                            <div>
                                <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                    Nombre de collaborateurs
                                </label>
                                <select
                                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                >
                                    <option value="" style={{ background: C.bg }}>Sélectionnez une tranche</option>
                                    <option value="1-20" style={{ background: C.bg }}>1 – 20 collaborateurs</option>
                                    <option value="21-50" style={{ background: C.bg }}>21 – 50 collaborateurs</option>
                                    <option value="51-100" style={{ background: C.bg }}>51 – 100 collaborateurs</option>
                                    <option value="101-250" style={{ background: C.bg }}>101 – 250 collaborateurs</option>
                                    <option value="250+" style={{ background: C.bg }}>250+ collaborateurs</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label style={{ fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em', color: C.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                                    Votre message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Décrivez votre projet, vos besoins, vos questions..."
                                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                                    onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                                    onBlur={(e) => (e.currentTarget.style.borderColor = C.divider)}
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    fontFamily: FONT.mono, fontSize: 12, fontWeight: 600,
                                    color: '#1C0A00', background: C.gold,
                                    border: 'none', borderRadius: 8, padding: '16px 32px',
                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                    cursor: 'pointer', width: '100%',
                                    marginTop: 8,
                                }}
                                whileHover={{ scale: 1.01, filter: 'brightness(1.05)' }}
                                whileTap={{ scale: 0.99 }}
                            >
                                Envoyer le message <ArrowRight size={14} />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right: Contact info */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isFormInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
                    >
                        <h3 style={{
                            fontFamily: FONT.display,
                            fontSize: 18, fontWeight: 600, color: C.textPrimary,
                            margin: '0 0 28px', letterSpacing: '-0.01em',
                        }}>
                            Informations de contact
                        </h3>

                        {CONTACT_INFO.map((info, i) => {
                            const content = (
                                <div
                                    key={info.label}
                                    style={{
                                        display: 'flex', gap: 16, alignItems: 'flex-start',
                                        padding: '20px 0',
                                        borderBottom: i < CONTACT_INFO.length - 1 ? `1px solid ${C.divider}` : 'none',
                                    }}
                                >
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 10,
                                        background: `rgba(200,118,58,0.1)`,
                                        border: `1px solid rgba(200,118,58,0.15)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: C.accent, flexShrink: 0,
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p style={{
                                            fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.15em',
                                            color: C.textMuted, textTransform: 'uppercase', margin: '0 0 4px',
                                        }}>
                                            {info.label}
                                        </p>
                                        <p style={{
                                            fontFamily: FONT.body, fontSize: 14, color: C.textPrimary,
                                            margin: 0, lineHeight: 1.5,
                                        }}>
                                            {info.value}
                                        </p>
                                    </div>
                                </div>
                            );

                            return info.href ? (
                                <a
                                    key={info.label}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? '_blank' : undefined}
                                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    {content}
                                </a>
                            ) : (
                                <div key={info.label}>{content}</div>
                            );
                        })}

                        {/* Map placeholder */}
                        <div
                            style={{
                                marginTop: 28,
                                borderRadius: 12,
                                overflow: 'hidden',
                                border: `1px solid ${C.divider}`,
                                height: 200,
                                position: 'relative',
                                background: C.surface,
                            }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.5!2d3.227!3d50.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sfr!2sfr!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)', opacity: 0.7 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localisation ANS — Proville"
                            />
                            <div
                                aria-hidden
                                style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to bottom, transparent 60%, rgba(43,18,0,0.6))',
                                    pointerEvents: 'none',
                                }}
                            />
                            <div style={{
                                position: 'absolute', bottom: 12, left: 16,
                                fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.1em',
                                color: C.textMuted, textTransform: 'uppercase',
                            }}>
                                Proville, Hauts-de-France
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Responsive */}
                <style>{`
          @media (max-width: 768px) {
            section > div[style*="grid-template-columns: 1.4fr"] {
              grid-template-columns: 1fr !important;
            }
            form div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
            </section>
        </div>
    );
}
