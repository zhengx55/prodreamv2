import { format_table_time } from '@/lib/utils';
import { ISubsciptionHistory } from '@/types';
import Spacer from '../root/Spacer';
import { useTranslations } from 'next-intl';
import { Separator } from '../ui/separator';

type Props = {
  history: ISubsciptionHistory[];
};
const MembershipHistory = ({ history }: Props) => {
  const trans = useTranslations('Profile');

  return (
    <>
      <h2 className='title-medium'>
        {trans('MembershipHistory.Billing_History')}
      </h2>
      <Spacer y='16' />
      <ul
        role='list'
        className='flex h-full max-w-3xl flex-col gap-y-2 overflow-y-auto rounded bg-[#FCFBFF] p-4'
      >
        <li className='grid grid-cols-5'>
          <p className='small-regular text-neutral-400'>
            {trans('MembershipHistory.Plan_Name')}
          </p>
          <p className='small-regular text-neutral-400'>
            {trans('MembershipHistory.Start_Date')}
          </p>
          <p className='small-regular text-neutral-400'>
            {trans('MembershipHistory.End_Date')}
          </p>
          <p className='small-regular text-neutral-400'>
            {trans('MembershipHistory.Paid_amount')}
          </p>
          <p className='small-regular text-neutral-400'>
            {trans('MembershipHistory.Membership_status')}
          </p>
        </li>
        <Separator orientation='horizontal' className=' bg-shadow-border' />
        {history.map((item) => {
          const isActive =
            item.end_date > Math.floor(Date.now() / 1000) &&
            item.start_date < Math.floor(Date.now() / 1000);
          return (
            <li key={item.id} className='small-regular grid grid-cols-5'>
              <p>{item.mode}</p>
              <p>{format_table_time(item.start_date)}</p>
              <p>{format_table_time(item.end_date)}</p>
              <p>${item.price / 100}</p>
              <p>
                {item.canceled ? (
                  trans('MembershipHistory.Canceled')
                ) : isActive ? (
                  <span className=' text-green-400'>
                    {trans('MembershipHistory.Active')}
                  </span>
                ) : (
                  trans('MembershipHistory.Expired')
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default MembershipHistory;
