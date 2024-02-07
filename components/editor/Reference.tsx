import useAiEditor from '@/zustand/store';
import { memo, useMemo } from 'react';
import Spacer from '../root/Spacer';
import APAReference from './reference/APA';
import MLAReference from './reference/MLA';

type Props = {};
const Reference = (props: Props) => {
  const citation_type = useAiEditor((state) => state.citationStyle);
  const inTextCitation = useAiEditor((state) => state.inTextCitation);
  const sort_array = useMemo(() => {
    return inTextCitation.sort((a, b) => {
      const lastNameA = (
        a.data.contributors?.[0]?.last_name || ''
      ).toLowerCase();
      const lastNameB = (
        b.data.contributors?.[0]?.last_name || ''
      ).toLowerCase();

      if (lastNameA && lastNameB) {
        if (lastNameA < lastNameB) {
          return -1;
        }
        if (lastNameA > lastNameB) {
          return 1;
        }
      } else if (lastNameA) {
        return -1;
      } else if (lastNameB) {
        return 1;
      }

      return 0;
    });
  }, [inTextCitation]);
  if (inTextCitation.length === 0) return null;
  return (
    <div className='mx-auto flex w-[700px] select-none flex-col'>
      <h3 className='text-xl font-[600]'>References</h3>
      <Spacer y='20' />
      <ol className={`pl-8`}>
        {citation_type === 'MLA'
          ? sort_array.map((item, index) => (
              <li
                key={`reference-${index}`}
                className='my-4 text-left -indent-4 font-serif leading-[150%] first:mt-0'
              >
                <MLAReference citation={item as any} />
              </li>
            ))
          : citation_type === 'APA'
            ? sort_array.map((item, index) => (
                <li
                  key={`reference-${index}`}
                  className='my-4 text-left -indent-4 font-serif leading-[150%] first:mt-0'
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
