import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    "Découvrez ANS (Automatique Nord Service), la société qui réinvente l'expérience café en entreprise avec des distributeurs de boissons haut de gamme et un service de proximité depuis 1981.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'À Propos · ANS (Automatique Nord Service)',
    description:
      "Depuis 1981, ANS réinvente la pause café en entreprise. Découvrez notre histoire, notre équipe et nos valeurs.",
    url: '/about',
    images: [
      {
        url: 'https://www.anspauseevasion.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'À Propos · ANS (Automatique Nord Service)',
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
