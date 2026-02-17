'use client';

import { useLanguage } from '../../context/LanguageContext';
import { CalendarHeart, MapPin, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StoryPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-12 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* --- TEIL 1: DIE GESCHICHTE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 border border-stone-300 rounded-2xl hidden md:block translate-x-4 translate-y-4"></div>
            <img
              src="/Couple.jpg"
              alt="Ilayda & Deniz"
              className="relative w-full h-[500px] md:h-[650px] object-cover rounded-2xl shadow-xl bg-stone-200"
            />
          </div>

          <div className="order-1 md:order-2 flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-4">
                {t.story.title}
              </h1>
              <p className="text-xl font-serif italic text-stone-500">
                {t.story.subtitle}
              </p>
            </div>

            <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
              <p>{t.story.text1}</p>
              <p>{t.story.text2}</p>
            </div>

            <div className="pt-8 border-t border-stone-200 space-y-4">
              <div className="flex items-center gap-4 text-stone-800">
                <div className="p-3 bg-white rounded-full shadow-sm border border-stone-100">
                  <CalendarHeart className="w-6 h-6 text-stone-600" />
                </div>
                <span className="text-lg font-medium">{t.story.date}</span>
              </div>

              <div className="flex items-center gap-4 text-stone-800">
                <div className="p-3 bg-white rounded-full shadow-sm border border-stone-100">
                  <MapPin className="w-6 h-6 text-stone-600" />
                </div>
                <span className="text-lg font-medium">{t.story.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- TEIL 2: MINIMALISTISCHES ZITAT --- */}
        <div className="mt-32 mb-20 px-4">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-stone-800 text-center leading-relaxed max-w-4xl mx-auto text-stone-400">
            {t.story.quote}
          </p>
        </div>

        {/* --- TEIL 3: DER FOTO-AUFRUF (Call to Action) --- */}
        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-14 text-center shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-shadow duration-500">

          {/* Dezenter Hintergrund-Effekt */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-stone-50 rounded-full opacity-50 transition-transform duration-700 group-hover:scale-150"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-800 group-hover:text-white transition-colors duration-500 text-stone-600">
              <Camera className="w-10 h-10" />
            </div>

            <h3 className="text-3xl font-serif text-stone-900 mb-6">
              {t.story.ctaTitle}
            </h3>

            <p className="text-stone-500 leading-relaxed text-lg mb-10 max-w-xl mx-auto">
              {t.story.ctaText}
            </p>

            <Link href="/" className="inline-flex items-center gap-3 bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 hover:scale-105 transition-all duration-300 shadow-md">
              {t.story.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}