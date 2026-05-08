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
  // Read the ANS logo from the public directory
  const logoData = await fetch(
    new URL('../../public/logo-ans-entier.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

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
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#2B1200',
        }}
      >
        {/* Background coffee image */}
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2560&auto=format&fit=crop"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Dark overlay gradients for readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to top, rgba(43,18,0,0.92) 0%, rgba(43,18,0,0.65) 50%, rgba(43,18,0,0.85) 100%)',
            display: 'flex',
          }}
        />

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
              top: 36,
              left: 36,
              width: 50,
              height: 50,
              borderTop: '2px solid rgba(200,118,58,0.6)',
              borderLeft: '2px solid rgba(200,118,58,0.6)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 36,
              right: 36,
              width: 50,
              height: 50,
              borderBottom: '2px solid rgba(200,118,58,0.6)',
              borderRight: '2px solid rgba(200,118,58,0.6)',
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
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ANS Logo */}
          <img
            src={logoData as unknown as string}
            width={800}
            height={342}
            alt="ANS Pause Évasion"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
