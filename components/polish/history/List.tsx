'use client';
import { IEvaluationHistory } from '@/types';
import Link from 'next/link';
import { memo } from 'react';
import Card from './Card';

type Props = { history_list: IEvaluationHistory[] };
const List = ({ history_list }: Props) => {
  return history_list.map((item) => (
    <Link passHref href={`/writtingpal/polish/${item.id}`} key={item.id}>
      <Card item={item} />
    </Link>
  ));
};
export default memo(List);
