'use client';

import Image from 'next/image';

export interface ImageAutoSliderProps {
  images?: string[];
  speed?: number;
  className?: string;
}

const DEFAULT_IMAGES = [
  '/p1.jpg',
  '/p2.jpg',
  '/p3.jpg',
  '/instant-cafe-ans.jpeg',
  '/distrib-auto-ans.jpeg',
  '/distributeur-coffe.JPG',
  '/locaux-ans.jpeg',
  '/bureau-ans.jpeg',
];

export function ImageAutoSlider({
  images = DEFAULT_IMAGES,
  speed = 75,
  className,
}: ImageAutoSliderProps) {
  const items = [...images, ...images];

  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <style>{`
        @keyframes ans-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ans-marquee {
          animation: ans-marquee-scroll ${speed}s linear infinite;
          will-change: transform;
        }
        .ans-marquee:hover { animation-play-state: paused; }
        .ans-marquee-mask {
          -webkit-mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          mask: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
          touch-action: pan-y;
        }
        @media (max-width: 640px) {
          .ans-marquee-mask {
            -webkit-mask: linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%);
            mask: linear-gradient(90deg, transparent 0%, #000 4%, #000 96%, transparent 100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ans-marquee { animation-duration: 180s; }
        }
      `}</style>

      <div className="ans-marquee-mask overflow-hidden">
        <div className="ans-marquee flex w-max gap-5">
          {items.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="ans-marquee-card relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-2xl shadow-[0_14px_38px_rgba(43,18,0,0.12)] md:h-72 md:w-72 lg:h-80 lg:w-80"
            >
              <Image
                src={src}
                alt=""
                aria-hidden={i >= images.length}
                fill
                unoptimized
                sizes="(max-width: 768px) 14rem, (max-width: 1024px) 18rem, 20rem"
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
