import { EditorDictType } from '@/types';
import { m } from 'framer-motion';
import Image from 'next/image';

type Props = { t: EditorDictType };
const NoPlagiarismReport = ({ t }: Props) => {
  return (
    <m.div
      key={'non-plagiarism-panel'}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'
    >
      <Image
        src='/editor/Nonplag.png'
        alt='non-plag report'
        width={180}
        height={180}
        className='size-44 self-center'
      />
      <p className='text-center text-sm font-normal text-zinc-600'>
        <span className='title-medium text-indigo-500'>0%</span>&nbsp;
        {t.Plagiarism['non-plagiarized']}
      </p>
    </m.div>
  );
};
export default NoPlagiarismReport;
