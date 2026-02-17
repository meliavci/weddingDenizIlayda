'use client';

import UploadArea from '../components/UploadArea';
import Gallery from '../components/Gallery';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">


      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[kenburns_20s_infinite_alternate]"
          style={{ backgroundImage: `url('/Rings.jpg')` }}
        ></div>

        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]"></div>

        <div className="relative z-10 text-center text-white px-4 animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-6 drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-2xl font-light max-w-xl mx-auto leading-relaxed drop-shadow-md opacity-90">
            {t.hero.welcome}
          </p>
        </div>

      </div>

      <div className="bg-[#FAFAFA] relative z-20 pt-24 pb-32 rounded-t-[3rem] -mt-16 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">

        <div className="px-4">
          <UploadArea />
        </div>

        <div className="mt-32 mb-12 text-center px-4">
          <h2 className="text-4xl font-serif text-stone-900 mb-4">
            {t.gallery.title}
          </h2>
          <p className="text-stone-500 font-serif italic max-w-md mx-auto">
            Eine Sammlung unserer schönsten gemeinsamen Augenblicke.
          </p>
        </div>

        <Gallery />

      </div>

    </main>
  );
}