import { createReader } from '@keystatic/core/reader';

export const dynamic = 'force-static';
import keystaticConfig from '../../../../keystatic.config';
import ContactPageClient from './_ContactPageClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const data = await reader.singletons.contact.read();
  return <ContactPageClient data={data ?? null} />;
}
