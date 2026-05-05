import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À Propos · ANS',
  description:
    "Découvrez ANS la société qui réinvente l'expérience café en entreprise avec des distributeurs de boissons haut de gamme et un service de proximité.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


