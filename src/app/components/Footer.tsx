'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Instagram, Mail } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Accueil', href: '/' },
    { label: 'Nos Solutions', href: '/solutions' },
    { label: 'Groupe Prodia+', href: '/groupe' },
    { label: 'À Propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export default function Footer({ footerData }: { footerData?: any }) {
    const brandName = footerData?.brand?.name ?? 'A.N.S.';
    const brandTagline = footerData?.brand?.tagline ?? 'Depuis 1981, nous réinventons\nla pause café en entreprise.';
    
    const contactAddress1 = footerData?.contact?.address_line1 ?? '780 rue Blaise Pascal';
    const contactAddress2 = footerData?.contact?.address_line2 ?? '59267 Proville France';
    const contactPhone = footerData?.contact?.phone ?? '03 27 37 16 84';
    const contactPhoneHref = footerData?.contact?.phone_href ?? 'tel:+33327371684';

    const navLinks = footerData?.nav_links?.length ? footerData.nav_links : NAV_LINKS;

    const linkedinHref = footerData?.social?.linkedin_href ?? '#';
    const instagramHref = footerData?.social?.instagram_href ?? '#';
    const emailHref = footerData?.social?.email_href ?? 'mailto:contact@ans-da.fr';

    const copyrightName = footerData?.legal?.copyright_name ?? 'A.N.S.';
    const mentionsLabel = footerData?.legal?.mentions_label ?? 'Mentions Légales';
    const mentionsHref = footerData?.legal?.mentions_href ?? '/mentions-legales';
    const confLabel = footerData?.legal?.confidentialite_label ?? 'Confidentialité';
    const confHref = footerData?.legal?.confidentialite_href ?? '/confidentialite';

    return (
        <footer
            style={{
                backgroundColor: '#FAF2E9',
                padding: 'clamp(16px, 2vw, 24px) clamp(16px, 4vw, 48px)',
                fontFamily: 'var(--font-ibm-plex-mono)',
            }}
        >
        <style>{`
            @media (max-width: 767px) {
                .footer-inner { padding: 32px 20px 24px !important; }
                .footer-logo-divider { margin-bottom: 24px !important; }
                .footer-grid { gap: 20px !important; margin-bottom: 24px !important; }
                .footer-bottom { padding-top: 16px !important; gap: 12px !important; }
                .footer-col-address { display: none !important; }
                .footer-col-nav { display: none !important; }
            }
        `}</style>
        <div
            className="footer-inner"
            style={{
                backgroundColor: '#2B1200',
                borderRadius: '20px',
                padding: '80px 24px 40px',
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
                {/* Subtle light dot grid for texture */}
                <div
                    aria-hidden
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                        opacity: 0.03,
                        pointerEvents: 'none',
                    }}
                />
                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    {/* Top divider with logo */}
                    <div className="footer-logo-divider" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48 }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,246,239,0.08)' }} />
                        <Image src="/logo-ANS.png" alt="ANS" width={36} height={36} style={{ objectFit: 'contain' }} />
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,246,239,0.08)' }} />
                    </div>

                    {/* 3-column footer grid */}
                    <div
                        className="footer-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: 40,
                            textAlign: 'center',
                            marginBottom: 48,
                        }}
                    >
                        {/* Col 1 — Brand */}
                        <div>
                            <p style={{ color: 'rgba(255,246,239,0.9)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
                                {brandName}
                            </p>
                            <p style={{ color: 'rgba(255,246,239,0.85)', fontSize: 12, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                {brandTagline}
                            </p>
                            {/* Social icons */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                                {[
                                    { icon: <Linkedin size={13} />, href: linkedinHref, label: 'LinkedIn' },
                                    { icon: <Instagram size={13} />, href: instagramHref, label: 'Instagram' },
                                    { icon: <Mail size={13} />, href: emailHref, label: 'Email' },
                                ].map(({ icon, href, label }, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        aria-label={label}
                                        style={{ color: 'rgba(255,246,239,0.8)', transition: 'color 0.2s', display: 'flex' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = '#DE9E67')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,246,239,0.25)')}
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Col 2 — Address */}
                        <div className="footer-col-address">
                            <p style={{ color: 'rgba(255,246,239,0.9)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
                                Adresse
                            </p>
                            <p style={{ color: 'rgba(255,246,239,0.85)', fontSize: 12, lineHeight: 1.7 }}>
                                {contactAddress1}<br />
                                {contactAddress2}
                            </p>
                            <a
                                href={contactPhoneHref}
                                style={{ color: 'rgba(255,246,239,0.85)', fontSize: 12, letterSpacing: '0.04em', textDecoration: 'none', transition: 'color 0.2s', display: 'inline-block', marginTop: 4 }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#DE9E67')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,246,239,0.3)')}
                            >
                                {contactPhone}
                            </a>
                        </div>

                        {/* Col 3 — Navigation */}
                        <div className="footer-col-nav">
                            <p style={{ color: 'rgba(255,246,239,0.9)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
                                Navigation
                            </p>
                            {navLinks.map(({ label, href }: { label: string, href: string }) => (
                                <a
                                    key={href}
                                    href={href}
                                    style={{
                                        display: 'block',
                                        color: 'rgba(255,246,239,0.85)',
                                        fontSize: 12,
                                        letterSpacing: '0.04em',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        padding: '3px 0',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#DE9E67')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,246,239,0.3)')}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div
                        className="footer-bottom"
                        style={{
                            paddingTop: 24,
                            borderTop: '1px solid rgba(255,246,239,0.08)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 24,
                        }}
                    >
                        <p style={{ color: 'rgba(255,246,239,0.8)', fontSize: 10, letterSpacing: '0.04em' }}>
                            © {new Date().getFullYear()} {copyrightName}. Tous droits réservés.
                        </p>
                        <div style={{ display: 'flex', gap: 24 }}>
                            <Link href={mentionsHref} style={{ color: 'rgba(255,246,239,0.8)', fontSize: 10, letterSpacing: '0.04em', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#DE9E67')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,246,239,0.2)')}
                            >
                                {mentionsLabel}
                            </Link>
                            <Link href={confHref} style={{ color: 'rgba(255,246,239,0.8)', fontSize: 10, letterSpacing: '0.04em', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#DE9E67')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,246,239,0.2)')}
                            >
                                {confLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
