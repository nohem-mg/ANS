// src/app/page.tsx
// Server component — fetches all homepage content from Keystatic then renders the client page
import { getHomepageData } from '@/lib/homepage-data';
import HomeClient from './HomeClient';

export default async function Home() {
  const data = await getHomepageData();
  return <HomeClient data={data} />;
}
