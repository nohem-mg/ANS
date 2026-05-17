import {
  Coffee,
  Droplets,
  Package2,
  type LucideIcon,
} from 'lucide-react';

export interface SolutionDetail {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  icon: LucideIcon;
  highlights: string[];
  idealFor: string[];
  features: string[];
}

export const SOLUTIONS: SolutionDetail[] = [
  {
    slug: 'machines-cafe',
    category: 'Café',
    title: 'Machines à café pour entreprise dans le Nord',
    summary:
      'Des machines à café premium pour entreprises dans le Nord et les Hauts-de-France. Pause café qualitative, fluide et valorisante au quotidien.',
    description:
      'Nos machines à café combinent design, fiabilité et qualité d\'extraction pour proposer un service premium dans tous les environnements de travail. ANS installe et entretient vos machines à café dans le Nord, à Cambrai et dans toute la région Hauts-de-France.',
    image: '/machcaf.png',
    icon: Coffee,
    highlights: [
      'Broyeur intégré et recettes variées',
      'Interface simple pour tous les usages',
      'Expérience premium pour vos collaborateurs',
    ],
    idealFor: [
      'Sièges sociaux',
      'Open spaces',
      'Salles de réunion et espaces accueil',
    ],
    features: [
      'Espresso, cappuccino, latte, chocolat, thé',
      'Paramétrage selon vos volumes et habitudes',
      'Entretien et réapprovisionnement assurés par ANS',
      'Installation rapide et prise en main immédiate',
    ],
  },
  {
    slug: 'fontaines-a-eau',
    category: 'Hydratation',
    title: 'Fontaines à eau pour entreprise dans le Nord',
    summary:
      'Des fontaines à eau élégantes et fiables pour les entreprises du Nord et des Hauts-de-France. Hydratation simple, durable et qualitative sur site.',
    description:
      'Nos fontaines à eau s\'intègrent naturellement dans les espaces de travail et apportent une solution durable, esthétique et facile à vivre. ANS assure l\'installation et la maintenance de vos fontaines à eau dans le Nord, à Cambrai et en Hauts-de-France.',
    image: '/fontaine-eau.jpeg',
    icon: Droplets,
    highlights: [
      'Eau fraîche, tempérée ou pétillante selon les modèles',
      'Design compact pour les espaces communs',
      'Alternative durable aux bouteilles individuelles',
    ],
    idealFor: [
      'Bureaux',
      'Espaces accueil',
      'Zones communes et ateliers',
    ],
    features: [
      'Filtration adaptée et maintenance planifiée',
      'Installation propre et intégration discrète',
      'Usage intensif compatible avec les environnements pros',
      'Pilotage simple et accompagnement ANS',
    ],
  },
  {
    slug: 'distributeurs-automatiques',
    category: 'Snacking',
    title: 'Distributeurs automatiques dans le Nord & Hauts-de-France',
    summary:
      'Une offre complète de distributeurs automatiques pour les entreprises du Nord et des Hauts-de-France : snacks, boissons fraîches et produits du quotidien, installés et maintenus par ANS.',
    description:
      'Nos distributeurs automatiques permettent de proposer une gamme claire, attractive et bien gérée, avec des références adaptées à votre site et à vos collaborateurs. Implanté à Proville près de Cambrai, ANS intervient dans tout le Nord et les Hauts-de-France pour l\'installation, le réapprovisionnement et la maintenance de vos distributeurs.',
    image: '/snacks.png',
    icon: Package2,
    highlights: [
      'Snacks, confiseries, boissons fraîches et canettes',
      'Sélection ajustée selon votre population',
      'Présentation claire et exploitation fiable',
    ],
    idealFor: [
      'Sites industriels',
      'Plateformes logistiques',
      'Bureaux avec fort trafic',
    ],
    features: [
      'Mix produits flexible selon vos contraintes',
      'Suivi de rotation et optimisation des références',
      'Paiement simple et expérience utilisateur fluide',
      'Gestion préventive pour limiter les ruptures',
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
