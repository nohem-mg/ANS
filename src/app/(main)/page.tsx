import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import HomePageClient from './_HomePageClient';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  const data = await reader.singletons.homepage.read();
  return <HomePageClient data={data ?? null} />;
}
