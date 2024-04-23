import EssayPanel from '@/components/editor/EssayPanel';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string; lang: Locale };
  searchParams: { new: string };
}) {
  const dict = (await getDictionary(params.lang)).Editor;
  return (
    <EssayPanel
      isNew={searchParams.new === 'true' ? true : false}
      id={params.id}
      lang={params.lang}
      t={dict}
    />
  );
}
