import { memo } from 'react';

type Props = {};

const OutlineContent = (props: Props) => {
  return (
    <div className='flex-center flex-1 bg-slate-100 pt-6'>
      <div className='h-full w-[80%] overflow-y-auto bg-white px-8 py-6'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos excepturi
        enim quibusdam, ipsum hic autem a eum harum natus reprehenderit ducimus
        veniam voluptatem ea pariatur quas fuga incidunt velit cumque.
      </div>
    </div>
  );
};

export default memo(OutlineContent);
