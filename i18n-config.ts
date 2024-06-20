export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'cn'],
  localesCN: ['中', '英'],
} as const;

export const langObjCN = {
  cn: '中',
  en: '英',
};

export type Locale = (typeof i18n)['locales'][number];
export type LocaleCN = (typeof i18n)['localesCN'][number];
