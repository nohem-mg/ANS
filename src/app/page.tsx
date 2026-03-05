'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Award,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';

// --- Components ---

// 1. "Infusion" Loader
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-deep-roast text-coffee-cream"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, transition: { delay: 2.5, duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
    >
      <div className="relative">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-1 bg-golden-extraction absolute left-1/2 -translate-x-1/2 top-0"
          style={{ originY: 0 }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-28 text-6xl font-bold tracking-tighter"
        >
          ANS
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-4 text-golden-extraction text-sm uppercase tracking-[0.3em] text-center"
        >
          Expérience Café
        </motion.div>
      </div>
    </motion.div>
  );
};

// 2. Stylized Coffee Bean Background
const CoffeeBeanParticles = () => {
  // Generates random positions for background elements
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    duration: Math.random() * 20 + 10,
  }));

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

// 3. Capsule Button
const CapsuleButton = ({ children, href, variant = 'primary' }: { children: React.ReactNode, href: string, variant?: 'primary' | 'secondary' }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-sm tracking-wide overflow-hidden group ${
        variant === 'primary' 
          ? 'bg-sienna-racing text-white shadow-[0_0_20px_rgba(182,114,54,0.3)]' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 text-coffee-cream hover:bg-white/10'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.a>
  );
};

// 4. Reactive Status Widget
const ReactiveStatusWidget = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
      className="fixed bottom-8 right-8 z-40 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-xs"
    >
      <div className="relative">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
      </div>
      <div>
        <div className="text-xs text-golden-extraction font-bold uppercase tracking-wider">Statut Équipe</div>
        <div className="text-sm font-medium text-coffee-cream">30 collaborateurs prêts à intervenir</div>
      </div>
    </motion.div>
  );
};

// 5. Timeline Item
const TimelineItem = ({ year, title, desc, index }: { year: string, title: string, desc: string, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -50 : 50, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, x }}
      className={`flex items-center gap-8 mb-20 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'}`}
    >
      <div className="w-1/2 px-8">
        <h3 className="text-6xl font-bold text-white/5">{year}</h3>
        <h4 className="text-xl font-bold text-golden-extraction mb-2">{title}</h4>
        <p className="text-coffee-cream/70 leading-relaxed">{desc}</p>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-sienna-racing border-4 border-deep-roast z-10" />
        <div className="absolute w-px h-full bg-white/10 -top-1/2" />
      </div>
      <div className="w-1/2" /> {/* Spacer */}
    </motion.div>
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
      style={{ opacity, y, paddingTop: 'clamp(2rem, 5vw, 4rem)', paddingBottom: 'clamp(2rem, 5vw, 4rem)' }}
      className="group relative flex flex-col md:flex-row md:items-center gap-5 md:gap-16 border-b border-coffee-cream/[0.12] overflow-hidden"
    >
      {/* Left column: icon + title */}
      <div className="md:w-[30%] flex items-center gap-4 flex-shrink-0 relative z-10">
        <div className="text-coffee-cream/40 group-hover:text-golden-extraction transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
        <h3
          className="text-coffee-cream font-semibold"
          style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)', letterSpacing: '0.1em', textTransform: 'uppercase' }}
        >
          {title}
        </h3>
      </div>

      {/* Right column: description */}
      <p
        className="md:w-[70%] text-coffee-cream/60 relative z-10 group-hover:text-coffee-cream/80 transition-colors duration-300"
        style={{ lineHeight: 1.75, fontSize: 'clamp(0.875rem, 1.05vw, 1rem)' }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-deep-roast text-coffee-cream font-sans selection:bg-golden-extraction selection:text-deep-roast overflow-x-hidden">
      <CoffeeBeanParticles />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sienna-racing to-golden-extraction origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="fixed top-0 w-full z-40 px-6 py-6"
      >
        <div className="max-w-7xl mx-auto flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-2xl">
          <div className="flex-1">
            <span className="text-2xl font-bold tracking-tighter text-coffee-cream">ANS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-coffee-cream/80">
            <a href="#adn" className="hover:text-golden-extraction transition-colors">Notre ADN</a>
            <a href="#services" className="hover:text-golden-extraction transition-colors">L'Expérience</a>
            <a href="#partenaires" className="hover:text-golden-extraction transition-colors">Confiance</a>
            <a href="/about" className="hover:text-golden-extraction transition-colors">À Propos</a>
          </div>
          <div className="flex-1 flex justify-end">
            <CapsuleButton href="#contact" variant="primary">
              Contact
              <ArrowRight className="w-4 h-4" />
            </CapsuleButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sienna-racing/10 border border-sienna-racing/20 text-golden-extraction text-xs tracking-widest uppercase font-bold"
            >
              <Zap className="w-4 h-4" />
              La Pause Café Réinventée
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight"
            >
              <span className="text-white/20 block text-5xl md:text-6xl mb-2">Au-delà de la</span>
              Machine
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl text-coffee-cream/70 max-w-lg leading-relaxed border-l-2 border-golden-extraction pl-6"
            >
              Depuis 40 ans, nous transformons la pause café en un levier de Qualité de Vie au Travail. 
              Service ultra-personnalisé, réactivité immédiate et engagement familial.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <CapsuleButton href="#services" variant="primary">
                Découvrir l'Excellence
              </CapsuleButton>
              <CapsuleButton href="#adn" variant="secondary">
                Notre Histoire
              </CapsuleButton>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="relative hidden lg:block"
          >
            {/* Abstract visual representing high-tech coffee */}
            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-1">
              <div className="absolute inset-0 bg-deep-roast/50 mix-blend-overlay" />
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-black/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                 {/* Visual simulation of steam/aroma */}
                 <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-sienna-racing/20 to-transparent blur-3xl animate-pulse" />
                 <h2 className="relative z-20 text-center font-bold text-4xl tracking-widest text-white/10 uppercase">
                    Precision<br/>Brewing
                 </h2>
              </div>
            </div>
            
            {/* Decorative elements behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-golden-extraction/5 blur-[100px] rounded-full -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-golden-extraction/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* ADN Section (Timeline) */}
      <section id="adn" className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">40 Ans d'Excellence</h2>
            <div className="w-24 h-1 bg-golden-extraction mx-auto rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/5" />
            
            <TimelineItem 
              index={0}
              year="1980"
              title="La Genèse"
              desc="Fondation d'une entreprise familiale avec une mission simple : apporter de la convivialité dans les bureaux."
            />
            <TimelineItem 
              index={1}
              year="2000"
              title="L'Expansion"
              desc="Intégration du groupement Prodia+ pour garantir une couverture nationale tout en gardant notre indépendance."
            />
            <TimelineItem 
              index={2}
              year="2024"
              title="La Révolution QVT"
              desc="Transformation vers des solutions de bien-être global. Plus que du café, des espaces de vie."
            />
          </div>
        </div>
      </section>

      {/* Services Section — Spec-Sheet Layout */}
      <section id="services" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <span className="text-golden-extraction text-xs tracking-[0.2em] uppercase font-semibold mb-5 block">Notre Savoir-Faire</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                L'Excellence de la <br />
                <span className="text-sienna-racing">Pause Technique.</span>
              </h2>
            </div>
            <p className="max-w-sm text-coffee-cream/50 leading-relaxed text-sm md:text-right">
              Des équipements de pointe pilotés par une équipe humaine dédiée.{' '}
              La technologie au service de l'humain.
            </p>
          </div>

          {/* Spec-sheet rows */}
          <div className="border-t border-coffee-cream/[0.12]">
            <ServiceRow
              title="Coffee Corners"
              desc="Architecture d'espaces de pause premium. Mobilier design et ambiance feutrée pour favoriser les échanges."
              icon={<CoffeeCornerIcon />}
            />
            <ServiceRow
              title="Disponibilité Totale"
              desc="Notre promesse : une réactivité sans faille. Une machine à l'arrêt, c'est une pause gâchée. Nous ne laissons jamais cela arriver."
              icon={<MaintenanceIcon />}
            />
            <ServiceRow
              title="Partenariat Durable"
              desc="La fidélisation est notre KPI principal. Nous construisons des relations long terme basées sur la confiance et la transparence."
              icon={<PartnershipIcon />}
            />
          </div>

        </div>
      </section>



      {/* Footer / Contact CTA */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-sienna-racing/10 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Prêt pour l'infusion ?</h2>
          <p className="text-xl text-coffee-cream/60 mb-12 max-w-2xl mx-auto">
            Discutons de votre projet d'espace détente. Nos experts sont prêts à concevoir la solution idéale pour vos collaborateurs.
          </p>
          
          <form className="max-w-md mx-auto space-y-4 text-left">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Votre email professionnel" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-coffee-cream focus:outline-none focus:border-golden-extraction/50 transition-colors backdrop-blur-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sienna-racing/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <button className="w-full bg-golden-extraction text-deep-roast font-bold py-4 rounded-2xl hover:bg-white transition-colors flex items-center justify-center gap-2">
              Lancer la discussion <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-coffee-cream/30">
            <p>© {new Date().getFullYear()} ANS. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-golden-extraction">Mentions Légales</a>
               <a href="#" className="hover:text-golden-extraction">Confidentialité</a>
            </div>
          </div>
        </div>
      </section>

      <ReactiveStatusWidget />
    </div>
  );
}
