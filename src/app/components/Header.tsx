'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
    { label: 'Accueil', href: '/' },
    { label: 'Nos Solutions', href: '/solutions' },
    { label: 'Groupe Prodia+', href: '/groupe' },
    { label: 'À Propos', href: '/about' },
];

const MotionLink = motion.create(Link);

export default function Header({ navData }: { navData?: any }) {
    const navLinks = navData?.nav_links ?? NAV_LINKS;
    const ctaLabel = navData?.cta_label ?? 'Contact';
    const ctaHref = navData?.cta_href ?? '/contact';
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        const timeout = window.setTimeout(() => setMobileOpen(false), 0);
        return () => window.clearTimeout(timeout);
    }, [pathname]);

    useEffect(() => {
        if (!mobileOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [mobileOpen]);

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    backgroundColor: scrolled ? 'rgba(250,242,233,0.85)' : '#FAF2E9',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(43,18,0,0.1)' : '1px solid transparent',
                    transition: 'background-color 0.3s, border-bottom 0.3s, backdrop-filter 0.3s',
                }}
            >
                <div
                    style={{
                        maxWidth: 1280,
                        margin: '0 auto',
                        padding: '0 clamp(20px, 4vw, 56px)',
                        display: 'flex',
                        alignItems: 'center',
                        height: 84,
                        position: 'relative',
                    }}
                >
                    {/* Left: logo */}
                    <Link
                        href="/"
                        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, height: 84 }}
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                    >
                        <Image 
                            src="/logo-ans-entier.png" 
                            alt="ANS Pause Évasion" 
                            width={136} 
                            height={58} 
                            style={{ 
                                objectFit: 'contain',
                                transform: 'translateY(4px)' 
                            }} 
                        />
                    </Link>

                    {/* Center: nav links (desktop) — absolutely centered */}
                    <div
                        className="header-desktop-nav header-center-links"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        {navLinks.map(({ label, href }: { label: string, href: string }) => (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    fontFamily: 'var(--font-ibm-plex-mono)',
                                    fontWeight: 600,
                                    fontSize: 12,
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase' as const,
                                    color: isActive(href) ? '#2B1200' : 'rgba(43,18,0,0.5)',
                                    padding: '0 18px',
                                    height: 84,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap' as const,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                    borderBottom: isActive(href) ? '2px solid #C8763A' : '2px solid transparent',
                                }}
                                onMouseEnter={(e) => { if (!isActive(href)) e.currentTarget.style.color = '#2B1200'; }}
                                onMouseLeave={(e) => { if (!isActive(href)) e.currentTarget.style.color = 'rgba(43,18,0,0.5)'; }}
                                onClick={(e) => {
                                    if (href === '/' && pathname === '/') {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Contact CTA (desktop) */}
                    <Link
                        className="header-desktop-nav"
                        href={ctaHref}
                        style={{
                            marginLeft: 'auto',
                            fontFamily: 'var(--font-ibm-plex-mono)',
                            fontWeight: 600,
                            fontSize: 12,
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase' as const,
                            color: pathname === ctaHref ? '#FFF6EF' : '#2B1200',
                            background: pathname === ctaHref ? '#2B1200' : 'transparent',
                            border: pathname === ctaHref ? '1px solid #2B1200' : '1px solid rgba(43,18,0,0.2)',
                            borderRadius: 6,
                            padding: '8px 20px',
                            textDecoration: 'none',
                            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                            whiteSpace: 'nowrap' as const,
                        }}
                        onMouseEnter={(e) => {
                            if (pathname !== ctaHref) {
                                e.currentTarget.style.background = 'rgba(43,18,0,0.05)';
                                e.currentTarget.style.borderColor = 'rgba(43,18,0,0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (pathname !== ctaHref) {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(43,18,0,0.2)';
                            }
                        }}
                    >
                        {ctaLabel}
                    </Link>

                    {/* Mobile hamburger */}
                    <button
                        className="header-mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menu"
                        aria-controls="header-mobile-menu"
                        aria-expanded={mobileOpen}
                        style={{
                            display: 'none',
                            marginLeft: 'auto',
                            background: 'none',
                            border: 'none',
                            color: '#2B1200',
                            cursor: 'pointer',
                            padding: 8,
                        }}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="header-mobile-menu"
                        className="header-mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            top: 84,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100vw',
                            maxWidth: '100vw',
                            zIndex: 49,
                            backgroundColor: 'rgba(28,10,0,0.98)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxSizing: 'border-box',
                            overflow: 'hidden',
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                    >
                        {navLinks.map(({ label, href }: { label: string, href: string }, i: number) => (
                            <MotionLink
                                key={href}
                                href={href}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + i * 0.06 }}
                                style={{
                                    fontFamily: 'var(--font-sora)',
                                    fontSize: 24,
                                    fontWeight: 500,
                                    color: isActive(href) ? '#DE9E67' : '#FFF6EF',
                                    textDecoration: 'none',
                                    padding: '14px 24px',
                                    letterSpacing: '-0.01em',
                                    maxWidth: '100%',
                                    textAlign: 'center',
                                    boxSizing: 'border-box',
                                }}
                                onClick={(e) => {
                                    if (href === '/' && pathname === '/') {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setMobileOpen(false);
                                    } else {
                                        setMobileOpen(false);
                                    }
                                }}
                            >
                                {label}
                            </MotionLink>
                        ))}
                        <MotionLink
                            href={ctaHref}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + navLinks.length * 0.06 }}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                fontFamily: 'var(--font-ibm-plex-mono)',
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase' as const,
                                color: '#1C0A00',
                                background: '#DE9E67',
                                borderRadius: 8,
                                padding: '12px 32px',
                                textDecoration: 'none',
                                marginTop: 16,
                            }}
                        >
                            {ctaLabel}
                        </MotionLink>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .header-desktop-nav { display: none !important; }
          .header-center-links { display: none !important; }
          .header-mobile-toggle { display: flex !important; }
        }
      `}</style>
        </>
    );
}
