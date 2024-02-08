import Spacer from '../root/Spacer';
import { Button } from '../ui/button';

type Props = {
  info: {
    title: string;
    month_price: string;
    recommended: boolean;
    text: string;
    price_text: string;
    features: string[];
  };
};

const Card = ({ info }: Props) => {
  return (
    <div className='flex h-[460px] w-[360px] flex-col rounded-lg bg-white px-5 py-4 shadow-price hover:border-doc-primary'>
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
        <h2 className='h2-bold'>
          ${info.month_price}
          <span className='small-regular'>/month</span>
        </h2>
        <p
          className='small-regular text-doc-font'
          dangerouslySetInnerHTML={{ __html: info.price_text }}
        />
        <Button className='h-max rounded bg-doc-primary'>Current Plan</Button>
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
  );
};
export default Card;
