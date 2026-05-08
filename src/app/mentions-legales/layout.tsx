import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales · ANS',
  description: 'Mentions légales du site ANS (Automatique Nord Service).',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
