import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { memo } from 'react';

type Props = { type: string; handleGenerate: () => Promise<void> };
const GenerateBtn = ({ handleGenerate, type }: Props) => {
  return (
    <div className='flex flex-col'>
      <Spacer y='30' />
      <div className='flex-center h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-shadow-border px-4 py-4'>
        <Image
          src='/Generate.png'
          alt='generate-img'
          width={210}
          height={270}
          className='h-auto w-auto object-contain'
        />

        <p className='base-regular text-center text-doc-font'>
          {type === 'Write Introduction'
            ? 'Click to generate the Introduction section based on the entire writing'
            : type === 'Write Conclusion'
              ? 'Click to generate the Conclusion section based on the entire writing'
              : type === 'Generate title'
                ? 'Click to generate a title for your essay'
                : null}{' '}
        </p>
        <Button
          onClick={handleGenerate}
          className='h-max w-max self-center rounded-full bg-doc-primary px-8 py-1'
        >
          <GenerateFill fill='#fff' size='20' />
          Generate
        </Button>
      </div>
    </div>
  );
};
export default memo(GenerateBtn);
