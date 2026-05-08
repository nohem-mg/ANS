import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos',
  description:
    "Découvrez ANS, la société qui réinvente l'expérience café en entreprise avec des distributeurs de boissons haut de gamme et un service de proximité depuis 1981.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'À Propos · ANS – Pause Évasion',
    description:
      "Depuis 1981, ANS réinvente la pause café en entreprise. Découvrez notre histoire, notre équipe et nos valeurs.",
    url: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
