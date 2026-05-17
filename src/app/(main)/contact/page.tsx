'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

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
        value: 'ans@prodiaplus.fr',
        href: 'mailto:ans@prodiaplus.fr',
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
        value: 'Lundi au jeudi : 8h-18h\nVendredi : 8h-17h\nPause repas : 12h30-13h30',
        href: undefined,
    },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const isFormInView = useInView(formRef, { once: true, margin: '-40px' });
    const [formState, handleSubmit] = useForm('xpqnakqy');

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
                    {/* Dot grid */}
                    <div aria-hidden="true" style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                        backgroundSize: '32px 32px', opacity: 0.06, pointerEvents: 'none',
                    }} />
                    {/* Glow */}
                    <div aria-hidden="true" style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                        width: 800, height: 800, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200,118,58,0.1) 0%, transparent 65%)',
                        pointerEvents: 'none',
                    }} />
                    {/* Background Image & Gradients */}
                    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[20px]">
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

                        {formState.succeeded ? (
                            <div
                                role="status"
                                className="rounded-lg border border-sienna-racing/20 bg-white/60 px-5 py-4 text-sm leading-relaxed text-deep-roast"
                            >
                                Merci, votre message a bien été envoyé. Nous vous recontacterons rapidement.
                            </div>
                        ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <input type="hidden" name="_subject" value="Nouvelle demande depuis le site ANS" />

                            {/* Row: Nom + Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className={labelClasses}>
                                        Nom complet
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Jean Dupont"
                                        required
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClasses}>
                                        Email professionnel
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="jean@entreprise.fr"
                                        required
                                        className={inputClasses}
                                    />
                                    <ValidationError
                                        prefix="Email"
                                        field="email"
                                        errors={formState.errors}
                                        className="mt-2 block text-xs text-red-700"
                                    />
                                </div>
                            </div>

                            {/* Row: Téléphone + Entreprise */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className={labelClasses}>
                                        Téléphone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="06 12 34 56 78"
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className={labelClasses}>
                                        Entreprise
                                    </label>
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        placeholder="Nom de l&apos;entreprise"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            {/* Nombre de collaborateurs */}
                            <div>
                                <label htmlFor="collaborators" className={labelClasses}>
                                    Nombre de collaborateurs
                                </label>
                                <div className="relative">
                                    <select
                                        id="collaborators"
                                        name="collaborators"
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
                                <label htmlFor="message" className={labelClasses}>
                                    Votre message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Décrivez votre projet, vos besoins, vos questions..."
                                    required
                                    className={`${inputClasses} resize-y min-h-[120px]`}
                                />
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={formState.errors}
                                    className="mt-2 block text-xs text-red-700"
                                />
                            </div>

                            <ValidationError
                                errors={formState.errors}
                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                            />

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={formState.submitting}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 bg-golden-extraction text-deep-roast font-[family-name:var(--font-ibm-plex-mono)] text-sm font-bold tracking-widest uppercase rounded hover:bg-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                {formState.submitting ? 'Envoi en cours...' : 'Envoyer le message'} <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </form>
                        )}
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
                                        className={`flex gap-5 items-center py-6 ${!isLast ? 'border-b border-deep-roast/10' : ''}`}
                                    >
                                        <div className="w-12 h-12 rounded bg-[#FAF2E9] border border-deep-roast/10 shadow-sm flex items-center justify-center text-deep-roast/60 hover:text-golden-extraction transition-colors duration-300 shrink-0">
                                            {info.icon}
                                        </div>
                                        <div className="flex flex-col pt-[3px]">
                                            <p className="text-[0.7rem] font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.1em] text-deep-roast/50 uppercase mb-1">
                                                {info.label}
                                            </p>
                                            <p className="whitespace-pre-line text-[0.95rem] font-[family-name:var(--font-ibm-plex-sans)] text-deep-roast font-medium">
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
