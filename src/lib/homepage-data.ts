// src/lib/homepage-data.ts
// Server-side only — reads all homepage section content from Keystatic
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export type HomepageData = Awaited<ReturnType<typeof getHomepageData>>;

export async function getHomepageData() {
  const [hero, vision, services, rse, histoire, temoignages, faq, cta_band, footer_cta] =
    await Promise.all([
      reader.singletons.hero.read(),
      reader.singletons.vision.read(),
      reader.singletons.services.read(),
      reader.singletons.rse.read(),
      reader.singletons.histoire.read(),
      reader.singletons.temoignages.read(),
      reader.singletons.faq.read(),
      reader.singletons.cta_band.read(),
      reader.singletons.footer_cta.read(),
    ]);

  return { hero, vision, services, rse, histoire, temoignages, faq, cta_band, footer_cta };
}
