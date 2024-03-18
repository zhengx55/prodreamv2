import { useMutationMembership, useUserTrackInfo } from '@/query/query';
import { IDiscount } from '@/types';
import { memo } from 'react';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import DiscountBanner from './DiscountBanner';

type Props = {
  info: {
    title: string;
    month_price: string;
    recommended?: boolean;
    text: string;
    price_text?: string;
    features: string[];
  };
  current: boolean;
  basic?: boolean;
  purchase_type?: 'monthly' | 'annualy';
  discount?: IDiscount;
};

const Card = ({ info, current, purchase_type, basic, discount }: Props) => {
  const { mutateAsync: purchase } = useMutationMembership();
  const { data: track } = useUserTrackInfo();
  const handlePurchase = async () => {
    const url = window.origin + '/editor';
    const coupon_code = track?.current_coupon_code;
    await purchase({
      product_id: purchase_type === 'annualy' ? 'year' : 'month',
      coupon: coupon_code ?? '',
      url,
    });
  };
  return (
    <div className='flex w-[360px] flex-col gap-y-2'>
      <div
        className={`${!basic ? 'border border-doc-primary' : 'border border-transparent'} flex h-[460px] w-full flex-col rounded-lg bg-white px-5 py-4 shadow-price`}
      >
        <div className='flex h-1/4 flex-col gap-y-1.5'>
          <div className='flex items-center gap-x-2'>
            <h2 className='h3-semibold'>{info.title}</h2>
            {info.recommended && (
              <span className='subtle-regular rounded bg-doc-primary/20 px-2 py-1 text-doc-primary'>
                Recommended
              </span>
            )}
          </div>
          <p className='small-regular'>{info.text}</p>
        </div>
        <Spacer y='20' />
        <div className='flex h-1/4 flex-col gap-y-1.5'>
          {discount?.discount ? (
            <h2 className='h2-bold'>
              <span className='line-through'>${info.month_price}</span>
              <span className='small-regular line-through'>/month</span>
              &nbsp;
              {`$${(Number(info.month_price) * (1 - (discount?.discount ?? 0))).toFixed(2)}`}
              <span className='small-regular'>/month</span>
            </h2>
          ) : (
            <h2 className='h2-bold'>
              ${info.month_price}
              <span className='small-regular'>/month</span>
            </h2>
          )}
          {info.price_text ? (
            <p
              className='small-regular text-doc-font'
              dangerouslySetInnerHTML={{ __html: info.price_text }}
            />
          ) : (
            <Spacer y='20' />
          )}
          <Button
            onClick={handlePurchase}
            role='button'
            disabled={current || basic}
            className={`h-max rounded disabled:opacity-100 ${current || basic ? 'border border-shadow-border bg-white text-shadow-border' : 'bg-doc-primary'}`}
          >
            {current || basic ? 'Current Plan' : 'Upgrade Now'}
          </Button>
        </div>
        <ul className='mt-auto flex flex-col gap-y-1.5'>
          {info.features.map((feature, idx) => {
            return (
              <li
                className='small-regular flex gap-x-1 text-doc-font before:content-["✓"]'
                key={`basic-${idx}`}
              >
                <p dangerouslySetInnerHTML={{ __html: feature }} />
              </li>
            );
          })}
        </ul>
      </div>
      {discount?.expire_at && <DiscountBanner time={discount.expire_at} />}
    </div>
  );
};
export default memo(Card);
