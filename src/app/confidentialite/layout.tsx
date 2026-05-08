import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité · ANS',
  description: 'Politique de confidentialité et gestion des données personnelles du site ANS (Automatique Nord Service).',
  robots: { index: false, follow: false },
};

export default function ConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
