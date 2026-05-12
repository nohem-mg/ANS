import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.anspauseevasion.fr/sitemap.xml',
  };
}
