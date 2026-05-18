import { createReader } from '@keystatic/core/reader';

export const dynamic = 'force-dynamic';
import keystaticConfig from '../../../../keystatic.config';
import SolutionsPageClient from './_SolutionsPageClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const data = await reader.singletons.solutions.read();
  return <SolutionsPageClient data={data ?? null} />;
}
