import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import GroupePageClient from './_GroupePageClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const data = await reader.singletons.groupe.read();
  return <GroupePageClient data={data ?? null} />;
}
