'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const langNames = { de: 'Deutsch', tr: 'Türkçe', bg: 'Български' };

  return (
    <nav className="w-full bg-[#FAFAFA]/90 backdrop-blur-md fixed top-0 z-50 border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          <Link href="/" className="font-serif text-2xl tracking-wider text-stone-800 hover:text-stone-600 transition">
            Ilayda & Deniz
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-stone-600 hover:text-stone-900 transition">{t.nav.home}</Link>
            <Link href="/story" className="text-stone-600 hover:text-stone-900 transition">{t.nav.story}</Link>

            <div
              className="relative"
              onMouseEnter={() => setLangDropdownOpen(true)}
              onMouseLeave={() => setLangDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors py-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{langNames[lang]}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-stone-100 rounded-xl shadow-lg overflow-hidden flex flex-col z-50 animate-[fadeIn_0.2s_ease-out]">
                  {(Object.keys(langNames) as Array<keyof typeof langNames>).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setLang(key); setLangDropdownOpen(false); }}
                      className={`text-left px-4 py-3 text-sm transition-colors ${
                        lang === key
                          ? 'bg-stone-50 font-medium text-stone-900 border-l-2 border-stone-800'
                          : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900 border-l-2 border-transparent'
                      }`}
                    >
                      {langNames[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-stone-600 hover:text-stone-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 shadow-xl absolute w-full">
          <div className="flex flex-col space-y-4 text-center">
            <Link href="/" onClick={toggleMenu} className="block text-stone-600 text-lg py-2">{t.nav.home}</Link>
            <Link href="/story" onClick={toggleMenu} className="block text-stone-600 text-lg py-2">{t.nav.story}</Link>

            <div className="pt-6 mt-2 border-t border-stone-100 flex justify-center gap-6">
              <button onClick={() => { setLang('de'); toggleMenu(); }} className={`text-lg ${lang === 'de' ? 'font-bold text-stone-900' : 'text-stone-400'}`}>DE</button>
              <button onClick={() => { setLang('tr'); toggleMenu(); }} className={`text-lg ${lang === 'tr' ? 'font-bold text-stone-900' : 'text-stone-400'}`}>TR</button>
              <button onClick={() => { setLang('bg'); toggleMenu(); }} className={`text-lg ${lang === 'bg' ? 'font-bold text-stone-900' : 'text-stone-400'}`}>BG</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}