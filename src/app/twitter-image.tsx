/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ANS – Pause Évasion | Distributeurs automatiques & café pour entreprises';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FAF2E9 0%, #F0E4D4 50%, #E8D5BE 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative corner elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              width: 60,
              height: 60,
              borderTop: '3px solid #C8763A',
              borderLeft: '3px solid #C8763A',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              width: 60,
              height: 60,
              borderBottom: '3px solid #C8763A',
              borderRight: '3px solid #C8763A',
              display: 'flex',
            }}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          {/* Logo icon placeholder */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: 20,
              backgroundColor: '#2B1200',
            }}
          >
            <span style={{ fontSize: 52, display: 'flex' }}>☕</span>
          </div>

          {/* Company name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#2B1200',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              A.N.S
            </span>
            <span
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: '#688125',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Pause Évasion
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 2,
              backgroundColor: '#C8763A',
              borderRadius: 2,
              display: 'flex',
            }}
          />

          {/* Tagline */}
          <span
            style={{
              fontSize: 22,
              color: '#2B1200',
              opacity: 0.7,
              maxWidth: 700,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Expert en solutions de pause café & distribution automatique pour entreprises
          </span>

          {/* Bottom badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 12,
              padding: '10px 24px',
              borderRadius: 999,
              backgroundColor: 'rgba(43, 18, 0, 0.08)',
            }}
          >
            <span style={{ fontSize: 14, color: '#C8763A', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex' }}>
              Hauts-de-France · Depuis 1981 · Réseau Prodia+
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
