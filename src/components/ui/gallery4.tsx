'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const data: Gallery4Item[] = [
  {
    id: 'pause-cafe',
    title: 'Machines espresso premium',
    description:
      'Une experience barista en libre-service avec des machines intuitives, performantes et faciles a maintenir au quotidien.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'fontaines',
    title: 'Fontaines a eau design',
    description:
      'Des equipements sobres et fiables qui s’integrent naturellement dans les espaces de pause et les zones de circulation.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'snacking',
    title: 'Distribution snacks et frais',
    description:
      'Une offre complete pour accompagner les temps forts de la journee avec des produits visibles, bien presentes et accessibles.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1481833761820-0509d3217039?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'coffee-corner',
    title: 'Coffee corners sur mesure',
    description:
      'Des espaces plus chaleureux, plus premium et plus engageants pour transformer la pause en vrai moment de convivialite.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 'maintenance',
    title: 'Suivi et maintenance reactive',
    description:
      'Une exploitation durable du parc avec supervision, entretien preventif et interventions rapides quand cela compte.',
    href: '#',
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];

const Gallery4 = ({
  title = 'Case Studies',
  description = 'Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.',
  items = data,
}: Gallery4Props) => {
  return (
    <section className="pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-16 lg:pb-32">
      <div className="container mx-auto px-5 md:px-6">
        <div className="mb-10 max-w-3xl md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span
              className="text-xs font-semibold uppercase tracking-[0.22em] text-primary"
              style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              Notre parc
            </span>
            <h2
              className="text-3xl font-medium md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              {title}
            </h2>
            <p
              className="max-w-2xl text-muted-foreground"
              style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          className="gallery4-scroll flex flex-nowrap gap-5 overflow-x-auto overflow-y-hidden pb-4 -mx-5 px-5 pt-1 scroll-smooth snap-x snap-mandatory scroll-pl-5 scroll-pr-5 lg:mx-0 lg:grid lg:w-full lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:p-0 lg:pb-0 lg:scroll-pl-0 lg:scroll-pr-0"
          role="region"
          aria-label="Familles de solutions du parc"
          style={{
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
          }}
        >
          <style>{`
            .gallery4-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group block shrink-0 snap-start rounded-2xl w-[min(85vw,22rem)] max-w-[22rem] sm:w-[min(85vw,24rem)] sm:max-w-[24rem] lg:w-auto lg:max-w-none lg:min-w-0 lg:snap-none"
              aria-label={item.title}
            >
              <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_22px_70px_rgba(0,0,0,0.28)] sm:min-h-[26rem] md:min-h-[30rem] lg:min-h-[32rem]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1023px) 85vw, 33vw"
                  className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-8">
                  <div className="rounded-2xl border border-white/12 bg-[#140c08] p-5 text-white md:p-6">
                    <div
                      className="mb-3 text-lg font-semibold sm:text-xl md:text-2xl"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="flex items-center text-sm font-medium text-[#DE9E67]"
                      style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
                    >
                      Voir le detail
                      <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
