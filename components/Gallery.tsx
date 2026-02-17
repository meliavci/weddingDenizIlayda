'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Loader2, ZoomIn } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';

type Photo = {
  id: string;
  url: string;
  publicUrl: string;
};

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;

      const { data: storageData, error: storageError } = await supabase.storage
        .from('wedding-photos')
        .list('', { limit: 5000 });

      if (storageError) throw storageError;

      if (dbData && storageData) {
        const validPhotos = dbData.filter((dbPhoto) =>
          storageData.some((storageFile) => storageFile.name === dbPhoto.url)
        );

        const photosWithUrls = validPhotos.map((photo) => ({
          ...photo,
          publicUrl: supabase.storage
            .from('wedding-photos')
            .getPublicUrl(photo.url).data.publicUrl,
        }));

        setPhotos(photosWithUrls);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Galerie:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <p className="text-center text-stone-400 py-12 font-serif italic">
        Noch keine Momente geteilt. Sei der Erste!
      </p>
    );
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto mt-16 px-4"
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            variants={item}
            className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-500"
            onClick={() => setIndex(idx)}
          >
            <img
              src={photo.publicUrl}
              alt="Hochzeitsmoment"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.parentElement?.classList.add('hidden');
              }}
            />

            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 p-3 rounded-full backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                <ZoomIn className="w-6 h-6 text-stone-700" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map(p => ({ src: p.publicUrl, downloadUrl: `${p.publicUrl}?download=` }))}
        plugins={[Zoom, Download]}
        animation={{ fade: 300, swipe: 250 }}
        styles={{ container: { backgroundColor: "rgba(28, 25, 23, 0.95)" } }}
      />
    </>
  );
}