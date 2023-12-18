import List from '@/components/brainstorm/List';
import { BrainStormTypes } from '@/constant/enum';
import { IBrainsotrmCard } from '@/types';
import { cookies } from 'next/headers';

export default async function Brainstorm() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('token');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}list_templates?lang=en`,
    {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    }
  );
  const data = await res.json();
  const brainstorms_data = data.data.result;

  const general_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.GENERAL
  );

  const common_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.COMMON
  );
  const uc_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.UC
  );

  const recommand_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) =>
      item.template_class === BrainStormTypes.RECOMMENDATION
  );

  return (
    <section className='flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col gap-y-4 overflow-y-auto bg-sectionBackground p-3'>
      <List title={BrainStormTypes.GENERAL} cardList={general_data} />
      <List title={BrainStormTypes.COMMON} cardList={common_data} />
      <List title={BrainStormTypes.UC} cardList={uc_data} />
      <List title={BrainStormTypes.RECOMMENDATION} cardList={recommand_data} />
    </section>
  );
}
