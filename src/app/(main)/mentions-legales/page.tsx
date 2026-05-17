'use client';

import Link from 'next/link';

const C = {
  bg: '#FAF2E9',
  dark: '#2B1200',
  accent: '#DE9E67',
  text: '#3D1F00',
  muted: 'rgba(43,18,0,0.5)',
  border: 'rgba(43,18,0,0.1)',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--font-sora)',
          fontSize: 'clamp(17px, 2vw, 20px)',
          fontWeight: 600,
          color: C.dark,
          marginBottom: 16,
          paddingBottom: 10,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--font-sora)', fontSize: 15, lineHeight: 1.85, color: C.text }}>
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
      <span style={{ color: C.muted, minWidth: 240, fontSize: 14 }}>{label}</span>
      <span style={{ color: C.dark, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: C.dark,
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 6vw, 80px) clamp(40px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C.accent,
              marginBottom: 16,
            }}
          >
            Informations légales
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-sora)',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: '#FFF6EF',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Mentions Légales
          </h1>
          <p style={{ fontFamily: 'var(--font-sora)', fontSize: 15, color: 'rgba(255,246,239,0.6)', lineHeight: 1.75 }}>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
            dans l'économie numérique (LCEN).
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 880,
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px)',
        }}
      >

        <Section title="1. Éditeur du site">
          <Row label="Dénomination sociale" value="Automatique Nord Service — A.N.S." />
          <Row label="Nom commercial" value="Automatique Nord Service" />
          <Row label="Forme juridique" value="SARL — Société à responsabilité limitée" />
          <Row label="Capital social" value="7 622,45 €" />
          <Row label="Siège social" value="ZAC du Faubourg de Paris, 780 rue Blaise Pascal, 59267 Proville, France" />
          <Row label="Téléphone" value={<a href="tel:+33327371684" style={{ color: C.dark, textDecoration: 'none' }}>03 27 37 16 84</a>} />
          <Row label="Email" value={<a href="mailto:ans@prodiaplus.fr" style={{ color: C.dark, textDecoration: 'none' }}>ans@prodiaplus.fr</a>} />
          <Row label="SIREN" value="321 797 292" />
          <Row label="SIRET (siège)" value="321 797 292 00034" />
          <Row label="RCS" value="321 797 292 R.C.S. Douai" />
          <Row label="N° TVA intracommunautaire" value="FR67321797292" />
          <Row label="Code NAF / APE" value="4799B" />
          <Row label="Date de création" value="07 mai 1981" />
        </Section>

        <Section title="2. Directeur de la publication">
          <p style={{ marginBottom: 8 }}>
            Le directeur de la publication est <strong>Jean-Yves Santer</strong>, gérant de la société Automatique Nord Service.
          </p>
          <p>
            Pour toute demande relative au contenu du site, vous pouvez le contacter à l'adresse suivante :{' '}
            <a href="mailto:ans@prodiaplus.fr" style={{ color: C.dark }}>ans@prodiaplus.fr</a>.
          </p>
        </Section>

        <Section title="3. Hébergement">
          <Row label="Hébergeur" value="Vercel Inc." />
          <Row label="Adresse" value="340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis" />
          <Row label="Site web" value={<a href="https://vercel.com" style={{ color: C.dark, textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">vercel.com</a>} />
          <p style={{ marginTop: 12, color: C.muted, fontSize: 14 }}>
            Vercel est soumis au RGPD via le mécanisme des clauses contractuelles types (CCT) approuvées par la Commission européenne.
          </p>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p style={{ marginBottom: 12 }}>
            L'ensemble du contenu de ce site — textes, images, graphismes, logo, icônes, sons, logiciels — est la propriété exclusive
            d'ANS (Automatique Nord Service) ou de ses partenaires, et est protégé par les lois françaises et internationales relatives
            à la propriété intellectuelle.
          </p>
          <p style={{ marginBottom: 12 }}>
            Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou
            de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l'autorisation
            préalable et écrite d'ANS.
          </p>
          <p>
            Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et pénale du
            contrefacteur (articles L.335-2 et suivants du Code de la Propriété Intellectuelle).
          </p>
        </Section>

        <Section title="5. Limitation de responsabilité">
          <p style={{ marginBottom: 12 }}>
            ANS met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés. Cependant,
            ANS ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence
            de virus sur son site.
          </p>
          <p style={{ marginBottom: 12 }}>
            Les informations communiquées sont présentées à titre purement indicatif et sont sans valeur contractuelle. Malgré des
            mises à jour régulières, ANS ne peut être tenu responsable de la modification des dispositions administratives et
            juridiques survenant après la publication.
          </p>
          <p>
            ANS ne peut être tenu responsable des liens hypertextes mis en place dans le cadre du présent site internet vers d'autres
            ressources présentes sur le réseau Internet.
          </p>
        </Section>

        <Section title="6. Droit applicable et juridiction compétente">
          <p style={{ marginBottom: 12 }}>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable,
            les tribunaux français seront seuls compétents.
          </p>
          <p>
            Pour tout litige relatif à l'utilisation de ce site, la juridiction compétente est celle du ressort du siège social
            d'ANS, sauf disposition légale impérative contraire.
          </p>
        </Section>

        <Section title="7. Données personnelles">
          <p>
            La collecte et le traitement des données à caractère personnel effectués via ce site sont détaillés dans notre{' '}
            <Link href="/confidentialite" style={{ color: C.dark, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Politique de Confidentialité
            </Link>.
          </p>
        </Section>

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: C.muted,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ← Retour à l'accueil
          </Link>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: C.muted, marginTop: 16 }}>
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </div>
    </main>
  );
}
