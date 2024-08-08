'use client';

import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { generateDraft } from './server_actions/actions';

const GenerateDraftButton = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const { execute, isExecuting } = useAction(generateDraft.bind(null, id), {
    onSuccess: ({ data }) => {
      push(`/draft&feedback/${data}`);
    },
  });
  return (
    <Button disabled={isExecuting} onClick={() => execute()}>
      <Icon
        alt='draft'
        src='/workbench/draft.svg'
        width={20}
        height={20}
        className='size-4'
        priority
      />
      Generate Draft
    </Button>
  );
};

export default GenerateDraftButton;
