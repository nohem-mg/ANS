import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description:
        "Contactez ANS pour discuter de votre projet de pause café en entreprise. Devis gratuit, audit sur-mesure et accompagnement personnalisé.",
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact · ANS – Pause Évasion',
        description:
            'Contactez ANS pour un devis gratuit. Distributeurs automatiques, machines à café et fontaines à eau pour entreprises en Hauts-de-France.',
        url: '/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
