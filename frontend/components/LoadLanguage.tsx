'use client';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n/i18n';

export default function LoadLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const userLanguage = navigator.language.slice(0, 2);
    if (['pt', 'en', 'es'].includes(userLanguage)) {
      i18n.changeLanguage(userLanguage);
    } else {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return null;
}
