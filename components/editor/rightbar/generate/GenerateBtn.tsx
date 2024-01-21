import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import Warn from './Warn';

type Props = { handleGenerate: () => Promise<void> };
const GenerateBtn = ({ handleGenerate }: Props) => {
  return (
    <div className='flex flex-col'>
      <Spacer y='30' />
      <Warn />
      <Button
        onClick={handleGenerate}
        className='h-max w-max self-center rounded-full bg-doc-primary px-8 py-1'
      >
        <GenerateFill fill='#fff' size='20' />
        Generate
      </Button>
    </div>
  );
};
export default memo(GenerateBtn);
