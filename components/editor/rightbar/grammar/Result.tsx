import { IPolishResultAData } from '@/query/type';
import { m } from 'framer-motion';

type Props = {
  grammarResults: IPolishResultAData[];
};
const Result = ({ grammarResults }: Props) => {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'grammer-result'}
      className='flex flex-1 flex-col overflow-y-auto'
    >
      Result
    </m.div>
  );
};
export default Result;
