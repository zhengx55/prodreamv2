import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { OutlineTooltipThrid } from '@/constant/enum';
import { useMutateTrackInfo } from '@/query/query';
import { useUserTask } from '@/zustand/store';
import Image from 'next/image';
import { memo } from 'react';
import Tiplayout from '../../guide/tips/Tiplayout';

type Props = { type: string; handleGenerate: () => Promise<void> };
const GenerateBtn = ({ handleGenerate, type }: Props) => {
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const updateOutlineStep = useUserTask((state) => state.updateOutlineStep);
  const updateGenerateStep = useUserTask((state) => state.updateGenerateStep);
  const outline_step = useUserTask((state) => state.outline_step);
  const generate_step = useUserTask((state) => state.generate_step);

  return (
    <div className='flex flex-col'>
      <Spacer y='30' />
      <div className='flex-center h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-shadow-border px-4 py-4'>
        <Image
          src='/Generate.png'
          alt='generate-img'
          priority
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
        {outline_step === 3 || generate_step === 1 ? (
          <Tiplayout
            title={OutlineTooltipThrid.TITLE}
            content={OutlineTooltipThrid.TEXT}
            side='left'
            buttonLabel='Got it!'
            step={generate_step === 1 ? undefined : 3}
            totalSteps={generate_step === 1 ? undefined : 3}
            onClickCallback={async () => {
              if (generate_step === 1) {
                updateGenerateStep(0);
                await updateTrack({
                  field: 'generate_tool_task',
                  data: true,
                });
              } else {
                updateOutlineStep(0);
                await updateTrack({
                  field: 'outline_tip_task',
                  data: true,
                });
              }
            }}
          >
            <Button
              onClick={handleGenerate}
              className='h-max w-max self-center rounded-full bg-doc-primary px-8 py-1'
            >
              <GenerateFill fill='#fff' size='20' />
              Generate
            </Button>
          </Tiplayout>
        ) : (
          <Button
            onClick={handleGenerate}
            className='h-max w-max self-center rounded-full bg-doc-primary px-8 py-1'
          >
            <GenerateFill fill='#fff' size='20' />
            Generate
          </Button>
        )}
      </div>
    </div>
  );
};
export default memo(GenerateBtn);
