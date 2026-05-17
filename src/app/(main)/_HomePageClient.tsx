'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import {
  ArrowRight,
  Award,
  ChevronDown,
  Lightbulb,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';

// --- Types ---

const TESTIMONIALS = [
  {
    name: "Thomas D.",
    review: "Un service irréprochable et régulier. Les machines sont modernes, le café d'excellente qualité, et les équipes très réactives au moindre souci. Un vrai plus pour la pause !",
  },
  {
    name: "Sandrine L.",
    review: "Nous avons fait installer un espace détente complet avec ANS. Rien à dire, c'est design, le passage du technicien est très discret et nos collaborateurs sont ravis de la qualité des produits.",
  },
  {
    name: "Michel B.",
    review: "Entreprise à l'écoute et très pro. On sent l'esprit familial et l'envie de bien faire. Ça change vraiment des gros prestataires classiques impersonnels. Je recommande.",
  }
];

const FAQ_ITEMS = [
  {
    question: "Quelles solutions ANS peut installer dans mon entreprise ?",
    answer:
      "Nous installons des distributeurs automatiques modernes et fiables, proposant une large gamme de boissons chaudes (café grains, lyophilisé ou capsules, chocolats), boissons fraîches, ainsi qu'une offre snacking variée (confiseries, viennoiseries, sandwichs). Nous proposons également de la petite machine de bureau (Coffee Corner) et des fontaines à eau (réseau ou bonbonne).",
  },
  {
    question: "Est-ce qu'ANS s'occupe aussi de l'installation et de la maintenance ?",
    answer:
      "Absolument. Nos équipes gèrent l'installation, l'approvisionnement et la maintenance préventive selon vos besoins. Notre équipe de plus de 30 personnes est dédiée à nos clients au quotidien pour garantir un fonctionnement fluide et sans faille de vos espaces pause.",
  },
  {
    question: "Quels moyens de paiement peuvent être proposés ?",
    answer:
      "Nous facilitons les paiements grâce à des technologies modernes et adaptables : lecteur de badges, clés, billets, cartes bancaires sans contact, paiement par smartphone, ou encore monnayeur standard. Vous choisissez la solution la plus adaptée aux habitudes de vos collaborateurs.",
  },
  {
    question: "Dans quels environnements intervenez-vous ?",
    answer:
      "Nous accompagnons les entreprises et administrations (industrie, services, transport, logistique) ainsi que le grand public. Partenaire de proximité en région Hauts-de-France (Nord-Pas-de-Calais, Picardie), nous garantissons des interventions rapides, avec tous nos sites clients situés à moins de 30 minutes de nos techniciens.",
  },
  {
    question: "Qu'est-ce qui différencie ANS d'un prestataire classique ?",
    answer:
      "Notre force repose sur l'alliance de la proximité et de la réactivité. En tant que membre du réseau indépendant Prodia+, nous allions la puissance d'un réseau national à la souplesse d'un acteur historique du nord. Nous sommes au plus proche de nos clients (la quasi totalité des interventions sont effectuées en moins d'une heure) pour offrir un suivi humain et réactif.",
  },
  {
    question: "Avez-vous une démarche plus responsable ?",
    answer:
      "Oui, notre engagement durable est profond : cafés labellisés 'Bio' et 'Max Havelaar', matériels économes en énergie, déplacements optimisés, recyclage des matériels en fin de vie, détecteurs de mugs, gobelets en carton, et collecte de notre marc de café revalorisé à 100% en biocombustible.",
  },
  {
    question: "L'offre peut-elle être personnalisée selon notre site ?",
    answer:
      "Tout à fait. Nous proposons des solutions sur-mesure, notamment avec la charte 'FeelGood' pour varier les plaisirs. Du choix du café (grains, capsules, bio) aux snacks, en passant par le design de machines fiables et l'intégration des meubles, nous adaptons chaque détail à votre environnement.",
  },
];

// --- Components ---

// 1. "Infusion" Loader
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF2E9] text-deep-roast"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 2.5, duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/logo-ans-entier.png"
            alt="A.N.S Pause Évasion"
            width={280}
            height={120}
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>

        {/* Horizontal underline growing left to right */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 1.0, ease: "easeInOut" }}
          className="h-px bg-golden-extraction/60 w-[280px]"
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

// 2. Stylized Coffee Bean Background
const CoffeeBeanParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, duration: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generates random positions for background elements only on the client
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 20 + 10,
      }))
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-golden-extraction blur-xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 3. Squared Button — matches /about design language
const CapsuleButton = ({ children, href, variant = 'primary' }: { children: React.ReactNode, href: string, variant?: 'primary' | 'secondary' }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center px-7 py-3 rounded font-medium text-sm tracking-widest uppercase overflow-hidden group ${variant === 'primary'
        ? 'bg-sienna-racing text-white'
        : 'bg-transparent border border-deep-roast/20 text-deep-roast hover:border-golden-extraction/60 hover:text-golden-extraction'
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.a>
  );
};

// Removed MoodboardGrid Component


// 5. Timeline — horizontal editorial 3-column design
const MILESTONES = [
  {
    year: '1981',
    title: 'Pionniers QVT',
    desc: "Fondation d'une entreprise familiale avec une conviction forte : la pause café est le premier levier de la Qualité de Vie au Travail.",
  },
  {
    year: '2000',
    title: "L'Expansion",
    desc: "Intégration du réseau Prodia+ pour garantir une couverture nationale tout en préservant notre indépendance.",
  },
  {
    year: '2024',
    title: 'Engagements RSE',
    desc: "Accélération de notre démarche durable : cafés responsables, revalorisation du marc et équipements éco-performants.",
  },
];

const Timeline = ({ milestones: msData }: { milestones: typeof MILESTONES }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 60, damping: 20 }
  );

  return (
    <div ref={sectionRef} className="relative">
      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-6">
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-deep-roast/10" />
        <motion.div
          className="absolute left-[5px] top-2 w-px bg-golden-extraction/40 origin-top"
          style={{ scaleY: lineScaleX }}
        />
        {msData.map((m, i) => (
          <motion.div
            key={m.year}
            className="relative pb-10 last:pb-0"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-sienna-racing border-2 border-[#FAF2E9] z-10" />
            <div className="text-sm font-mono uppercase tracking-[0.22em] text-golden-extraction mb-2" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 600 }}>
              {m.year}
            </div>
            <h3 className="text-deep-roast mb-3 leading-tight" style={{ fontFamily: 'var(--font-sora)', fontSize: '1.15rem', fontWeight: 600 }}>
              {m.title}
            </h3>
            <div className="w-8 h-px bg-golden-extraction/40 mb-3" />
            <p className="text-deep-roast/60 leading-relaxed text-[0.9375rem]" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Desktop: connecting line track */}
      <div className="relative hidden md:block mb-0">
        <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-deep-roast/10" />
        <motion.div
          className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-golden-extraction/40 origin-left"
          style={{ scaleX: lineScaleX }}
        />
        {msData.map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sienna-racing border-2 border-[#FAF2E9]"
            style={{ left: `${16.67 + i * 33.33}%` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.4, ease: 'backOut' }}
          />
        ))}
      </div>

      {/* 3-column grid (desktop only) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.year}
            className="relative px-5 pt-4 pb-3 md:px-12 md:pt-16 md:pb-10 md:border-r border-deep-roast/10 last:border-r-0 overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Year label */}
            <div className="text-2xl md:text-[10px] font-mono uppercase tracking-[0.1em] md:tracking-[0.22em] text-golden-extraction mb-4 md:mb-8" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 600 }}>
              {m.year}
            </div>

            {/* Title */}
            <h3
              className="text-deep-roast mb-5 leading-tight"
              style={{
                fontFamily: 'var(--font-sora)',
                fontSize: 'clamp(1.1rem, 1.5vw, 1.45rem)',
                fontWeight: 600,
              }}
            >
              {m.title}
            </h3>

            {/* Hairline */}
            <div className="w-10 h-px bg-golden-extraction/40 mb-5" />

            {/* Description */}
            <p className="text-deep-roast/60 leading-relaxed" style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-ibm-plex-sans)' }}>
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 6. Technical inline SVG icons — stroke only, no fill, no backgrounds
const CoffeeCornerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="14" height="14" rx="1" />
    <path d="M17 10h2a2 2 0 0 1 0 4h-2" />
    <path d="M7 6V4a2 2 0 0 1 4 0v2" />
    <path d="M8 13h4" />
  </svg>
);

const MaintenanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="14" r="7" />
    <path d="M12 10v4l2.5 2" />
    <path d="M9.5 3h5" />
    <path d="M12 3v3" />
  </svg>
);

const PartnershipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3l4 4-4 4" />
    <path d="M21 7H9a4 4 0 0 0-4 4v1" />
    <path d="M7 21l-4-4 4-4" />
    <path d="M3 17h12a4 4 0 0 0 4-4v-1" />
  </svg>
);

// 7. Service Row — Technical Datasheet / Spec-Sheet Style
const ServiceRow = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center 65%"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, paddingTop: 'clamp(1.25rem, 5vw, 4rem)', paddingBottom: 'clamp(1.25rem, 5vw, 4rem)' }}
      className="group relative flex flex-col md:flex-row md:items-center gap-5 md:gap-16 border-b border-deep-roast/10 overflow-hidden"
    >
      {/* Left column: icon + title */}
      <div className="md:w-[30%] flex items-center gap-4 flex-shrink-0 relative z-10">
        <div className="text-deep-roast/40 group-hover:text-golden-extraction transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
        <h3
          className="text-deep-roast font-semibold"
          style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {title}
        </h3>
      </div>

      {/* Right column: description */}
      <p
        className="md:w-[70%] text-deep-roast/60 relative z-10 group-hover:text-deep-roast/80 transition-colors duration-300"
        style={{ lineHeight: 1.75, fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)', fontFamily: 'var(--font-ibm-plex-sans)' }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

/* 8. Vision Section with Interactive Gallery */
const VISION_POINTS = [
  {
    id: 'deconnexion',
    img: '/pause-evasion.png',
    title: '"Reset" Sensoriel',
    desc: "Une pause réussie mobilise les sens pour couper court à la fatigue. Un rituel de déconnexion pour faire chuter la charge mentale et relancer la concentration.",
  },
  {
    id: 'liens',
    img: '/convivialite-equipe.png',
    title: 'Collisionneur d\'Idées',
    desc: "Les meilleures décisions ne naissent pas toujours en salle de réunion. Nos espaces créent des points de rencontres informels qui brisent les silos dans l'entreprise.",
  },
  {
    id: 'bienetre',
    img: '/qualite-vie-travail.png',
    title: 'Marqueur d\'Attention',
    desc: "Ce que vous glissez dans la tasse de vos équipes en dit long. Une expérience digne d'un coffee shop est un levier concret et quotidien de Qualité de Vie au Travail.",
  },
  {
    id: 'serenite',
    img: '/solution-simplicite.png',
    title: 'Fluidité Invisible',
    desc: "Pour qu'une pause soit reposante, la logistique doit s'effacer. Connexion, entretien préventif et réapprovisionnements : tout est anticipé sans que vous n'y pensiez.",
  },
];

const VisionSection = ({ points }: { points: typeof VISION_POINTS }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeVisionDot, setActiveVisionDot] = useState(0);
  const visionScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleVisionScroll = () => {
    const el = visionScrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 1;
    const gap = 16;
    setActiveVisionDot(Math.round(el.scrollLeft / (cardWidth + gap)));
  };

  return (
    <section id="pause-vision" className="pt-10 pb-8 md:py-20 lg:min-h-screen flex flex-col items-stretch relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF2E9]/5 to-transparent pointer-events-none" />

      {/* Top Header - aligned with Services section container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full mb-12 lg:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              Notre Vision
            </span>
            <h2
              className="text-deep-roast leading-tight"
              style={{
                fontFamily: 'var(--font-sora)',
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Votre machine à café,
              <br />
              <span className="text-sienna-racing">C'est le cœur battant de vos bureaux.</span>
            </h2>
          </motion.div>

          {/* Right Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-8 flex justify-end"
          >
            <p
              className="text-deep-roast/70 leading-relaxed max-w-sm text-justify"
              style={{ fontSize: 'clamp(0.95rem, 1vw, 1.05rem)', fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              Fini le café avalé dans un couloir. La pause est un moment stratégique, celui où l'énergie se recharge et où la culture d'entreprise se construit. Chez ANS, on aménage cet espace pour qu'il soit à la hauteur.            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[105rem] mx-auto px-6 lg:px-12 relative z-10 w-full">
        {/* 4-Column Cards Grid — flip on hover (desktop), scroll horizontal (mobile) */}
        <style>{`
          .flip-card { perspective: 1000px; }
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            transform-style: preserve-3d;
          }
          @media (hover: hover) {
            .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
          }
          .flip-card-front,
          .flip-card-back {
            position: absolute;
            inset: 0;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 1rem;
          }
          .flip-card-back { transform: rotateY(180deg); }
        `}</style>

        <div className="overflow-hidden md:overflow-visible -mx-6 md:mx-0" style={{ touchAction: "pan-x" }}>
          <div
            ref={visionScrollRef}
            onScroll={handleVisionScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 overflow-x-auto overflow-y-hidden md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 px-6 md:px-0"
            style={{ scrollPaddingLeft: '1.5rem', scrollPaddingRight: '1.5rem', overscrollBehaviorX: 'contain', touchAction: 'pan-x', scrollbarWidth: 'none' }}
          >
            {points.map((point, index) => (
              <motion.div
                key={point.id}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flip-card snap-start shrink-0 w-[76vw] sm:w-[56vw] md:w-auto md:shrink min-h-[300px] md:min-h-[420px]" style={{ touchAction: "pan-x" }}
              >
                <div className="flip-card-inner w-full h-full">

                  {/* ── FRONT FACE ── */}
                  <div className="flip-card-front bg-[#688125] p-5 pb-6 xl:p-6 xl:pb-6 flex flex-col shadow-md overflow-hidden">
                    {/* Card Number */}
                    <div className="w-8 h-8 rounded-full border border-[#F4F8EA] flex items-center justify-center mb-4 bg-transparent">
                      <span className="text-sm font-medium text-[#F4F8EA]">{index + 1}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[1.4rem] xl:text-[1.65rem] text-[#F4F8EA] font-medium mb-3 leading-tight"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)', letterSpacing: '-0.02em' }}
                    >
                      {point.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[#EDF4DB] leading-relaxed text-[0.95rem] xl:text-[1.05rem] flex-grow pr-4"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                    >
                      {point.desc}
                    </p>

                    {/* Decorative abstract elements at bottom */}
                    <div className="hidden md:block pt-8 mt-auto opacity-60">
                      {index === 0 && (
                        <div className="flex flex-col gap-2 w-full">
                          <div className="h-px bg-[#F4F8EA] w-full relative">
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-1.5 border-t border-r border-[#F4F8EA] rotate-45 -mt-px"></span>
                          </div>
                          <div className="h-px bg-[#F4F8EA] w-4/5 relative">
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-1.5 border-t border-r border-[#F4F8EA] rotate-45 -mt-px"></span>
                          </div>
                          <div className="h-px bg-[#F4F8EA] w-[65%] relative">
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-1.5 h-1.5 border-t border-r border-[#F4F8EA] rotate-45 -mt-px"></span>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="flex gap-2 h-10 items-end">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex-1 border border-[#F4F8EA] rounded-[0.25rem] h-full relative" style={{ height: `${100 - i * 10}%` }}>
                              {i === 2 && <span className="absolute inset-0 flex items-center justify-center text-[#F4F8EA]"><Lightbulb className="w-3.5 h-3.5" strokeWidth={2.5} /></span>}
                              {i === 5 && <span className="absolute inset-0 flex items-center justify-center text-[#F4F8EA]"><MessageCircle className="w-2.5 h-2.5" strokeWidth={2.5} /></span>}
                            </div>
                          ))}
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex gap-1.5 items-center h-10 w-full">
                          <div className="flex-1 border border-[#F4F8EA] h-full rounded-sm" />
                          <div className="flex-1 border border-[#F4F8EA] h-full skew-x-[-15deg] rounded-sm transform scale-90" />
                          <div className="flex-1 border border-[#F4F8EA] h-full rounded-full mx-0.5" />
                          <div className="flex-[0.8] border border-[#F4F8EA] h-full rounded-full" />
                        </div>
                      )}
                      {index === 3 && (
                        <div className="flex gap-0 items-center h-8 relative">
                          <div className="w-1/3 h-full border border-[#F4F8EA] rounded-l-md rounded-r-[0.35rem] relative" />
                          <div className="w-[15%] h-full border-t border-b border-[#F4F8EA] -mx-1 z-10 bg-[#688125]">
                            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[60%] border-t border-b border-[#F4F8EA] bg-[#688125]" />
                          </div>
                          <div className="w-1/3 h-full border border-[#F4F8EA] rounded-[0.35rem] relative" />
                          <div className="w-[15%] h-full border-t border-b border-[#F4F8EA] -mx-1 z-10 bg-[#688125]">
                            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[60%] border-t border-b border-[#F4F8EA] bg-[#688125]" />
                          </div>
                          <div className="w-1/6 h-full border border-[#F4F8EA] border-l-0 rounded-r-md rounded-l-[0.35rem] relative" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── BACK FACE — image ── */}
                  <div className="flip-card-back overflow-hidden shadow-lg bg-[#688125]">
                    <img
                      src={`/carte${index + 1}.png`}
                      alt={point.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex md:hidden justify-center gap-2 mt-4 px-6">
            {points.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${activeVisionDot === idx ? 'w-6 bg-[#688125]' : 'w-1.5 bg-deep-roast/20'}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

const FAQSection = ({
  activeIndex,
  onToggle,
  items,
}: {
  activeIndex: number;
  onToggle: (index: number) => void;
  items: typeof FAQ_ITEMS;
}) => {
  return (
    <section className="pt-8 pb-8 md:py-20 bg-[#FAF2E9]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span
            className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            FAQ
          </span>
          <h2
            className="text-deep-roast leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Questions fréquentes
          </h2>
          <p
            className="text-deep-roast/65 leading-relaxed max-w-2xl"
            style={{
              fontFamily: 'var(--font-ibm-plex-sans)',
              fontSize: '1rem',
            }}
          >
            Les principales reponses sur nos solutions, notre accompagnement et
            notre maniere de travailler.
          </p>
        </motion.div>

        <div className="border-t border-deep-roast/10">
          <div className="flex flex-col">
            {items.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-deep-roast/10"
                >
                  <button
                    type="button"
                    onClick={() => onToggle(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-6 flex items-start gap-4"
                  >
                    <span
                      className="shrink-0 pt-1 text-[11px] text-golden-extraction font-mono"
                      style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1">
                      <h3
                        className="text-deep-roast leading-snug"
                        style={{
                          fontFamily: 'var(--font-sora)',
                          fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                          fontWeight: 600,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {item.question}
                      </h3>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0,
                          marginTop: isOpen ? 16 : 0,
                        }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-deep-roast/70 leading-relaxed"
                          style={{
                            fontFamily: 'var(--font-ibm-plex-sans)',
                            fontSize: '0.95rem',
                          }}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="pt-1 text-deep-roast/45"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePageClient({ data }: { data: any }) {
  const visionPoints = VISION_POINTS.map((p, i) => ({
    ...p,
    title: data?.vision?.cards?.[i]?.title ?? p.title,
    desc: data?.vision?.cards?.[i]?.description ?? p.desc,
  }))
  const faqItems = data?.faq?.items?.length ? data.faq.items : FAQ_ITEMS
  const testimonialItems = data?.testimonials?.items?.length ? data.testimonials.items : TESTIMONIALS
  const milestoneItems = data?.timeline?.milestones?.length
    ? data.timeline.milestones.map((m: any) => ({ year: m.year, title: m.title, desc: m.description }))
    : MILESTONES
  const serviceRows = [
    { title: data?.services?.rows?.[0]?.title ?? 'Coffee Corners', desc: data?.services?.rows?.[0]?.description ?? 'Home staging : une mise en valeur de l\'espace de pause par un aménagement subtil et chaleureux de l\'espace.', icon: <CoffeeCornerIcon /> },
    { title: data?.services?.rows?.[1]?.title ?? 'Disponibilité Totale', desc: data?.services?.rows?.[1]?.description ?? 'Notre promesse : une réactivité sans faille. Une machine à l\'arrêt, c\'est une pause gâchée. Nous agissons au plus vite pour que l\'arrêt ne dure jamais.', icon: <MaintenanceIcon /> },
    { title: data?.services?.rows?.[2]?.title ?? 'Partenariat Durable', desc: data?.services?.rows?.[2]?.description ?? 'La fidélisation est notre KPI principal. Nous construisons des relations long terme basées sur la confiance et la transparence.', icon: <PartnershipIcon /> },
  ]
  const [loading, setLoading] = useState(true);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [activeTestimonialDot, setActiveTestimonialDot] = useState(0);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (sessionStorage.getItem('ans-loaded')) {
      setLoading(false);
      return;
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!loading) {
      document.body.style.overflow = '';
      sessionStorage.setItem('ans-loaded', '1');
    }
  }, [loading]);

  const handleTestimonialScroll = () => {
    const el = testimonialScrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 1;
    const gap = 16;
    setActiveTestimonialDot(Math.round(el.scrollLeft / (cardWidth + gap)));
  };

  return (
    <>
      {/* Loader overlay — always on top, fades out then unmounts */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div
        ref={containerRef}
        className="min-h-screen bg-[#FAF2E9] text-deep-roast font-sans selection:bg-golden-extraction selection:text-white overflow-x-hidden"
        style={loading ? { overflow: 'hidden', height: '100vh', pointerEvents: 'none' } : undefined}
      >
        <CoffeeBeanParticles />

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sienna-racing to-golden-extraction origin-left z-50"
          style={{ scaleX }}
        />

        {/* Hero Section — cream frame + dark widget */}
        <style>{`
          @media (max-width: 767px) {
            .hero-section { min-height: 70vh !important; height: auto !important; max-height: none !important; }
            .hero-widget { min-height: 100% !important; height: auto !important; }
            .hero-content-area { padding-top: clamp(16px, 4vw, 24px) !important; padding-bottom: clamp(20px, 5vw, 32px) !important; }
            .hero-scroll-indicator { display: none !important; }
          }
        `}</style>
        <section
          className="hero-section"
          style={{
            backgroundColor: '#FAF2E9',
            height: 'calc(100vh - 84px)',
            maxHeight: 'calc(100vh - 84px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: 'clamp(4px, 0.8vw, 8px) clamp(12px, 4vw, 48px)',
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="hero-widget"
            style={{
              flex: 1,
              minHeight: 0,
              backgroundColor: '#2B1200',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'none',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Light dot grid */}
            <div
              aria-hidden
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(245,230,211,0.25) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                opacity: 0.06,
                pointerEvents: 'none',
              }}
            />
            {/* Amber glow */}
            <div
              aria-hidden
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '900px', height: '900px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,118,58,0.12) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-deep-roast">
              <motion.div
                className="absolute inset-0 origin-center"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.2 }}
                transition={{
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2560&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Rich gradient overlays for Deep Roast mood & readable text */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#2B1200] via-[#2B1200]/70 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2B1200]/90 via-transparent to-[#2B1200]/40 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#2B1200]/60 via-transparent to-[#2B1200]/60 pointer-events-none" />

            {/* Subtle noise/grain texture */}
            <div
              className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Content — centered like /about hero */}
            {/* ── Stars · headline · subtitle · two pills ── */}
            <div className="hero-content-area relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center justify-center py-4 xl:py-8 h-full">

              {/* Stars rating in a sleek badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-2.5 mb-6 mt-4 px-4 py-2 rounded-full border border-golden-extraction/20 bg-[#2B1200]/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="flex gap-0.5 pt-[2px]" style={{ filter: 'drop-shadow(0 2px 4px rgba(200,118,58,0.4))' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-golden-extraction text-xs">★</span>
                  ))}
                </div>
                <div className="w-px h-3 bg-coffee-cream/20 shrink-0" />
                <span className="text-coffee-cream/80 text-[10px] font-mono tracking-[0.06em] uppercase whitespace-nowrap">
                  4.9 / 5 <span className="opacity-50">·</span> 200+ partenaires
                </span>
              </motion.div>

              {/* Big serif headline with enhanced typography & contrast */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                style={{
                  fontSize: 'clamp(3.2rem, 7vw, 6rem)',
                  fontFamily: 'var(--font-sora)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-coffee-cream)',
                  marginBottom: '1.25rem',
                  textAlign: 'center',
                }}
              >
                Faites de la <span className="text-transparent bg-clip-text bg-gradient-to-br from-golden-extraction to-sienna-racing italic pr-2">pause</span>
                <br className="hidden md:block" /> un moment qui compte
              </motion.h1>

              {/* Subtitle with improved legibility */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.8 }}
                className="text-[1.05rem] md:text-lg text-coffee-cream/90 leading-relaxed mx-auto max-w-xl mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] font-light"
                style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
              >
                Depuis plus de <span className="text-coffee-cream font-medium">40 ans</span>, nous transformons la pause café en un véritable levier de <span className="text-coffee-cream font-medium">Qualité de Vie au Travail.</span>
                <br className="hidden md:block" /> Service ultra-personnalisé, réactivité immédiate et engagement familial.
              </motion.p>

              {/* Pill CTAs — matching reference button shapes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10"
              >
                <motion.a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('services');
                    if (target) {
                      const y = target.getBoundingClientRect().top + window.scrollY;
                      animate(window.scrollY, y, {
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        onUpdate: (value) => window.scrollTo(0, value),
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-deep-roast bg-coffee-cream"
                  style={{ borderRadius: 999 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Découvrir notre approche
                </motion.a>
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-coffee-cream border border-coffee-cream/20"
                  style={{ borderRadius: 999 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(245,230,211,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander un devis
                </motion.a>
              </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{ delay: 2, duration: 2, repeat: Infinity }}
              className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-golden-extraction/40"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── "Notre Vision" Section (Interactive Gallery) ── */}
        <VisionSection points={visionPoints} />


        {/* Services Section — Spec-Sheet Layout */}
        <section id="services" className="pt-8 pb-8 md:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6 md:mb-12">
              <div>
                <span className="text-golden-extraction text-[10px] tracking-[0.22em] uppercase mb-5 block" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>Notre Savoir-Faire</span>
                <h2 className="text-deep-roast leading-tight" style={{ fontFamily: 'var(--font-sora)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  L'Excellence de la <span className="text-sienna-racing">Pause Café.</span>
                </h2>
              </div>
              <p className="max-w-sm text-deep-roast/60 leading-relaxed md:text-right" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: 'clamp(0.95rem, 1vw, 1.05rem)' }}>
                Des équipements de pointe pilotés par une équipe humaine dédiée.{' '}
                La technologie au service de l'humain.
              </p>
            </div>

            {/* Spec-sheet rows */}
            <div className="border-t border-deep-roast/10">
              {serviceRows.map((row, i) => (
                <ServiceRow key={i} title={row.title} desc={row.desc} icon={row.icon} />
              ))}
            </div>

          </div>
        </section>

        {/* CTA Band */}
        <section className="py-0 bg-[#FAF2E9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #2B1200 0%, #3A1A06 100%)',
                padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 48px)',
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(200,118,58,0.15), transparent 60%)',
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0">
                <div>
                  <h3
                    className="text-[#F5E6D3] mb-2"
                    style={{
                      fontFamily: 'var(--font-sora)',
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}
                  >
                    Un projet d'espace-pause ?
                  </h3>
                  <p
                    className="text-[#F5E6D3]/60 text-center"
                    style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '15px', lineHeight: 1.6 }}
                  >
                    Audit gratuit, proposition sur-mesure et installation rapide.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#1C0A00] bg-[#DE9E67] rounded-lg whitespace-nowrap w-full sm:w-auto"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '12px' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Demander un devis <ArrowRight size={14} />
                  </motion.a>
                  <a
                    href="tel:0327371684"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm text-[#F5E6D3] border border-[#F5E6D3]/20 rounded-lg hover:border-[#DE9E67]/50 transition-colors whitespace-nowrap w-full sm:w-auto"
                    style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.06em', fontSize: '12px' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    03 27 37 16 84
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials / Cas Clients Section */}
        <section id="avis" className="pt-8 pb-8 md:pt-24 md:pb-8 relative bg-[#FAF2E9]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-20 items-start max-w-7xl">
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                  La parole à nos clients
                </span>
                <h2
                  className="text-deep-roast leading-tight"
                  style={{
                    fontFamily: 'var(--font-sora)',
                    fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Une expérience <span className="text-sienna-racing">appréciée</span>
                </h2>
              </div>
              <div className="lg:pt-8">
                <p
                  className="text-deep-roast/70 leading-relaxed"
                  style={{ fontSize: 'clamp(0.95rem, 1vw, 1.05rem)', fontFamily: 'var(--font-ibm-plex-sans)' }}
                >
                  Ce que nos clients disent de nous. Des entreprises de toutes tailles, unies par la même exigence de qualité et de service.
                </p>
              </div>
            </div>

            <div className="md:hidden mb-12">
              <div
                ref={testimonialScrollRef}
                onScroll={handleTestimonialScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4"
                style={{ scrollPaddingLeft: '1rem', overscrollBehaviorX: 'contain', touchAction: 'pan-x', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {testimonialItems.map((t: any) => (
                  <div
                    key={t.name}
                    className="snap-start shrink-0 w-[85vw] bg-white border border-deep-roast/10 shadow-sm px-5 py-5 rounded-[1.1rem] flex flex-col"
                  >
                    <div className="flex gap-1 mb-3 text-golden-extraction">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                    <p
                      className="text-deep-roast/75 italic leading-relaxed text-[0.98rem] flex-grow"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                    >
                      &ldquo;{t.review}&rdquo;
                    </p>
                    <div className="mt-4 pt-4 border-t border-deep-roast/8">
                      <p className="text-deep-roast font-medium text-sm" style={{ fontFamily: 'var(--font-sora)' }}>{t.name}</p>
                      <p className="text-deep-roast/50 text-xs mt-0.5" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>Avis Google</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {testimonialItems.map((_: any, idx: number) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeTestimonialDot === idx ? 'w-6 bg-golden-extraction' : 'w-1.5 bg-deep-roast/20'}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {testimonialItems.map((t: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                  className="bg-white border border-deep-roast/10 shadow-sm p-8 rounded-lg flex flex-col"
                >
                  <div className="flex gap-1 mb-4 text-golden-extraction">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-deep-roast/80 italic mb-6 flex-grow leading-relaxed" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                    "{t.review}"
                  </p>
                  <div>
                    <p className="text-deep-roast font-medium text-sm" style={{ fontFamily: 'var(--font-sora)' }}>{t.name}</p>
                    <p className="text-deep-roast/50 text-xs mt-0.5" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>Avis Google</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/Prodia+%2B+ANS+(Automatique+Nord+Service)/@50.1529539,3.2171998,18z/data=!3m1!4b1!4m6!3m5!1s0x47c2966792d94f13:0x824371045fc07674!8m2!3d50.1529539!4d3.2187845!16s%2Fg%2F1ptwl3984?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-golden-extraction hover:text-white transition-colors duration-300 border-b border-golden-extraction/30 pb-1 text-sm tracking-widest uppercase font-mono"
              >
                Voir nos avis sur Google <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </section>

        {/* ADN Section (Timeline) */}
        <section id="adn" className="pt-6 pb-4 md:pt-12 md:pb-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-20"
            >
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4">
                  Notre Histoire
                </span>
                <h2
                  className="text-deep-roast leading-tight"
                  style={{
                    fontFamily: 'var(--font-sora)',
                    fontSize: 'clamp(1rem, 6.2vw, 3.5rem)',
                    fontWeight: 600,
                  }}
                >
                  + de 40 Ans <span className="text-sienna-racing">d&apos;Excellence</span>
                </h2>
              </div>
              <p className="text-deep-roast/50 text-sm max-w-xs leading-relaxed md:text-right" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                De l'entreprise familiale au partenaire QVT de référence.
              </p>
            </motion.div>

            <Timeline milestones={milestoneItems} />
          </div>
        </section>

        {/* Section RSE */}
        <section id="rse" className="pt-8 pb-8 md:py-24 relative overflow-hidden bg-[#FAF2E9]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sienna-racing/5 to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 flex flex-col gap-8 lg:gap-16">

            {/* Text content - Split layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                {/* Left: Title */}
                <div className="lg:w-[40%] shrink-0">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.22em] text-golden-extraction mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}>
                    Notre Engagement
                  </span>
                  <h2
                    className="text-deep-roast leading-tight"
                    style={{
                      fontFamily: 'var(--font-sora)',
                      fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Une démarche <span className="text-sienna-racing">durable</span> et responsable
                  </h2>
                </div>

                {/* Right: Intro + Bullets (desktop only — bullets hidden on mobile) */}
                <div className="lg:w-[60%] flex flex-col justify-center">
                  <p className="text-deep-roast/70 leading-relaxed md:mb-8 text-justify" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: 'clamp(0.95rem, 1vw, 1.05rem)' }}>
                    Nous n'avons pas attendu que ce soit dans l'air du temps. Dès le départ, nous nous sommes posé une question simple : serions-nous fiers de montrer comment nous travaillons à nos enfants ? C'est cette exigence qui oriente nos choix, des cafés que nous sélectionnons jusqu'aux tournées que nous planifions. Pas une posture, une conviction !
                  </p>

                  {/* Bullets — visible on desktop only */}
                  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {[
                      "Cafés labellisés Bio et Équitable",
                      "Revalorisation à 100% du marc de café",
                      "Machines éco-performantes",
                      "Tournées optimisées et éco-conduite"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-golden-extraction shrink-0 bg-white p-1.5 rounded-full shadow-sm">
                          <Award className="w-4 h-4" />
                        </span>
                        <span className="text-deep-roast/80 leading-snug font-medium" style={{ fontFamily: 'var(--font-ibm-plex-sans)', fontSize: '0.95rem' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Marquee — visible on mobile only */}
                  <div className="md:hidden mt-8 -mx-8 relative overflow-hidden flex flex-col gap-3 py-2">
                    {/* Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-coffee-cream to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-coffee-cream to-transparent z-10 pointer-events-none"></div>

                    {/* Line 1: Right-moving */}
                    <div className="flex py-1">
                      <motion.div
                        className="flex gap-3 shrink-0 px-2"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                      >
                        {[
                          "Cafés labellisés Bio et Équitable",
                          "Revalorisation à 100% du marc de café",
                          "Cafés labellisés Bio et Équitable",
                          "Revalorisation à 100% du marc de café",
                          "Cafés labellisés Bio et Équitable",
                          "Revalorisation à 100% du marc de café",
                          "Cafés labellisés Bio et Équitable",
                          "Revalorisation à 100% du marc de café"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/60 border border-border px-4 py-2 rounded-full whitespace-nowrap shadow-sm">
                            <span className="text-golden-extraction shrink-0 bg-white p-1 rounded-full shadow-sm">
                              <Award className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-deep-roast/80 leading-snug font-medium text-sm" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Line 2: Left-moving */}
                    <div className="flex py-1">
                      <motion.div
                        className="flex gap-3 shrink-0 px-2"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                      >
                        {[
                          "Machines éco-performantes",
                          "Tournées optimisées et éco-conduite",
                          "Machines éco-performantes",
                          "Tournées optimisées et éco-conduite",
                          "Machines éco-performantes",
                          "Tournées optimisées et éco-conduite",
                          "Machines éco-performantes",
                          "Tournées optimisées et éco-conduite"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-white/60 border border-border px-4 py-2 rounded-full whitespace-nowrap shadow-sm">
                            <span className="text-golden-extraction shrink-0 bg-white p-1 rounded-full shadow-sm">
                              <Award className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-deep-roast/80 leading-snug font-medium text-sm" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Panoramic Visual image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-[1.5rem] overflow-hidden group shadow-[0_12px_40px_rgba(43,18,0,0.08)]"
            >
              {/* Both mobile and desktop use the image's true ratio — no letterboxing */}
              <style>{`
                .rse-image-ratio { aspect-ratio: 10603 / 3386; }
                .rse-image-ratio img { object-fit: contain !important; }
                @media (min-width: 768px) {
                  .rse-image-ratio img { object-fit: cover !important; }
                }
              `}</style>
              <div className="rse-image-ratio w-full relative">
                <div className="absolute inset-0 bg-deep-roast/5 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply pointer-events-none" />
                <Image
                  src="/VISUEL1jpg.png"
                  alt="Engagement RSE ANS - Panorama"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

          </div>
        </section>

        <FAQSection
          items={faqItems}
          activeIndex={activeFaqIndex}
          onToggle={(index) =>
            setActiveFaqIndex((currentIndex) =>
              currentIndex === index ? -1 : index
            )
          }
        />

        {/* Footer / Contact CTA */}
        <section id="contact" className="pt-8 pb-16 md:py-20 relative overflow-hidden bg-[#FAF2E9]">
          <div className="absolute bottom-0 left-0 w-full h-full from-sienna-racing/10 to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-7xl mb-6 tracking-tight" style={{ fontFamily: 'var(--font-sora)', fontWeight: 600 }}>Prêt pour l&apos;infusion ?</h2>
            <p className="text-base md:text-xl text-deep-roast/70 mb-10 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}>
              Discutons de votre projet d&apos;espace détente. Nos experts sont prêts à concevoir la solution idéale pour vos collaborateurs.
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold text-deep-roast bg-golden-extraction rounded-lg whitespace-nowrap"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Nous contacter <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="tel:0327371684"
                className="inline-flex items-center gap-2.5 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm text-deep-roast border border-deep-roast/20 rounded-lg hover:border-golden-extraction/50 transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.06em' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                03 27 37 16 84
              </motion.a>
            </div>

            <p
              className="text-deep-roast/40 text-[9px] sm:text-xs whitespace-nowrap"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Audit gratuit · Réponse sous 24h · Hauts-de-France
            </p>
          </div>
        </section>


      </div>
    </>
  );
}
