import { createReader } from '@keystatic/core/reader';

export const dynamic = 'force-dynamic';
import keystaticConfig from '../../../../keystatic.config';
import AboutPageClient from './_AboutPageClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const data = await reader.singletons.about.read();
  return <AboutPageClient data={data ?? null} />;
}
