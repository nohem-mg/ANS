// keystatic.config.ts
import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  singletons: {
    // ── 1. Hero ─────────────────────────────────────────────────────────────
    hero: singleton({
      label: '🏠 Hero — Page d\'accueil',
      path: 'src/content/hero',
      schema: {
        rating_text: fields.text({ label: 'Badge étoiles — Texte', defaultValue: '4.9 / 5 · 200+ partenaires' }),
        headline_line1: fields.text({ label: 'Titre — Ligne 1', defaultValue: 'Faites de la pause' }),
        headline_line2: fields.text({ label: 'Titre — Ligne 2', defaultValue: 'un moment qui compte' }),
        subtitle: fields.text({
          label: 'Sous-titre',
          multiline: true,
          defaultValue: 'Depuis plus de 40 ans, nous transformons la pause café en un véritable levier de Qualité de Vie au Travail. Service ultra-personnalisé, réactivité immédiate et engagement familial.',
        }),
        cta_primary_label: fields.text({ label: 'Bouton principal — Texte', defaultValue: 'Découvrir notre approche' }),
        cta_secondary_label: fields.text({ label: 'Bouton secondaire — Texte', defaultValue: 'Demander un devis' }),
        cta_secondary_href: fields.text({ label: 'Bouton secondaire — Lien', defaultValue: '/contact' }),
      },
    }),

    // ── 2. Vision cards ──────────────────────────────────────────────────────
    vision: singleton({
      label: '💡 Vision — 4 cartes',
      path: 'src/content/vision',
      schema: {
        section_label: fields.text({ label: 'Label section', defaultValue: 'Notre Vision' }),
        title: fields.text({ label: 'Titre', defaultValue: 'Votre machine à café, C\'est le cœur battant de vos bureaux.' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Fini le café avalé dans un couloir. La pause est un moment stratégique celui où l\'énergie se recharge et où la culture d\'entreprise se construit. Chez ANS, on aménage cet espace pour qu\'il soit à la hauteur.',
        }),
        cards: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre de la carte' }),
            desc: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Cartes', itemLabel: (props) => props.fields.title.value || 'Carte' }
        ),
      },
    }),

    // ── 3. Services ──────────────────────────────────────────────────────────
    services: singleton({
      label: '☕ Services — Savoir-Faire',
      path: 'src/content/services',
      schema: {
        section_label: fields.text({ label: 'Label section', defaultValue: 'Notre Savoir-Faire' }),
        title: fields.text({ label: 'Titre', defaultValue: 'L\'Excellence de la Pause Café.' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Des équipements de pointe pilotés par une équipe humaine dédiée. La technologie au service de l\'humain.',
        }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Titre du service' }),
            desc: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Services', itemLabel: (props) => props.fields.title.value || 'Service' }
        ),
      },
    }),

    // ── 4. RSE ───────────────────────────────────────────────────────────────
    rse: singleton({
      label: '🌱 RSE — Engagement durable',
      path: 'src/content/rse',
      schema: {
        section_label: fields.text({ label: 'Label section', defaultValue: 'Notre Engagement' }),
        title: fields.text({ label: 'Titre', defaultValue: 'Une démarche durable et responsable' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Nous n\'avons pas attendu que ce soit dans l\'air du temps. Dès le départ, nous nous sommes posé une question simple : serions-nous fiers de montrer comment nous travaillons à nos enfants ? C\'est cette exigence qui oriente nos choix, des cafés que nous sélectionnons jusqu\'aux tournées que nous planifions. Pas une posture, une conviction !',
        }),
        bullets: fields.array(
          fields.text({ label: 'Point RSE' }),
          { label: 'Points clés RSE', itemLabel: (props) => props.value || 'Point' }
        ),
      },
    }),

    // ── 5. Timeline / Histoire ───────────────────────────────────────────────
    histoire: singleton({
      label: '📅 Histoire — Jalons',
      path: 'src/content/histoire',
      schema: {
        section_label: fields.text({ label: 'Label section', defaultValue: 'Notre Histoire' }),
        title: fields.text({ label: 'Titre', defaultValue: '+ de 40 Ans d\'Excellence' }),
        subtitle: fields.text({ label: 'Sous-titre', defaultValue: 'De l\'entreprise familiale au partenaire QVT de référence.' }),
        milestones: fields.array(
          fields.object({
            year: fields.text({ label: 'Année' }),
            title: fields.text({ label: 'Titre' }),
            desc: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Jalons', itemLabel: (props) => props.fields.year.value || 'Jalon' }
        ),
      },
    }),

    // ── 6. Témoignages ───────────────────────────────────────────────────────
    temoignages: singleton({
      label: '⭐ Témoignages',
      path: 'src/content/temoignages',
      schema: {
        section_label: fields.text({ label: 'Label section', defaultValue: 'La parole à nos clients' }),
        title: fields.text({ label: 'Titre', defaultValue: 'Une expérience appréciée' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Ce que nos clients disent de nous. Des entreprises de toutes tailles, unies par la même exigence de qualité et de service.',
        }),
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Nom du client' }),
            review: fields.text({ label: 'Avis', multiline: true }),
          }),
          { label: 'Témoignages', itemLabel: (props) => props.fields.name.value || 'Témoignage' }
        ),
      },
    }),

    // ── 7. FAQ ───────────────────────────────────────────────────────────────
    faq: singleton({
      label: '❓ FAQ',
      path: 'src/content/faq',
      schema: {
        title: fields.text({ label: 'Titre', defaultValue: 'Questions fréquentes' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Les principales réponses sur nos solutions, notre accompagnement et notre manière de travailler.',
        }),
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Question', multiline: true }),
            answer: fields.text({ label: 'Réponse', multiline: true }),
          }),
          { label: 'Questions', itemLabel: (props) => props.fields.question.value || 'Question' }
        ),
      },
    }),

    // ── 8. CTA Band ──────────────────────────────────────────────────────────
    cta_band: singleton({
      label: '📣 Bandeau CTA',
      path: 'src/content/cta-band',
      schema: {
        title: fields.text({ label: 'Titre', defaultValue: 'Un projet d\'espace-pause ?' }),
        subtitle: fields.text({ label: 'Sous-titre', defaultValue: 'Audit gratuit, proposition sur-mesure et installation rapide.' }),
        cta_label: fields.text({ label: 'Bouton devis — Texte', defaultValue: 'Demander un devis' }),
        phone: fields.text({ label: 'Numéro de téléphone', defaultValue: '03 27 37 16 84' }),
        phone_href: fields.text({ label: 'Lien téléphone', defaultValue: 'tel:0327371684' }),
      },
    }),

    // ── 9. Footer CTA ────────────────────────────────────────────────────────
    footer_cta: singleton({
      label: '🔚 Footer — Appel à l\'action',
      path: 'src/content/footer-cta',
      schema: {
        title: fields.text({ label: 'Titre', defaultValue: 'Prêt pour l\'infusion ?' }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Discutons de votre projet d\'espace détente. Nos experts sont prêts à concevoir la solution idéale pour vos collaborateurs.',
        }),
        tagline: fields.text({ label: 'Tagline bas de page', defaultValue: 'Audit gratuit · Réponse sous 24h · Hauts-de-France' }),
        cta_label: fields.text({ label: 'Bouton — Texte', defaultValue: 'Nous contacter' }),
        phone: fields.text({ label: 'Téléphone', defaultValue: '03 27 37 16 84' }),
        phone_href: fields.text({ label: 'Lien téléphone', defaultValue: 'tel:0327371684' }),
      },
    }),
  },
});
