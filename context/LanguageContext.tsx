'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'tr' | 'bg';

export const dictionaries = {
  de: {
    nav: { home: 'Startseite', story: 'Brautpaar', gallery: 'Galerie' },
    hero: {
      title: 'Ilayda & Deniz',
      welcome: 'Willkommen zu unserer Hochzeit. Wir freuen uns riesig, wenn ihr eure schönsten Schnappschüsse hier mit uns teilt.'
    },
    gallery: { title: 'Unsere Momente' },
    story: {
      title: 'Unsere Geschichte',
      subtitle: 'Unser Nasib (Schicksal) hat uns gefunden.',
      text1: 'Man sagt, dass unsere Partner für uns bestimmt sind, lange bevor wir uns überhaupt begegnen. Unsere Geschichte nahm im Arbeitsalltag ihren Anfang – doch unsere Herzen haben schnell erkannt, dass sie füreinander bestimmt sind.',
      text2: 'Mit dem Segen unserer Eltern und voller Vertrauen in unsere gemeinsame Zukunft geben wir uns nun das Ja-Wort. Wir laden euch herzlich ein, Zeugen dieses besonderen Tages zu werden und unsere Liebe gemeinsam mit uns zu feiern.',
      date: 'Wann: 15. Mai 2026',
      location: 'Wo: Lür-Kropp-Hof & Hochtiedshuus',
      // NEU: Zitat und Call-to-Action
      quote: '„Was für dich bestimmt ist, wird dich niemals verfehlen.“',
      ctaTitle: 'Jetzt seid ihr dran!',
      ctaText: 'Zückt eure Handys, fotografiert die schönsten Momente, die wildesten Tänze und die größten Emotionen des heutigen Tages und teilt sie direkt hier mit uns. Lasst uns gemeinsam Erinnerungen für die Ewigkeit schaffen.',
      ctaButton: 'Jetzt Fotos hochladen'
    },
    upload: {
      uploading: 'Bilder werden sicher hochgeladen...',
      success: 'Wundervoll! Erfolgreich hochgeladen.',
      idleTitle: 'Klicke hier oder ziehe Bilder hinein',
      idleSubtitle: 'Teile deine schönsten Momente mit uns',
      errorAlert: 'Hoppla, da ist etwas schiefgelaufen!'
    }
  },
  tr: {
    nav: { home: 'Ana Sayfa', story: 'Hakkımızda', gallery: 'Galeri' },
    hero: {
      title: 'İlayda & Deniz',
      welcome: 'Düğünümüze hoş geldiniz. En güzel anılarınızı burada bizimle paylaşmanızdan büyük mutluluk duyarız.'
    },
    gallery: { title: 'Anılarımız' },
    story: {
      title: 'Hikayemiz',
      subtitle: 'Nasibimiz bizi buldu.',
      text1: 'İnsanların daha hiç karşılaşmadan önce bile eşlerinin onlar için yazıldığı söylenir. Bizim hikayemiz sıradan bir iş gününde başladı – ancak kalplerimiz birbirleri için yaratıldıklarını çok çabuk anladı.',
      text2: 'Ailelerimizin hayır duası ve ortak geleceğimize olan tam inancımızla şimdi birbirimize "Evet" diyoruz. Sizleri bu özel güne şahitlik etmeye ve aşkımızı bizimle birlikte kutlamaya en içten dileklerimizle davet ediyoruz.',
      date: 'Ne Zaman: 15 Mayıs 2026',
      location: 'Nerede: Lür-Kropp-Hof & Hochtiedshuus',
      quote: '„Sana yazılmış olan, seni asla ıskalamaz.“',
      ctaTitle: 'Şimdi sıra sizde!',
      ctaText: 'Telefonlarınızı çıkarın, bugünün en güzel anlarını, en çılgın danslarını ve en büyük duygularını fotoğraflayın ve doğrudan burada bizimle paylaşın. Birlikte sonsuza dek sürecek anılar yaratalım.',
      ctaButton: 'Şimdi Fotoğraf Yükle'
    },
    upload: {
      uploading: 'Fotoğraflar güvenle yükleniyor...',
      success: 'Harika! Başarıyla yüklendi.',
      idleTitle: 'Buraya tıklayın veya fotoğrafları sürükleyin',
      idleSubtitle: 'En güzel anlarınızı bizimle paylaşın',
      errorAlert: 'Oops, bir şeyler ters gitti!'
    }
  },
  bg: {
    nav: { home: 'Начало', story: 'Младоженци', gallery: 'Галерия' },
    hero: {
      title: 'Илайда & Дениз',
      welcome: 'Добре дошли на нашата сватба. Ще се радваме да споделите най-хубавите си моменти с нас тук.'
    },
    gallery: { title: 'Нашите моменти' },
    story: {
      title: 'Нашата история',
      subtitle: 'Нашата съдба ни откри.',
      text1: 'Казват, че партньорите ни са отредени много преди изобщо да се срещнем. Нашата история започна в работното ежедневие – но сърцата ни бързо разбраха, че са създадени едно за друго.',
      text2: 'С благословията на нашите родители и с пълно доверие в общото ни бъдеще, сега си казваме "Да". Каним ви най-сърдечно да станете свидетели на този специален ден и да отпразнувате нашата любов заедно с нас.',
      date: 'Кога: 15 май 2026',
      location: 'Къде: Lür-Kropp-Hof & Hochtiedshuus',
      quote: '„Това, което ти е писано, никога няма да те подмине.“',
      ctaTitle: 'Сега сте вие на ход!',
      ctaText: 'Извадете телефоните си, снимайте най-хубавите моменти, най-щурите танци и най-големите емоции от днешния ден и ги споделете директно с нас тук. Нека заедно създадем спомени за цял живот.',
      ctaButton: 'Качете снимки сега'
    },
    upload: {
      uploading: 'Снимките се качват сигурно...',
      success: 'Чудесно! Успешно качено.',
      idleTitle: 'Кликнете тук или плъзнете снимки',
      idleSubtitle: 'Споделете най-хубавите си моменти с нас',
      errorAlert: 'Опа, нещо се обърка!'
    }
  }
};

type Dictionary = typeof dictionaries.de;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('de');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}