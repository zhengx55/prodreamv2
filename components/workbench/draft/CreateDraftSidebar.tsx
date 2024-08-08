import { memo } from 'react';

const DraftSidebar = () => {
  return (
    <aside className='flex h-full w-[272px] flex-col justify-between overflow-y-auto rounded-bl-lg border-r border-zinc-200 p-2'></aside>
  );
};

export default memo(DraftSidebar);
