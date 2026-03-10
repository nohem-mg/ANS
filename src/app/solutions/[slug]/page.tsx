import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

import { getSolutionBySlug, SOLUTIONS } from '@/app/solutions/data';

type SolutionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const C = {
  bg: '#2B1200',
  surface: '#3A1A06',
  accent: '#C8763A',
  gold: '#DE9E67',
  textPrimary: '#F5E6D3',
  textMuted: 'rgba(245,230,211,0.68)',
  divider: 'rgba(245,230,211,0.12)',
} as const;

export async function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Solution introuvable · ANS',
    };
  }

  return {
    title: `${solution.title} · ANS`,
    description: solution.summary,
  };
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const Icon = solution.icon;

  return (
    <div
      style={{
        backgroundColor: C.bg,
        color: C.textPrimary,
        minHeight: '100vh',
      }}
    >
      <section
        style={{
          padding:
            'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px) clamp(72px, 9vw, 120px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link
            href="/solutions"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: C.textMuted,
              textDecoration: 'none',
              marginBottom: 28,
              fontSize: 13,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-ibm-plex-mono)',
            }}
          >
            <ArrowLeft size={14} />
            Retour aux solutions
          </Link>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 0.95fr',
              gap: 'clamp(28px, 5vw, 72px)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  border: `1px solid ${C.divider}`,
                  borderRadius: 999,
                  padding: '10px 16px',
                  color: C.gold,
                  background: 'rgba(255,255,255,0.02)',
                  marginBottom: 24,
                }}
              >
                <Icon size={18} />
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-ibm-plex-mono)',
                  }}
                >
                  {solution.category}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  margin: '0 0 20px',
                }}
              >
                {solution.title}
              </h1>

              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.75,
                  color: C.textMuted,
                  maxWidth: 640,
                  margin: '0 0 18px',
                }}
              >
                {solution.description}
              </p>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: C.textMuted,
                  maxWidth: 620,
                  margin: 0,
                }}
              >
                {solution.summary}
              </p>
            </div>

            <div
              style={{
                position: 'relative',
                minHeight: 520,
                borderRadius: 28,
                overflow: 'hidden',
                border: `1px solid ${C.divider}`,
                boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
              }}
            >
              <Image
                src={solution.image}
                alt={solution.title}
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.68) 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '0 clamp(20px, 4vw, 48px) clamp(72px, 10vw, 120px)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 22,
          }}
        >
          <InfoCard
            title="Points forts"
            items={solution.highlights}
          />
          <InfoCard
            title="Ideal pour"
            items={solution.idealFor}
          />
          <InfoCard
            title="Ce que nous mettons en place"
            items={solution.features}
          />
        </div>
      </section>

      <section
        style={{
          backgroundColor: C.surface,
          padding:
            'clamp(56px, 8vw, 88px) clamp(20px, 4vw, 48px) clamp(72px, 10vw, 120px)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            border: `1px solid ${C.divider}`,
            borderRadius: 28,
            padding: 'clamp(28px, 4vw, 44px)',
            background:
              'linear-gradient(135deg, rgba(200,118,58,0.1), rgba(255,255,255,0.02))',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 660 }}>
              <p
                style={{
                  color: C.gold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  fontSize: 12,
                  margin: '0 0 14px',
                  fontFamily: 'var(--font-ibm-plex-mono)',
                }}
              >
                Projet entreprise
              </p>
              <h2
                style={{
                  margin: '0 0 14px',
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                }}
              >
                Besoin d&apos;une implantation adaptee a votre site ?
              </h2>
              <p
                style={{
                  margin: 0,
                  color: C.textMuted,
                  lineHeight: 1.75,
                  fontSize: 16,
                }}
              >
                Nous vous aidons a choisir la bonne configuration selon vos
                usages, vos volumes et vos contraintes techniques.
              </p>
            </div>

            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                backgroundColor: C.gold,
                color: '#1C0A00',
                padding: '14px 22px',
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Demander un devis
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          section div[style*="grid-template-columns: 1.05fr 0.95fr"] {
            grid-template-columns: 1fr !important;
          }

          section div[style*="grid-template-columns: repeat(3, minmax(0, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      style={{
        border: '1px solid rgba(245,230,211,0.12)',
        borderRadius: 24,
        padding: '28px 24px',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-sora)',
          fontSize: 24,
          margin: '0 0 20px',
        }}
      >
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              color: 'rgba(245,230,211,0.78)',
              lineHeight: 1.65,
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 3 }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
