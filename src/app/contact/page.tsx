'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

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

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ─── INPUT STYLE CLASSES ───
    const inputClasses = "w-full bg-[#FAF2E9]/40 border border-deep-roast/20 rounded-lg px-4 py-3.5 text-sm font-[family-name:var(--font-ibm-plex-sans)] text-deep-roast focus:outline-none focus:border-sienna-racing transition-colors duration-200 placeholder:text-deep-roast/40";
    const labelClasses = "block mb-2 text-[10px] font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.15em] text-deep-roast/60 uppercase";

    return (
        <div className="min-h-screen bg-[#FAF2E9] text-deep-roast font-[family-name:var(--font-ibm-plex-sans)] selection:bg-golden-extraction selection:text-white">

            {/* ── HERO ── */}
            <section
                className="w-full"
                style={{
                    backgroundColor: '#FAF2E9',
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
                    className="flex-1 bg-deep-roast rounded-[20px] overflow-hidden relative flex flex-col items-center justify-center p-10 md:p-20"
                >
                    {/* Background Noise & Grain */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat',
                        }}
                    />

                    {/* Dot grid */}
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-5"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                            backgroundSize: '32px 32px'
                        }}
                    />

                    {/* Amber glow */}
                    <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(200,118,58,0.12) 0%, transparent 65%)',
                        }}
                    />

                    <div className="relative z-10 text-center max-w-[700px]">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-[11px] font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.22em] text-sienna-racing uppercase mb-9"
                        >
                            Contact
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                            style={{
                                fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                                fontFamily: 'var(--font-sora)',
                                lineHeight: 1.05,
                                letterSpacing: '-0.02em',
                                color: 'var(--color-coffee-cream)',
                                marginBottom: '1.75rem',
                            }}
                        >
                            Parlons de votre <span className="text-transparent bg-clip-text bg-gradient-to-br from-golden-extraction to-sienna-racing italic pr-2">projet.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.05, duration: 0.8 }}
                            className="text-[1.05rem] md:text-lg text-coffee-cream/90 leading-relaxed mx-auto max-w-xl mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-light"
                            style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                        >
                            Audit gratuit, proposition sur-mesure et accompagnement personnalisé.
                            Notre équipe est à votre écoute pour redéfinir la pause dans votre entreprise.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* ── FORM + INFO ── */}
            <section className="px-6 py-20 md:py-32">
                <div ref={formRef} className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-start">

                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isFormInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <h2 style={{
                            fontFamily: "var(--font-sora, 'Georgia', serif)",
                            fontSize: 'clamp(22px, 3vw, 32px)',
                            fontWeight: 600, color: '#451F17',
                            letterSpacing: '-0.02em', margin: '0 0 12px',
                        }}>
                            Envoyez-nous un message
                        </h2>
                        <p className="text-[0.95rem] md:text-[1rem] text-deep-roast/70 leading-relaxed mb-10 font-[family-name:var(--font-ibm-plex-sans)]">
                            Remplissez le formulaire ci-dessous et nous vous recontacterons sous 24h.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col gap-6"
                        >
                            {/* Row: Nom + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Jean Dupont"
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Email professionnel
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="jean@entreprise.fr"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Row: Téléphone + Entreprise */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>
                                        Téléphone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="06 12 34 56 78"
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>
                                        Entreprise
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nom de l&apos;entreprise"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Nombre de collaborateurs */}
                            <div>
                                <label className={labelClasses}>
                                    Nombre de collaborateurs
                                </label>
                                <div className="relative">
                                    <select
                                        className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                                        defaultValue=""
                                    >
                                        <option value="" disabled className="text-deep-roast/40">Sélectionnez une tranche</option>
                                        <option value="1-20" className="text-deep-roast">1 – 20 collaborateurs</option>
                                        <option value="21-50" className="text-deep-roast">21 – 50 collaborateurs</option>
                                        <option value="51-100" className="text-deep-roast">51 – 100 collaborateurs</option>
                                        <option value="101-250" className="text-deep-roast">101 – 250 collaborateurs</option>
                                        <option value="250+" className="text-deep-roast">250+ collaborateurs</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-deep-roast/40">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className={labelClasses}>
                                    Votre message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Décrivez votre projet, vos besoins, vos questions..."
                                    className={`${inputClasses} resize-y min-h-[120px]`}
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                className="mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 bg-golden-extraction text-deep-roast font-[family-name:var(--font-ibm-plex-mono)] text-sm font-bold tracking-widest uppercase rounded hover:bg-white transition-colors duration-300"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                Envoyer le message <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right: Contact info */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isFormInView ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col"
                    >
                        <h3 style={{
                            fontFamily: "var(--font-sora, 'Georgia', serif)",
                            fontSize: 18, fontWeight: 600, color: '#451F17',
                            margin: '0 0 24px', letterSpacing: '-0.01em',
                        }}>
                            Informations de contact
                        </h3>

                        <div className="flex flex-col">
                            {CONTACT_INFO.map((info, i) => {
                                const isLast = i === CONTACT_INFO.length - 1;
                                const content = (
                                    <div
                                        className={`flex gap-5 items-start py-6 ${!isLast ? 'border-b border-deep-roast/10' : ''}`}
                                    >
                                        <div className="w-12 h-12 rounded bg-[#FAF2E9] border border-deep-roast/10 shadow-sm flex items-center justify-center text-deep-roast/60 hover:text-golden-extraction transition-colors duration-300 shrink-0">
                                            {info.icon}
                                        </div>
                                        <div className="flex flex-col pt-[3px]">
                                            <p className="text-[0.7rem] font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.1em] text-deep-roast/50 uppercase mb-1">
                                                {info.label}
                                            </p>
                                            <p className="text-[0.95rem] font-[family-name:var(--font-ibm-plex-sans)] text-deep-roast font-medium">
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
                                        className="hover:bg-deep-roast/[0.02] transition-colors duration-200 -mx-4 px-4 rounded-xl"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={info.label} className="-mx-4 px-4">{content}</div>
                                );
                            })}
                        </div>

                        {/* Map placeholder */}
                        <div className="mt-10 rounded-2xl overflow-hidden border border-deep-roast/10 h-[220px] relative bg-white shadow-sm ring-1 ring-black/5">
                            <iframe
                                src="https://www.google.com/maps?q=780+Rue+Blaise+Pascal,+59267+Proville&z=11&output=embed"
                                width="100%"
                                height="100%"
                                className="border-0 opacity-80"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Localisation ANS Proville"
                            />
                            {/* Overlay gradient for aesthetics */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-deep-roast/40 to-transparent pointer-events-none"
                            />
                            <div className="absolute bottom-4 left-5">
                                <span className="text-[10px] font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.1em] text-white uppercase drop-shadow-md">
                                    Proville, Hauts-de-France
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
