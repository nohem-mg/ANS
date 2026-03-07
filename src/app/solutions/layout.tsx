import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nos Solutions · ANS',
    description:
        "Découvrez notre gamme de solutions techniques : distributeurs automatiques, fontaines à eau, coffee corners et espaces de pause sur-mesure pour les entreprises.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
