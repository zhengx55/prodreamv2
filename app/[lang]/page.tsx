import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/getDict';

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <main className=''>{lang}</main>;
}
