import { memo } from 'react';

type Props = {};

const OutlineContent = (props: Props) => {
  return (
    <div className='flex-1 bg-slate-100'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae deserunt in
      consequatur sapiente minima eum? Quasi at, non cum, reprehenderit nesciunt
      eligendi quisquam magni tempore autem ea doloribus, dolor iure.
    </div>
  );
};

export default memo(OutlineContent);
