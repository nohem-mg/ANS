import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nos Solutions',
    description:
        "Découvrez notre gamme de solutions techniques : distributeurs automatiques, fontaines à eau, coffee corners et espaces de pause sur-mesure pour les entreprises.",
    alternates: {
        canonical: '/solutions',
    },
    openGraph: {
        title: 'Nos Solutions · ANS – Pause Évasion',
        description:
            'Distributeurs automatiques, machines à café, fontaines à eau : découvrez les solutions ANS pour la pause en entreprise.',
        url: '/solutions',
    },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
