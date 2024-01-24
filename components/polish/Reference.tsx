import useAiEditor from '@/zustand/store';
import { memo } from 'react';
import Spacer from '../root/Spacer';
import MLAReference from './reference/MLA';

const TEST_DATA = [
  {
    type: 'Website',
    data: {
      contributors: [
        {
          first_name: 'John',
          middle_name: 'Doe',
          last_name: 'Smith',
        },
        {
          first_name: 'John',
          middle_name: 'Doe',
          last_name: 'Smith',
        },
      ],
      article_title: 'The Impact of Technology on Education',
      website_title: 'Education Insights',
      publisher: 'Educational Publishers Inc.',
      access_date: {
        year: 2023,
        month: 'October',
        day: 15,
      },
    },
  },
];

type Props = {};
const Reference = (props: Props) => {
  const citation_type = useAiEditor((state) => state.citationStyle);
  return (
    <div className='mx-auto flex w-[750px] flex-col font-inter'>
      <h3 className='text-xl font-[600]'>References</h3>
      <Spacer y='20' />
      <ol className='list-decimal pl-8'>
        {TEST_DATA.map((item, index) => (
          <li key={`reference-${index}`} className='my-1 font-bold'>
            <MLAReference citation={item as any} />
          </li>
        ))}
      </ol>
    </div>
  );
};
export default memo(Reference);
