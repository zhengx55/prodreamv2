import { Continue } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { useAIEditor } from '@/zustand/store';
import { type Editor } from '@tiptap/react';

type Props = { editor: Editor };
const Trigger = ({ editor }: Props) => {
  const showContinue = useAIEditor((state) => state.showContinue);

  return (
    <Button
      role='button'
      style={{
        top: `${showContinue?.top}px`,
        left: `${showContinue?.left}px`,
      }}
      className='absolute z-50 h-6 w-6 cursor-pointer rounded bg-white px-0 shadow-[0px_2px_4px_0px_#DEE0EF]'
    >
      <span className='rounded bg-doc-primary'>
        <Continue />
      </span>
    </Button>
  );
};
export default Trigger;
