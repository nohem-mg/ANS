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
const POSITIONS: Record<number, string> = {
    1: '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
    2: '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
    3: '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
    4: '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
    5: '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
    6: '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
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
        <div ref={container} className="relative h-[300vh]">
            <div className="sticky top-[68px] h-[calc(100vh-68px)] overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length];

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${POSITIONS[index] || ''}`}
                        >
                            <div className="relative h-[25vh] w-[25vw]">
                                <img
                                    src={src}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    className="h-full w-full rounded-sm object-cover"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
