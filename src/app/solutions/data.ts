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
    category: 'Cafe',
    title: 'Machines à café pour entreprise',
    summary:
      'Des solutions boissons chaudes premium pour offrir une pause café qualitative, fluide et valorisante au quotidien.',
    description:
      'Nos machines à café combinent design, fiabilite et qualite d’extraction pour proposer un service premium dans tous les environnements de travail. Elles s’adaptent aussi bien aux bureaux qu’aux espaces de passage ou aux zones d’accueil.',
    image: '/machcaf.png',
    icon: Coffee,
    highlights: [
      'Broyeur integre et recettes variees',
      'Interface simple pour tous les usages',
      'Experience premium pour vos collaborateurs',
    ],
    idealFor: [
      'Sieges sociaux',
      'Open spaces',
      'Salles de reunion et espaces accueil',
    ],
    features: [
      'Espresso, cappuccino, latte, chocolat, the',
      'Parametrage selon vos volumes et habitudes',
      'Entretien et reapprovisionnement assures par ANS',
      'Installation rapide et prise en main immediate',
    ],
  },
  {
    slug: 'fontaines-a-eau',
    category: 'Hydratation',
    title: 'Fontaines a eau raccordees',
    summary:
      'Des fontaines a eau elegantes et fiables pour offrir une hydratation simple, durable et qualitative sur site.',
    description:
      `Nos fontaines a eau s'integrent naturellement dans les espaces de travail et apportent une solution durable, esthetique et facile a vivre. Elles couvrent les besoins du quotidien avec une qualite de service constante.`,
    image: '/fontaine-eau.jpeg',
    icon: Droplets,
    highlights: [
      'Eau fraiche, temperee ou petillante selon les modeles',
      'Design compact pour les espaces communs',
      'Alternative durable aux bouteilles individuelles',
    ],
    idealFor: [
      'Bureaux',
      'Espaces accueil',
      'Zones communes et ateliers',
    ],
    features: [
      'Filtration adaptee et maintenance planifiee',
      'Installation propre et integration discrete',
      'Usage intensif compatible avec les environnements pros',
      'Pilotage simple et accompagnement ANS',
    ],
  },
  {
    slug: 'distributeurs-automatiques',
    category: 'Snacking',
    title: 'Distributeurs automatiques',
    summary:
      'Une offre complete pour les pauses rapides avec snacks, boissons fraiches et produits du quotidien.',
    description:
      'Nos distributeurs automatiques permettent de proposer une gamme claire, attractive et bien geree, avec des references adaptees a votre site et a vos collaborateurs. Ils repondent aux usages intensifs comme aux besoins plus ponctuels.',
    image: '/snacks.png',
    icon: Package2,
    highlights: [
      'Snacks, confiseries, boissons fraiches et canettes',
      'Selection ajustee selon votre population',
      'Presentation claire et exploitation fiable',
    ],
    idealFor: [
      'Sites industriels',
      'Plateformes logistiques',
      'Bureaux avec fort trafic',
    ],
    features: [
      'Mix produits flexible selon vos contraintes',
      'Suivi de rotation et optimisation des references',
      'Paiement simple et experience utilisateur fluide',
      'Gestion preventive pour limiter les ruptures',
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((solution) => solution.slug === slug);
}
