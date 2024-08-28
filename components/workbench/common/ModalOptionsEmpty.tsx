import Image from 'next/image';
import { memo } from 'react';
type Props = {
  title: string;
  height?: number;
};

const ModalOptionsEmpty = ({ title, height }: Props) => {
  return (
    <div
      style={{
        height,
      }}
      className='flex-center w-full flex-col gap-y-4'
    >
      <Image
        alt=''
        src={'/workbench/empty.png'}
        width={100}
        height={100}
        priority
        className='h-auto w-20'
      />
      <p className='title-medium'>{title}</p>
    </div>
  );
};

export default memo(ModalOptionsEmpty);
