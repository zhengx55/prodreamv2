'use client';

import config from '@/next-i18next.config';
import translations from '@/public/locales';
import { usePathname } from 'next/navigation';

//@ts-ignore
// let usePathname: () => string;

// if (typeof window !== 'undefined') {
//   // 客户端渲染时，才导入和使用 `usePathname`
//   usePathname = require('next/navigation').usePathname;
// }

const useLocalization = () => {
  // 从配置文件中获取默认语言和语言列表
  const defaultLanguage = config.i18n.defaultLocale;
  const locales = config.i18n.locales;
  const router = usePathname();
  let currentLng;
  // 存储已加载的翻译文件
  const translationsCache: Record<
    string,
    Record<string, string>
  > = translations as unknown as Record<string, Record<string, string>>;

  // 根据语言选择对应的翻译 JSON 文件
  const getTranslation = (language: string) => {
    if (translationsCache[language]) {
      return translationsCache[language];
    }
  };

  // 根据语言返回翻译
  const t = (text: string) => {
    const currentLanguage = getCurrentLanguage();

    const translation = getTranslation(currentLanguage);
    if (translation && translation[text]) {
      currentLng = currentLanguage;
      return translation[text];
    } else {
      return text;
    }
  };
  // 获取当前语言
  const getCurrentLanguage = () => {
    if (typeof window !== 'undefined' && router) {
      const match = router.match(/^\/([a-zA-Z0-9_-]+)/);
      const firstPath = match ? match[1] : null;
      return firstPath && locales.includes(firstPath)
        ? firstPath
        : defaultLanguage;
    } else {
      return defaultLanguage;
    }
  };

  return { t, getCurrentLanguage, locales, usePathname };
};

export default useLocalization;
