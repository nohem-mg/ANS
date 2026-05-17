'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect (max 7 images) */
    images: Image[];
}

/**
 * Positions for satellite images (index 1–6) around the center image (index 0).
 * As scroll progresses, all images scale up. The center image scales from 1→4
 * (eventually filling the viewport), while surrounding images scale faster
 * (1→5 to 1→9) and fly out of the viewport — creating a "zoom into center" effect.
 */
/**
 * Positions for satellite images (index 1–6) around the center image (index 0).
 * Desktop (md:) uses the original spread. Mobile uses a tighter, vertically-oriented cluster.
 */
const POSITIONS: Record<number, string> = {
    1: '[&>div]:!-top-[22vh] [&>div]:!-left-[15vw] [&>div]:!h-[18vh] [&>div]:!w-[45vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]',
    2: '[&>div]:!top-[22vh] [&>div]:!left-[15vw] [&>div]:!h-[18vh] [&>div]:!w-[45vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]',
    3: '[&>div]:!top-[2vh] [&>div]:!left-[22vw] [&>div]:!h-[15vh] [&>div]:!w-[35vw] md:[&>div]:!top-[0vh] md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]',
    4: 'hidden md:flex md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]',
    5: 'hidden md:flex md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]',
    6: 'hidden md:flex md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]',
};

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    // Center image: scales to ~4× → fills viewport (a 25vw box × 4 = 100vw)
    const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 4]);

    // Satellite images: scale faster so they fly out of the viewport
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    // Index 0 = center (slowest), rest = satellites (progressively faster)
    const scales = [scaleCenter, scale5, scale6, scale5, scale6, scale8, scale9];

    return (
        <div className="relative md:h-[300vh] h-auto w-full">
            
            {/* ── DESKTOP : Effet Zoom Parallax ── */}
            <div ref={container} className="hidden md:block absolute inset-0 w-full">
                <div className="sticky top-[68px] h-[calc(100vh-68px)] overflow-hidden">
                    {images.map(({ src, alt }, index) => {
                        const scale = scales[index % scales.length];

                        return (
                            <motion.div
                                key={index}
                                style={{ scale }}
                                className={`absolute top-0 flex h-full w-full items-center justify-center ${POSITIONS[index] || ''}`}
                            >
                                <div className="relative h-[25vh] w-[25vw] shadow-2xl">
                                    <img
                                        src={src}
                                        alt={alt || `Parallax image ${index + 1}`}
                                        className="h-full w-full rounded-sm object-cover"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                    <motion.div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="rounded-full border border-[#F5E6D3]/20 bg-[#2B1200]/55 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#F5E6D3]/75 backdrop-blur-md">
                            Faites défiler
                        </span>
                        <motion.span
                            className="text-lg leading-none text-[#DE9E67]/75"
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            {/* ── MOBILE : Carrousel Horizontal Fluide ── */}
            <div className="block md:hidden w-full pb-8 pt-0">
                {/* Style pour cacher la scrollbar sur mobile tout en gardant le scroll */}
                <style>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 pb-8 gap-4 items-center">
                    {images.map(({ src, alt }, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="shrink-0 snap-center relative overflow-hidden rounded-2xl shadow-lg bg-black/5"
                            style={{ 
                                width: '85vw', 
                                height: index % 2 === 0 ? '55vh' : '45vh',
                                maxWidth: '340px'
                            }}
                        >
                            <img 
                                src={src} 
                                alt={alt || `Image ${index + 1}`} 
                                className="w-full h-full object-cover" 
                            />
                        </motion.div>
                    ))}
                </div>
                
                <div className="flex justify-center gap-2 mt-2">
                    {/* Indicateur visuel pour faire comprendre le swipe */}
                    <span className="text-[10px] uppercase tracking-widest text-amber-800/40 font-mono">
                        ← Glisser pour explorer →
                    </span>
                </div>
            </div>

        </div>
    );
}
