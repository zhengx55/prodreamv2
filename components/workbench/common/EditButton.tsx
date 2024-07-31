import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { memo } from 'react';

type Props = { id: string };

const EditButton = ({ id }: Props) => {
  return (
    <Tooltip tooltipContent='Edit'>
      <Button className='size-max p-0' role='button' variant={'icon'}>
        <Link passHref href={`/brainstorming/${id}/edit`}>
          <Icon
            className='size-4'
            width={20}
            height={20}
            alt='edit'
            src='/workbench/edit.svg'
          />
        </Link>
      </Button>
    </Tooltip>
  );
};

export default memo(EditButton);
