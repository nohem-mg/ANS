import { createReader } from '@keystatic/core/reader';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
import keystaticConfig from '../../../keystatic.config';
import Header from "../components/Header";
import Footer from "../components/Footer";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navData, footerData] = await Promise.all([
    reader.singletons.navigation.read(),
    reader.singletons.footer.read(),
  ]);

  return (
    <>
      <Header navData={navData ?? null} />
      <main>{children}</main>
      <Footer footerData={footerData ?? null} />
    </>
  );
}
