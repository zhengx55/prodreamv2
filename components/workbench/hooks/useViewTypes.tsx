import Icon from '@/components/root/Icon';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';

export default function useViewType() {
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid');

  const handleViewChange = useCallback((type: 'list' | 'grid') => {
    setViewType(type);
  }, []);

  const renderViewToggleButton = useCallback(() => {
    return viewType === 'grid' ? (
      <Tooltip tooltipContent='List View'>
        <Button
          role='button'
          onClick={() => handleViewChange('list')}
          className='size-max p-1'
          variant={'icon'}
        >
          <Icon
            alt='list'
            src='/workbench/list_view.svg'
            width={20}
            priority
            className='size-4'
            height={20}
          />
        </Button>
      </Tooltip>
    ) : (
      <Tooltip tooltipContent='Grid View'>
        <Button
          onClick={() => handleViewChange('grid')}
          role='button'
          className='size-max p-1'
          variant={'icon'}
        >
          <Icon
            alt='grid'
            src='/workbench/grid_view.svg'
            width={20}
            className='size-4'
            height={20}
          />
        </Button>
      </Tooltip>
    );
  }, [viewType, handleViewChange]);

  return { viewType, renderViewToggleButton };
}
