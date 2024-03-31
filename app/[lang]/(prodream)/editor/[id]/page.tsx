import EssayPanel from '@/components/editor/EssayPanel';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({
  params,
}: {
  params: { id: string; lang: Locale };
}) {
  const dict = (await getDictionary(params.lang)).Editor;
  return <EssayPanel id={params.id} lang={params.lang} t={dict} />;
}
