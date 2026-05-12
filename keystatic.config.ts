// keystatic.config.ts
import { config, fields, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: {
            owner: 'nohem-mg',
            name: 'ANS'
        }
    },


    ui: {
        brand: {
            name: 'ANS – Contenu du site',
        },
    },

    singletons: {
        // ─────────────────────────────────────────────────────────────────────
        // NAVIGATION (Header)
        // ─────────────────────────────────────────────────────────────────────
        navigation: singleton({
            label: 'Navigation',
            path: 'src/content/navigation/',
            schema: {
                nav_links: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Libellé affiché' }),
                        href: fields.text({ label: 'Lien (ex: /solutions)' }),
                    }),
                    {
                        label: 'Liens de navigation',
                        itemLabel: (props) => props.fields.label.value || 'Lien',
                    }
                ),
                cta_label: fields.text({
                    label: 'Bouton CTA (ex: Contact)',
                    defaultValue: 'Contact',
                }),
                cta_href: fields.text({
                    label: 'Lien du CTA',
                    defaultValue: '/contact',
                }),
            },
        }),

        // ─────────────────────────────────────────────────────────────────────
        // FOOTER
        // ─────────────────────────────────────────────────────────────────────
        footer: singleton({
            label: 'Footer',
            path: 'src/content/footer/',
            schema: {
                brand: fields.object(
                    {
                        name: fields.text({
                            label: 'Nom de la marque',
                            defaultValue: 'A.N.S.',
                        }),
                        tagline: fields.text({
                            label: 'Accroche',
                            multiline: true,
                            defaultValue:
                                "Depuis 1981, nous réinventons la pause café en entreprise.",
                        }),
                    },
                    { label: 'Marque' }
                ),

                contact: fields.object(
                    {
                        address_line1: fields.text({
                            label: 'Adresse ligne 1',
                            defaultValue: '780 rue Blaise Pascal',
                        }),
                        address_line2: fields.text({
                            label: 'Adresse ligne 2',
                            defaultValue: '59267 Proville France',
                        }),
                        phone: fields.text({
                            label: 'Téléphone',
                            defaultValue: '03 27 37 16 84',
                        }),
                        phone_href: fields.text({
                            label: 'Lien téléphone (format: tel:+33...)',
                            defaultValue: 'tel:+33327371684',
                        }),
                    },
                    { label: 'Coordonnées' }
                ),

                nav_links: fields.array(
                    fields.object({
                        label: fields.text({ label: 'Libellé' }),
                        href: fields.text({ label: 'Lien' }),
                    }),
                    {
                        label: 'Liens de navigation footer',
                        itemLabel: (props) => props.fields.label.value || 'Lien',
                    }
                ),

                social: fields.object(
                    {
                        linkedin_href: fields.text({
                            label: 'URL LinkedIn',
                            defaultValue: '#',
                        }),
                        instagram_href: fields.text({
                            label: 'URL Instagram',
                            defaultValue: '#',
                        }),
                        email_href: fields.text({
                            label: 'Lien email (format: mailto:...)',
                            defaultValue: 'mailto:contact@ans-da.fr',
                        }),
                    },
                    { label: 'Réseaux sociaux' }
                ),

                legal: fields.object(
                    {
                        copyright_name: fields.text({
                            label: 'Nom pour le copyright',
                            defaultValue: 'A.N.S.',
                        }),
                        mentions_label: fields.text({
                            label: 'Libellé mentions légales',
                            defaultValue: 'Mentions Légales',
                        }),
                        mentions_href: fields.text({
                            label: 'Lien mentions légales',
                            defaultValue: '/mentions-legales',
                        }),
                        confidentialite_label: fields.text({
                            label: 'Libellé confidentialité',
                            defaultValue: 'Confidentialité',
                        }),
                        confidentialite_href: fields.text({
                            label: 'Lien confidentialité',
                            defaultValue: '/confidentialite',
                        }),
                    },
                    { label: 'Mentions légales footer' }
                ),
            },
        }),

        // ─────────────────────────────────────────────────────────────────────
        // PAGE D'ACCUEIL
        // ─────────────────────────────────────────────────────────────────────
        homepage: singleton({
            label: "Page d'accueil",
            path: 'src/content/homepage/',
            schema: {
                hero: fields.object(
                    {
                        headline_part1: fields.text({
                            label: 'Titre — partie 1',
                            defaultValue: 'Faites de la',
                        }),
                        headline_highlight: fields.text({
                            label: 'Titre — mot mis en couleur',
                            defaultValue: 'pause',
                        }),
                        headline_part2: fields.text({
                            label: 'Titre — partie 2',
                            defaultValue: 'un moment qui compte',
                        }),
                        subtitle: fields.text({
                            label: 'Sous-titre',
                            multiline: true,
                            defaultValue:
                                "Depuis plus de 40 ans, nous transformons la pause café en un véritable levier de Qualité de Vie au Travail. Service ultra-personnalisé, réactivité immédiate et engagement familial.",
                        }),
                        badge_rating: fields.text({
                            label: 'Badge — note',
                            defaultValue: '4.9 / 5',
                        }),
                        badge_clients: fields.text({
                            label: 'Badge — nb partenaires',
                            defaultValue: '200+ partenaires',
                        }),
                        cta_primary: fields.text({
                            label: 'CTA principal',
                            defaultValue: "Découvrir notre approche",
                        }),
                        cta_secondary: fields.text({
                            label: 'CTA secondaire',
                            defaultValue: 'Demander un devis',
                        }),
                    },
                    { label: 'Section Hero' }
                ),

                vision: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Notre Vision' }),
                        title_line1: fields.text({
                            label: 'Titre ligne 1',
                            defaultValue: "Votre machine à café,",
                        }),
                        title_line2: fields.text({
                            label: 'Titre ligne 2 (accentuée)',
                            defaultValue: "C'est le cœur battant de vos bureaux.",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Fini le café avalé dans un couloir. La pause est un moment stratégique celui où l'énergie se recharge et où la culture d'entreprise se construit. Chez ANS, on aménage cet espace pour qu'il soit à la hauteur.",
                        }),
                        cards: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Titre de la carte' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                            }),
                            {
                                label: 'Cartes vision (4)',
                                itemLabel: (props) => props.fields.title.value || 'Carte',
                            }
                        ),
                    },
                    { label: 'Section Vision' }
                ),

                services: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Notre Savoir-Faire' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "L'Excellence de la Pause Café.",
                        }),
                        description: fields.text({
                            label: 'Description droite',
                            multiline: true,
                            defaultValue:
                                "Des équipements de pointe pilotés par une équipe humaine dédiée. La technologie au service de l'humain.",
                        }),
                        rows: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Titre du service' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                            }),
                            {
                                label: 'Lignes de service (3)',
                                itemLabel: (props) => props.fields.title.value || 'Service',
                            }
                        ),
                    },
                    { label: 'Section Services' }
                ),

                cta_band: fields.object(
                    {
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "Un projet d'espace-pause ?",
                        }),
                        description: fields.text({
                            label: 'Description',
                            defaultValue:
                                'Audit gratuit, proposition sur-mesure et installation rapide.',
                        }),
                        cta_primary: fields.text({
                            label: 'CTA principal',
                            defaultValue: 'Demander un devis',
                        }),
                        phone: fields.text({
                            label: 'Numéro de téléphone affiché',
                            defaultValue: '03 27 37 16 84',
                        }),
                    },
                    { label: 'Bandeau CTA' }
                ),

                testimonials: fields.object(
                    {
                        tag: fields.text({
                            label: 'Tag',
                            defaultValue: 'La parole à nos clients',
                        }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Une expérience appréciée',
                        }),
                        subtitle: fields.text({
                            label: 'Sous-titre',
                            multiline: true,
                            defaultValue:
                                "Ce que nos clients disent de nous. Des entreprises de toutes tailles, unies par la même exigence de qualité et de service.",
                        }),
                        items: fields.array(
                            fields.object({
                                name: fields.text({ label: 'Prénom + initiale (ex: Thomas D.)' }),
                                review: fields.text({ label: 'Avis', multiline: true }),
                            }),
                            {
                                label: 'Avis clients (3)',
                                itemLabel: (props) => props.fields.name.value || 'Avis',
                            }
                        ),
                    },
                    { label: 'Section Avis Clients' }
                ),

                timeline: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Notre Histoire' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "+ de 40 Ans d'Excellence",
                        }),
                        subtitle: fields.text({
                            label: 'Sous-titre',
                            defaultValue:
                                "De l'entreprise familiale au partenaire QVT de référence.",
                        }),
                        milestones: fields.array(
                            fields.object({
                                year: fields.text({ label: 'Année' }),
                                title: fields.text({ label: 'Titre' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                            }),
                            {
                                label: 'Jalons (3)',
                                itemLabel: (props) => props.fields.year.value || 'Jalon',
                            }
                        ),
                    },
                    { label: 'Section Timeline / ADN' }
                ),

                rse: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Notre Engagement' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Une démarche durable et responsable',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Nous n'avons pas attendu que ce soit dans l'air du temps. Dès le départ, nous nous sommes posé une question simple : serions-nous fiers de montrer comment nous travaillons à nos enfants ?",
                        }),
                        bullets: fields.array(
                            fields.object({
                                text: fields.text({ label: 'Point RSE' }),
                            }),
                            {
                                label: 'Points RSE (4)',
                                itemLabel: (props) => props.fields.text.value || 'Point',
                            }
                        ),
                    },
                    { label: 'Section RSE' }
                ),

                faq: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'FAQ' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Questions fréquentes',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Les principales réponses sur nos solutions, notre accompagnement et notre manière de travailler.",
                        }),
                        items: fields.array(
                            fields.object({
                                question: fields.text({ label: 'Question' }),
                                answer: fields.text({ label: 'Réponse', multiline: true }),
                            }),
                            {
                                label: 'Questions / Réponses',
                                itemLabel: (props) => props.fields.question.value || 'Question',
                            }
                        ),
                    },
                    { label: 'Section FAQ' }
                ),

                final_cta: fields.object(
                    {
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "Prêt pour l'infusion ?",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Discutons de votre projet d'espace détente. Nos experts sont prêts à concevoir la solution idéale pour vos collaborateurs.",
                        }),
                        cta_primary: fields.text({
                            label: 'CTA principal',
                            defaultValue: 'Nous contacter',
                        }),
                        badge_text: fields.text({
                            label: 'Badge bas de page',
                            defaultValue:
                                'Audit gratuit · Réponse sous 24h · Hauts-de-France',
                        }),
                    },
                    { label: 'CTA Final' }
                ),
            },
        }),

        // ─────────────────────────────────────────────────────────────────────
        // PAGE SOLUTIONS
        // ─────────────────────────────────────────────────────────────────────
        solutions: singleton({
            label: 'Page Solutions',
            path: 'src/content/solutions/',
            schema: {
                hero: fields.object(
                    {
                        label_tag: fields.text({
                            label: 'Tag',
                            defaultValue: 'Solutions Techniques',
                        }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "La Technologie au Service de la Pause Parfaite.",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Des distributeurs de dernière génération aux coffee corners sur-mesure, nous déployons un parc technique adapté à votre entreprise et à vos collaborateurs.",
                        }),
                    },
                    { label: 'Section Hero' }
                ),

                gallery: fields.object(
                    {
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "Trois gammes, une même exigence de service",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Retrouvez nos principales familles de machines pour l'entreprise. Chaque carte ouvre sur une page détaillée avec usages, points forts et type d'implantation.",
                        }),
                    },
                    { label: 'Galerie des gammes' }
                ),

                solutions_cards: fields.array(
                    fields.object({
                        slug: fields.text({
                            label: 'Slug (ne pas modifier)',
                            defaultValue: '',
                        }),
                        category: fields.text({ label: 'Catégorie' }),
                        title: fields.text({ label: 'Titre SEO' }),
                        summary: fields.text({
                            label: 'Résumé (meta description)',
                            multiline: true,
                        }),
                        description: fields.text({
                            label: 'Description longue',
                            multiline: true,
                        }),
                        highlights: fields.array(
                            fields.object({ text: fields.text({ label: 'Point fort' }) }),
                            {
                                label: 'Points forts',
                                itemLabel: (p) => p.fields.text.value || 'Point',
                            }
                        ),
                        ideal_for: fields.array(
                            fields.object({ text: fields.text({ label: 'Usage idéal' }) }),
                            {
                                label: 'Idéal pour',
                                itemLabel: (p) => p.fields.text.value || 'Usage',
                            }
                        ),
                        features: fields.array(
                            fields.object({ text: fields.text({ label: 'Feature' }) }),
                            {
                                label: 'Ce que nous mettons en place',
                                itemLabel: (p) => p.fields.text.value || 'Feature',
                            }
                        ),
                    }),
                    {
                        label: 'Fiches solutions (3)',
                        itemLabel: (props) => props.fields.title.value || 'Solution',
                    }
                ),

                process: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'NOTRE PROCESS' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Du cadrage au suivi.',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Cinq étapes courtes, lisibles et documentées pour garder votre projet simple à suivre et facile à piloter.",
                        }),
                        steps: fields.array(
                            fields.object({
                                id: fields.text({ label: 'Numéro (01, 02…)' }),
                                tag: fields.text({ label: 'Tag étape' }),
                                title: fields.text({ label: 'Titre' }),
                                subtitle: fields.text({ label: 'Sous-titre' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                                key_points: fields.array(
                                    fields.object({ text: fields.text({ label: 'Point clé' }) }),
                                    {
                                        label: 'Points clés',
                                        itemLabel: (p) => p.fields.text.value || 'Point',
                                    }
                                ),
                            }),
                            {
                                label: 'Étapes du process (5)',
                                itemLabel: (props) =>
                                    `${props.fields.id.value} – ${props.fields.title.value}` ||
                                    'Étape',
                            }
                        ),
                    },
                    { label: 'Section Process' }
                ),

                showcase: fields.object(
                    {
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Avant & Après',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Un espace pause ordinaire peut devenir un vrai lieu de vie. Faites glisser pour comparer l'avant et l'après d'une installation type.",
                        }),
                    },
                    { label: 'Section Showcase Avant/Après' }
                ),

                cta: fields.object(
                    {
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Prêt à équiper vos espaces ?',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Parlons de votre projet. Audit gratuit, proposition sur-mesure et installation rapide.",
                        }),
                    },
                    { label: 'CTA bas de page' }
                ),
            },
        }),

        // ─────────────────────────────────────────────────────────────────────
        // PAGE GROUPE
        // ─────────────────────────────────────────────────────────────────────
        groupe: singleton({
            label: 'Page Groupe Prodia+',
            path: 'src/content/groupe/',
            schema: {
                hero: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Le Réseau' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Le Groupe Prodia+',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Le premier réseau français d'indépendants en distribution automatique, au service de vos espaces de pause.",
                        }),
                    },
                    { label: 'Section Hero' }
                ),

                presentation: fields.object(
                    {
                        tag: fields.text({
                            label: 'Tag',
                            defaultValue: 'Qui sommes-nous',
                        }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: "Un Collectif d'Experts Indépendants",
                        }),
                        paragraph_1: fields.text({
                            label: 'Paragraphe 1',
                            multiline: true,
                            defaultValue:
                                "Prodia+ est un groupement de PME indépendantes spécialisées dans la distribution automatique et les solutions de pause en entreprise. Chaque membre est un entrepreneur local, ancré dans son territoire, qui partage les mêmes valeurs d'excellence et de proximité.",
                        }),
                        paragraph_2: fields.text({
                            label: 'Paragraphe 2',
                            multiline: true,
                            defaultValue:
                                "En rejoignant Prodia+ il y a plus de 20 ans, ANS a renforcé sa capacité à proposer les meilleurs équipements aux meilleures conditions, tout en conservant son indépendance et sa culture familiale. Le réseau mutualise les achats, la logistique et les innovations technologiques.",
                        }),
                        paragraph_3: fields.text({
                            label: 'Paragraphe 3',
                            multiline: true,
                            defaultValue:
                                "Résultat : nos clients bénéficient de la force d'un réseau national avec le service personnalisé d'une entreprise locale qui connaît le terrain.",
                        }),
                    },
                    { label: 'Section Présentation' }
                ),

                key_figures: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'En chiffres' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'La Force du Réseau',
                        }),
                        featured_value: fields.text({
                            label: 'Chiffre vedette (valeur affichée)',
                            defaultValue: '60 000',
                        }),
                        featured_label: fields.text({
                            label: 'Chiffre vedette — label',
                            defaultValue: 'Distributeurs automatiques',
                        }),
                        featured_headline: fields.text({
                            label: 'Chiffre vedette — accroche',
                            defaultValue: 'Le parc le plus dense du marché.',
                        }),
                        featured_description: fields.text({
                            label: 'Chiffre vedette — description',
                            multiline: true,
                            defaultValue:
                                'déployés et exploités en France et au Benelux par les membres du réseau.',
                        }),
                        small_figures: fields.array(
                            fields.object({
                                value: fields.text({ label: 'Valeur affichée (ex: 47)' }),
                                label: fields.text({ label: 'Label' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                            }),
                            {
                                label: 'Petits chiffres (4)',
                                itemLabel: (props) =>
                                    `${props.fields.value.value} ${props.fields.label.value}`,
                            }
                        ),
                    },
                    { label: 'Section Chiffres Clés' }
                ),

                advantages: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Avantages' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Pourquoi Prodia+ fait la différence',
                        }),
                        items: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Titre avantage' }),
                            }),
                            {
                                label: 'Avantages (6)',
                                itemLabel: (props) => props.fields.title.value || 'Avantage',
                            }
                        ),
                    },
                    { label: 'Section Avantages' }
                ),

                ans_network: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'ANS × Prodia+' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue:
                                "Membre du réseau depuis 2000, ANS incarne la promesse Prodia+.",
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Notre appartenance au groupement nous permet de proposer les meilleurs équipements du marché tout en conservant notre ADN familial. Vous travaillez avec ANS, vous bénéficiez de la puissance Prodia+.",
                        }),
                    },
                    { label: 'Section ANS × Prodia+' }
                ),
            },
        }),

        // ─────────────────────────────────────────────────────────────────────
        // PAGE À PROPOS
        // ─────────────────────────────────────────────────────────────────────
        about: singleton({
            label: 'Page À Propos',
            path: 'src/content/about/',
            schema: {
                hero: fields.object(
                    {
                        manifesto_line1: fields.text({
                            label: 'Phrase principale',
                            multiline: true,
                            defaultValue:
                                "Les distributeurs de boissons sont le premier point de contact entre une entreprise et ses collaborateurs.",
                        }),
                        manifesto_line2: fields.text({
                            label: "Phrase d'accroche (accentuée)",
                            multiline: true,
                            defaultValue:
                                "Chez ANS, nous faisons en sorte que ce moment soit toujours parfait.",
                        }),
                    },
                    { label: 'Section Hero / Manifesto' }
                ),

                story: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Histoire' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Notre Histoire',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Plus de 40 ans de passion à transformer l'univers du travail autour de moments chaleureux et de services irréprochables.",
                        }),
                        chapters: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Titre du chapitre' }),
                                description: fields.text({
                                    label: 'Description',
                                    multiline: true,
                                }),
                            }),
                            {
                                label: 'Chapitres (3)',
                                itemLabel: (props) => props.fields.title.value || 'Chapitre',
                            }
                        ),
                    },
                    { label: 'Section Notre Histoire' }
                ),

                team: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Équipe' }),
                        title: fields.text({ label: 'Titre', defaultValue: "L'Équipe" }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Techniciens, commerciaux, logisticiens, designers d'expérience. Tous passionnés.",
                        }),
                    },
                    { label: "Section L'Équipe" }
                ),

                careers: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Carrières' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Nous Rejoindre',
                        }),
                        description_line1: fields.text({
                            label: 'Accroche courte',
                            defaultValue: "Le café, c'est sérieux.",
                        }),
                        description_line2: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Rejoignez une équipe passionnée qui le prouve chaque jour sur le terrain.",
                        }),
                        cta_label: fields.text({
                            label: 'Libellé bouton',
                            defaultValue: 'Voir toutes nos offres',
                        }),
                        jobs: fields.array(
                            fields.object({
                                title: fields.text({ label: 'Intitulé du poste' }),
                                location: fields.text({ label: 'Localisation' }),
                            }),
                            {
                                label: 'Postes ouverts',
                                itemLabel: (props) => props.fields.title.value || 'Poste',
                            }
                        ),
                    },
                    { label: 'Section Carrières' }
                ),

                location: fields.object(
                    {
                        tag: fields.text({ label: 'Tag', defaultValue: 'Localisation' }),
                        title: fields.text({
                            label: 'Titre',
                            defaultValue: 'Retrouvez-nous à Proville',
                        }),
                        description: fields.text({
                            label: 'Description',
                            multiline: true,
                            defaultValue:
                                "Notre ancrage local fait partie de notre manière de travailler : proche du terrain, réactif et toujours accessible.",
                        }),
                    },
                    { label: 'Section Localisation' }
                ),
            },
        }),
    },
});