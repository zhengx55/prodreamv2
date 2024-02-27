import { format_table_time } from '@/lib/utils';
import { ISubsciptionHistory } from '@/types';
import Spacer from '../root/Spacer';
import { Separator } from '../ui/separator';

type Props = {
  history: ISubsciptionHistory[];
};
const MembershipHistory = ({ history }: Props) => {
  return (
    <>
      <h2 className='title-medium'>Billing History</h2>
      <Spacer y='16' />
      <ul
        role='list'
        className='flex h-full max-w-3xl flex-col gap-y-2 overflow-y-auto rounded bg-[#FCFBFF] p-4'
      >
        <li className='grid grid-cols-5'>
          <p className='small-regular text-doc-font'>Plan Name</p>
          <p className='small-regular text-doc-font'>Start Date</p>
          <p className='small-regular text-doc-font'>End Date</p>
          <p className='small-regular text-doc-font'>Paid amount</p>
          <p className='small-regular text-doc-font'>Membership status</p>
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
                  'Canceled'
                ) : isActive ? (
                  <span className=' text-green-400'>Active</span>
                ) : (
                  'Expired'
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
