import List from '@/components/brainstorm/List';
// import { brainstorms_data } from '@/constant';
import { BrainStormTypes } from '@/constant/enum';
import { IBrainsotrmCard } from '@/types';

export default async function Brainstorm() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}list_templates?lang=en`,
    {
      next: { revalidate: 3600 },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  const brainstorms_data = data.data.result;

  const common_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.COMMON
  );
  const uc_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.UC
  );
  const other_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) => item.template_class === BrainStormTypes.OTHER
  );
  const recommand_data = brainstorms_data.filter(
    (item: IBrainsotrmCard) =>
      item.template_class === BrainStormTypes.RECOMMENDATION
  );

  return (
    <section className='flex h-[calc(100%_-_68px)] w-full flex-col gap-y-4 overflow-y-auto bg-sectionBackground md:py-5 md:pl-5 md:pr-10'>
      <List title={BrainStormTypes.COMMON} cardList={common_data} />
      <List title={BrainStormTypes.UC} cardList={uc_data} />
      <List title={BrainStormTypes.OTHER} cardList={other_data} />
      <List title={BrainStormTypes.RECOMMENDATION} cardList={recommand_data} />
    </section>
  );
}
