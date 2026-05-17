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

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  );
}

export default function ConfidentialitePage() {
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
            Vie privée &amp; données
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
            Politique de Confidentialité
          </h1>
          <p style={{ fontFamily: 'var(--font-sora)', fontSize: 15, color: 'rgba(255,246,239,0.6)', lineHeight: 1.75 }}>
            Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
            et à la loi Informatique et Libertés modifiée.
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

        <Section title="1. Responsable du traitement">
          <p style={{ marginBottom: 12 }}>
            Le responsable du traitement des données à caractère personnel collectées via ce site est :
          </p>
          <p style={{ marginBottom: 4 }}><strong>Automatique Nord Service — A.N.S.</strong></p>
          <p style={{ marginBottom: 4 }}>SARL au capital de 7 622,45 € — RCS Douai 321 797 292</p>
          <p style={{ marginBottom: 4 }}>ZAC du Faubourg de Paris, 780 rue Blaise Pascal, 59267 Proville, France</p>
          <p style={{ marginBottom: 4 }}>
            <a href="tel:+33327371684" style={{ color: C.dark, textDecoration: 'none' }}>03 27 37 16 84</a>
            {' · '}
            <a href="mailto:ans@prodiaplus.fr" style={{ color: C.dark, textDecoration: 'none' }}>ans@prodiaplus.fr</a>
          </p>
        </Section>

        <Section title="2. Données collectées et finalités">
          <p style={{ marginBottom: 16 }}>
            ANS ne collecte que les données strictement nécessaires aux finalités décrites ci-dessous
            (principe de minimisation — article 5 RGPD).
          </p>

          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-sora)' }}>
              <thead>
                <tr style={{ backgroundColor: C.dark, color: '#FFF6EF' }}>
                  {['Données', 'Finalité', 'Base légale', 'Durée de conservation'].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nom, prénom, email, téléphone, société, message', 'Traitement de votre demande de contact', 'Intérêt légitime (art. 6.1.f)', '3 ans à compter du dernier contact'],
                  ['Données de navigation (logs serveur)', 'Sécurité et bon fonctionnement technique du site', 'Intérêt légitime (art. 6.1.f)', '12 mois'],
                  ['Sessionid (sessionStorage)', "Mémorisation de l'affichage du loader d'intro", 'Intérêt légitime (art. 6.1.f)', 'Durée de la session navigateur'],
                ].map(([data, purpose, basis, duration], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'rgba(43,18,0,0.03)' : 'transparent' }}>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{data}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{purpose}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{basis}</td>
                    <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' }}>{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: C.muted, fontSize: 14 }}>
            Aucune donnée n'est collectée à des fins publicitaires ou de profilage.
          </p>
        </Section>

        <Section title="3. Formulaire de contact">
          <p style={{ marginBottom: 12 }}>
            Lorsque vous remplissez le formulaire de contact, les données saisies (nom, prénom, email professionnel,
            téléphone, société, message) sont transmises à ANS dans le seul but de traiter votre demande et d'y apporter
            une réponse.
          </p>
          <p style={{ marginBottom: 12 }}>
            Ces informations ne sont ni revendues, ni cédées à des tiers, ni utilisées à des fins commerciales sans
            votre consentement exprès.
          </p>
          <p>
            Les champs marqués comme obligatoires sont nécessaires au traitement de votre demande. L'absence de réponse
            à ces champs empêchera ANS de vous recontacter.
          </p>
        </Section>

        <Section title="4. Cookies et traceurs">
          <p style={{ marginBottom: 12 }}>
            Ce site utilise un stockage de session minimal (<code style={{ fontSize: 13, background: 'rgba(43,18,0,0.06)', padding: '1px 6px', borderRadius: 3, fontFamily: 'var(--font-ibm-plex-mono)' }}>sessionStorage</code>)
            pour mémoriser si l'animation d'introduction a déjà été affichée lors de votre visite. Cette donnée est
            supprimée automatiquement à la fermeture de l'onglet et ne quitte pas votre navigateur.
          </p>
          <p style={{ marginBottom: 12 }}>
            <strong>Aucun cookie de traçage, de publicité ou d'analyse d'audience n'est déposé sur votre navigateur.</strong>
          </p>
          <p style={{ marginBottom: 12 }}>
            Ce site intègre des cartes Google Maps sous forme d'iframes sur les pages «{' '}
            <Link href="/contact" style={{ color: C.dark }}>Contact</Link> » et «{' '}
            <Link href="/about" style={{ color: C.dark }}>À Propos</Link> ». Lors du chargement de ces iframes,
            Google peut déposer des cookies sur votre navigateur. ANS n'a pas de contrôle sur ces cookies tiers.
            Pour en savoir plus, consultez la{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>
              politique de confidentialité de Google
            </a>.
          </p>
          <p>
            Vous pouvez à tout moment paramétrer votre navigateur pour refuser les cookies. Les paramètres de gestion
            des cookies se trouvent dans les préférences de votre navigateur.
          </p>
        </Section>

        <Section title="5. Destinataires des données">
          <p style={{ marginBottom: 12 }}>Les données collectées sont destinées exclusivement :</p>
          <List items={[
            "Au personnel habilité d'ANS en charge du traitement des demandes clients",
            "À notre prestataire d'hébergement Vercel Inc. (États-Unis), dans le cadre de l'exécution du service — les transferts sont encadrés par des Clauses Contractuelles Types approuvées par la Commission européenne",
          ]} />
          <p style={{ marginTop: 12 }}>
            Aucune donnée n'est transmise à des tiers à des fins commerciales, ni vendue, ni louée.
          </p>
        </Section>

        <Section title="6. Transferts hors Union européenne">
          <p style={{ marginBottom: 12 }}>
            L'hébergement du site est assuré par Vercel Inc., dont les serveurs sont susceptibles d'être situés aux
            États-Unis. Ce transfert est encadré par les Clauses Contractuelles Types (CCT) de la Commission européenne,
            garantissant un niveau de protection adéquat conformément à l'article 46 du RGPD.
          </p>
          <p>
            Aucun autre transfert de données hors de l'Union européenne n'est effectué.
          </p>
        </Section>

        <Section title="7. Vos droits">
          <p style={{ marginBottom: 12 }}>
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos
            données personnelles :
          </p>
          <List items={[
            "Droit d'accès (art. 15 RGPD) — obtenir une copie des données vous concernant",
            'Droit de rectification (art. 16 RGPD) — corriger des données inexactes ou incomplètes',
            "Droit à l'effacement (art. 17 RGPD) — demander la suppression de vos données",
            'Droit à la limitation du traitement (art. 18 RGPD) — suspendre l\'utilisation de vos données',
            'Droit à la portabilité (art. 20 RGPD) — recevoir vos données dans un format structuré',
            "Droit d'opposition (art. 21 RGPD) — vous opposer à un traitement fondé sur l'intérêt légitime",
            "Droit de ne pas faire l'objet d'une décision automatisée (art. 22 RGPD)",
          ]} />
          <p style={{ marginTop: 16, marginBottom: 12 }}>
            Pour exercer l'un de ces droits, adressez votre demande par email à{' '}
            <a href="mailto:ans@prodiaplus.fr" style={{ color: C.dark }}>ans@prodiaplus.fr</a>{' '}
            ou par courrier à l'adresse du siège social.
          </p>
          <p style={{ marginBottom: 12 }}>
            Votre demande doit être accompagnée d'un justificatif d'identité. ANS s'engage à vous répondre dans
            un délai d'un mois (délai pouvant être porté à trois mois en cas de demande complexe).
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous avez la faculté d'introduire une réclamation
            auprès de la{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>
              CNIL
            </a>{' '}
            (Commission Nationale de l'Informatique et des Libertés) — 3 place de Fontenoy, 75007 Paris.
          </p>
        </Section>

        <Section title="8. Sécurité des données">
          <p style={{ marginBottom: 12 }}>
            ANS met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données
            personnelles contre tout accès non autorisé, toute perte, destruction ou altération accidentelle,
            conformément à l'article 32 du RGPD.
          </p>
          <p>
            Le site est servi exclusivement en HTTPS (chiffrement TLS). Les données du formulaire de contact sont
            transmises de façon chiffrée.
          </p>
        </Section>

        <Section title="9. Mineurs">
          <p>
            Ce site ne collecte pas sciemment de données personnelles concernant des mineurs de moins de 16 ans.
            Si vous êtes parent ou tuteur légal et avez des raisons de croire qu'un mineur nous a fourni des données
            personnelles, contactez-nous à{' '}
            <a href="mailto:ans@prodiaplus.fr" style={{ color: C.dark }}>ans@prodiaplus.fr</a>.
          </p>
        </Section>

        <Section title="10. Modifications de cette politique">
          <p>
            ANS se réserve le droit de modifier la présente politique à tout moment, notamment pour se conformer
            à d'éventuelles évolutions légales ou réglementaires. La date de dernière mise à jour est indiquée en bas
            de cette page. Il vous appartient de la consulter régulièrement.
          </p>
        </Section>

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.muted,
                textDecoration: 'none',
              }}
            >
              ← Retour à l'accueil
            </Link>
            <Link
              href="/mentions-legales"
              style={{
                fontFamily: 'var(--font-ibm-plex-mono)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.muted,
                textDecoration: 'none',
              }}
            >
              Mentions légales →
            </Link>
          </div>
          <p style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 11, color: C.muted, marginTop: 16 }}>
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </div>
    </main>
  );
}
