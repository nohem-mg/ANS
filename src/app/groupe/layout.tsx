import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Groupe Prodia+ · ANS',
    description:
        "ANS, membre du groupement Prodia+ : un réseau national de PME indépendantes spécialisées dans la distribution automatique et les solutions de pause.",
};

export default function GroupeLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
