import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display, Sora, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anspauseevasion.fr'),

  title: {
    default: 'Automatique Nord Service (ANS)',
    template: '%s | Automatique Nord Service',
  },
  description:
    'ANS, expert en solutions de pause café et distribution automatique pour entreprises en Hauts-de-France. Machines à café, fontaines à eau, distributeurs automatiques. Qualité de Vie au Travail et service sur-mesure depuis 1981.',

  keywords: [
    'distributeur automatique',
    'machine à café entreprise',
    'fontaine à eau entreprise',
    'pause café entreprise',
    'distribution automatique Hauts-de-France',
    'distributeur boissons chaudes',
    'distributeur snacking',
    'ANS',
    'Prodia+',
    'qualité de vie au travail',
    'coffee corner entreprise',
    'machine à café bureau',
    'distributeur automatique Nord',
    'Cambrai',
    'Proville',
  ],

  authors: [{ name: 'ANS – Automatique Nord Service' }],
  creator: 'ANS – Automatique Nord Service',
  publisher: 'ANS – Automatique Nord Service',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.anspauseevasion.fr',
    siteName: 'Automatique Nord Service',
    title: 'Automatique Nord Service (ANS) | Distributeurs automatiques',
    description:
      'Expert en solutions de pause café et distribution automatique pour entreprises en Hauts-de-France. Service sur-mesure depuis 1981.',
    images: [
      {
        url: 'https://www.anspauseevasion.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Automatique Nord Service (ANS)',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Automatique Nord Service (ANS) | Distributeurs automatiques',
    description:
      'Expert en solutions de pause café et distribution automatique pour entreprises en Hauts-de-France. Service sur-mesure depuis 1981.',
    images: ['https://www.anspauseevasion.fr/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'PhykVo__RQ3epdItFHzBxU90a2frVv5nFii6koiLjaw',
    other: {
      'facebook-domain-verification': 'uws9w84n7umm6p8rsk5ko7cr7ayg4y',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2B1200',
};

// JSON-LD Structured Data for Local Business SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ANS – Automatique Nord Service',
  alternateName: 'ANS Pause Évasion',
  description:
    'Expert en solutions de pause café et distribution automatique pour entreprises en Hauts-de-France. Machines à café, fontaines à eau, distributeurs automatiques depuis 1981.',
  url: 'https://www.anspauseevasion.fr',
  logo: 'https://www.anspauseevasion.fr/logo-ans-entier.png',
  image: 'https://www.anspauseevasion.fr/logo-ans-entier.png',
  telephone: '+33327371684',
  email: 'contact@ans-da.fr',
  foundingDate: '1981',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '780 rue Blaise Pascal',
    addressLocality: 'Proville',
    postalCode: '59267',
    addressRegion: 'Hauts-de-France',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.1598,
    longitude: 3.2274,
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 50.1598,
      longitude: 3.2274,
    },
    geoRadius: '100000',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  sameAs: [],
  priceRange: '€€',
  serviceType: [
    'Distribution automatique',
    'Machine à café pour entreprise',
    'Fontaine à eau',
    'Distributeur automatique de boissons',
    'Distributeur automatique de snacks',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${sora.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
