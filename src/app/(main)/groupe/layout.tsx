import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Groupe Prodia+',
    description:
        "ANS, membre du groupement Prodia+ : un réseau national de PME indépendantes spécialisées dans la distribution automatique et les solutions de pause.",
    alternates: {
        canonical: '/groupe',
    },
    openGraph: {
        title: 'Groupe Prodia+ · ANS – Pause Évasion',
        description:
            'ANS fait partie du réseau Prodia+, groupement national de PME indépendantes spécialisées en distribution automatique.',
        url: '/groupe',
    },
};

export default function GroupeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
