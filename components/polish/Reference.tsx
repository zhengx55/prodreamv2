import useAiEditor from '@/zustand/store';
import { memo } from 'react';
import Spacer from '../root/Spacer';
import APAReference from './reference/APA';
import MLAReference from './reference/MLA';

type Props = {};
const Reference = (props: Props) => {
  const citation_type = useAiEditor((state) => state.citationStyle);
  const inTextCitation = useAiEditor((state) => state.inTextCitation);
  if (inTextCitation.length === 0) return null;
  return (
    <div className='mx-auto flex w-[750px] flex-col font-inter'>
      <h3 className='text-xl font-[600]'>References</h3>
      <Spacer y='20' />
      <ol className={` pl-8`}>
        {citation_type === 'MLA'
          ? inTextCitation.map((item, index) => (
              <li
                key={`reference-${index}`}
                className='my-4 text-left -indent-4 leading-[200%] first:mt-0'
              >
                <MLAReference citation={item as any} />
              </li>
            ))
          : citation_type === 'APA'
            ? inTextCitation.map((item, index) => (
                <li
                  key={`reference-${index}`}
                  className='my-4 text-left -indent-4 leading-[200%] first:mt-0'
                >
                  <APAReference citation={item as any} />
                </li>
              ))
            : null}
      </ol>
    </div>
  );
};
export default memo(Reference);
