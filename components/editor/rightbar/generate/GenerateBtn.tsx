import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { OutlineTooltipThrid } from '@/constant/enum';
import { useButtonTrack, useMutateTrackInfo } from '@/query/query';
import { EdtitorDictType } from '@/types';
import { useAIEditor, useUserTask } from '@/zustand/store';
import Image from 'next/image';
import { memo } from 'react';
import Tiplayout from '../../guide/tips/Tiplayout';

type Props = {
  type: string;
  handleGenerate: () => Promise<void>;
  t: EdtitorDictType;
};
const GenerateBtn = ({ handleGenerate, type, t }: Props) => {
  const { mutateAsync: updateTrack } = useMutateTrackInfo();
  const { updateOutlineStep, updateGenerateStep, outline_step, generate_step } =
    useUserTask((state) => ({ ...state }));
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const { mutateAsync: ButtonTrack } = useButtonTrack();

  return (
    <div className='flex flex-col'>
      <Spacer y='30' />
      <div className='flex-center h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-4'>
        <Image
          src='/editor/Generate.png'
          alt='generate-img'
          priority
          width={210}
          height={270}
          className='h-auto w-auto object-contain'
        />

        <p className='base-regular text-center text-neutral-400'>
          {t.Generate.SubTitle[type as keyof typeof t.Generate.SubTitle]}
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
                await ButtonTrack({
                  event: 'Onboarding task: generate introduction',
                });
              } else {
                updateOutlineStep(0);
                await updateTrack({
                  field: 'outline_tip_task',
                  data: true,
                });
                await ButtonTrack({ event: 'outline_gotit' });
                updateRightbarTab(0);
              }
            }}
          >
            <Btn label={t.Utility.Generate} onClick={handleGenerate} />
          </Tiplayout>
        ) : (
          <Btn label={t.Utility.Generate} onClick={handleGenerate} />
        )}
      </div>
    </div>
  );
};
const Btn = ({
  onClick,
  label,
}: {
  onClick: () => Promise<void>;
  label: string;
}) => (
  <Button
    onClick={onClick}
    className='h-max w-max self-center rounded-full bg-violet-500 px-8 py-1'
  >
    <GenerateFill fill='#fff' size='20' />
    {label}
  </Button>
);
export default memo(GenerateBtn);
