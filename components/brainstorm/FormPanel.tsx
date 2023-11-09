'use client';
import { useBrainStormDetail } from '@/query/query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Loading from '../root/Loading';

const FormPanel = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: moduleData, isPending: isModuleLoading } =
    useBrainStormDetail(id);

  if (!moduleData || isModuleLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className='flex'>
        <Link
          className='small-regular capitalize text-shadow hover:underline'
          href={'/writtingpal/brainstorm'}
        >
          {pathname.split('/')[2]}
        </Link>
        <p className='small-regular text-black-200'>
          &nbsp;/&nbsp;{moduleData.name}
        </p>
      </div>
    </>
  );
};

export default FormPanel;
