'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, Check } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function UploadArea() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setSuccess(false);

    try {
      for (const file of acceptedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('wedding-photos')
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase
          .from('photos')
          .insert([{ url: fileName }]);
        if (dbError) throw dbError;
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error('Fehler beim Upload:', error);
      alert(t.upload.errorAlert);
    } finally {
      setUploading(false);
    }
  }, [t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }
  });

  return (
    <div
      {...getRootProps()}
      className={`
        w-full max-w-2xl mx-auto p-16 rounded-[2rem] text-center cursor-pointer transition-all duration-500 ease-out
        border border-dashed group
        ${isDragActive
        ? 'border-stone-400 bg-stone-100/50 scale-[1.02]'
        : 'border-stone-200 hover:border-stone-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-xl'
      }
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-6">
        {uploading ? (
          <Loader2 className="w-12 h-12 text-stone-600 animate-spin" />
        ) : success ? (
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 scale-110" />
          </div>
        ) : (
          <div className="p-5 bg-stone-50 rounded-full group-hover:scale-110 transition-transform duration-500">
            <Upload className="w-8 h-8 text-stone-500 group-hover:text-stone-700 transition-colors" />
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xl font-serif text-stone-800 transition-colors">
            {success ? t.upload.success : uploading ? t.upload.uploading : t.upload.idleTitle}
          </p>
          {!success && !uploading && (
            <p className="text-stone-500 font-light">
              {t.upload.idleSubtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}