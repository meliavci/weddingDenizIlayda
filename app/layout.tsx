import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Ilayda & Deniz | Unsere Hochzeit',
  description: 'Das digitale Gästebuch und alle Infos zur Hochzeit von Ilayda & Deniz.',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAFAFA] font-sans text-stone-800 antialiased selection:bg-stone-200">
        <LanguageProvider>
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}