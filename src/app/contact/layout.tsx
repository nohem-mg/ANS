import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact · ANS',
    description:
        "Contactez ANS pour discuter de votre projet de pause café en entreprise. Devis gratuit, audit sur-mesure et accompagnement personnalisé.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
