import { IDocDetail } from '@/query/type';
import { DocPageDicType } from '@/types';
import { memo } from 'react';
import Card from './Card';

type Props = {
  list: IDocDetail[];
} & DocPageDicType;
const CardView = ({ t, lang, list }: Props) => {
  return (
    <ul role='list' className='grid w-[1100px] grid-flow-row grid-cols-5 gap-4'>
      {list.map((item) => (
        <Card t={t} lang={lang} item={item} key={item.id} />
      ))}
    </ul>
  );
};
export default memo(CardView);
