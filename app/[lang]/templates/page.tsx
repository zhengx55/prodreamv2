import { useSidebar } from '@/context/SidebarpProvider';
import { Locale } from '@/i18n.config';

export default function Templates({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <main className='flex'>Templates</main>;
}
