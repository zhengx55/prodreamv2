import clearCachesByServerAction from '@/lib/revalidate';
import {
  deleteActivityListItem,
  generateActivityList,
  updateActivityListItem,
} from '@/query/api';
import { ActData, IGenerateActListParams, Mode } from '@/query/type';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { memo, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { PowerUp, Scissor } from '../root/SvgComponents';
import Tooltip from '../root/Tooltip';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import PolishLoader from './PolishLoader';
const DeleteModal = dynamic(() => import('./DeleteModal'), { ssr: false });

type Props = {
  dataType: 'generated' | 'history';
  type: string;
  data: ActData;
  index: number;
  close: () => void;
};

const EditCard = ({ type, close, index, data, dataType }: Props) => {
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(
    dataType === 'generated' ? data.result : data.text
  );
  const [cachedData, setCachedData] = useState<{
    text: string;
  }>();
  const handleDelete = useRootStore((state) => state.handlealDelete);
  const handleSave = useRootStore((state) => state.handlealSave);
  const [isPoslishing, setIsPoslishing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toogleDeleteModal = useCallback(() => {
    setShowDelete((prev) => !prev);
  }, []);

  const handleRevert = () => {
    if (!cachedData) return;
    setText(cachedData.text);
    setCachedData(undefined);
  };

  const { mutateAsync: saveChange } = useMutation({
    mutationFn: (params: { id: string; title?: string; text?: string }) =>
      updateActivityListItem(params),
    onSuccess: () => {
      toast.success('Changed has been successfully made');
      handleSave(data.id, title, text as string, type, dataType);
      clearCachesByServerAction('/writtingpal/activityList/history');
      close();
    },
    onError: () => {
      toast.error('Opps, something went wrong');
    },
  });

  const { mutateAsync: removeItem } = useMutation({
    mutationFn: (id: string) => deleteActivityListItem(id),
    onSuccess() {
      toast.success('Delete activity successfully');
      setShowDelete(false);
      handleDelete(data.id, type, dataType);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { mutateAsync: polishActItem } = useMutation({
    mutationFn: (params: IGenerateActListParams) =>
      generateActivityList(params),
    onMutate: () => {
      setIsPoslishing(true);
    },
    onSuccess: (result, varaibles) => {
      setIsPoslishing(false);
      toast.success('Activity list polished successfully!');
      setCachedData({
        text: varaibles.texts[0],
      });
      setText(result[type].activities[0].result as string);
      clearCachesByServerAction('/writtingpal/activityList/history');
    },

    onError: () => {
      setIsPoslishing(false);
      toast.error('Oops something went wrong');
    },
  });

  const removeCallback = useCallback(async (id: string) => {
    await removeItem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveAct = async () => {
    const compate_result = data.result ? data.result : data.text;
    if (text === compate_result && title === data.title) {
      toast.success('No changes were detected');
      close();
      return;
    }
    const params_title = title === data.title ? undefined : title;
    const params_text = text === compate_result ? undefined : text;
    await saveChange({ id: data.id, title: params_title, text: params_text });
  };

  const toogleLoadingModal = useCallback(() => {
    setIsPoslishing(false);
  }, []);

  const handlePolsh = async () => {
    await polishActItem({
      mode: Mode.Optimize,
      power_up: true,
      lengths: [parseInt(type)],
      texts: [text as string],
    });
  };

  return (
    <div className='relative flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-border-50 bg-sectionBackground px-4 py-3'>
      <DeleteModal
        deleteId={data.id}
        isActive={showDelete}
        toogleActive={toogleDeleteModal}
        removeCallback={removeCallback}
      />
      {isPoslishing ? (
        <PolishLoader toogleLoadingModal={toogleLoadingModal} />
      ) : null}
      <div className='flex-between'>
        <h1 className='base-semibold'>Activity {index}</h1>
        <div
          onClick={() => {
            setShowDelete(true);
          }}
          className='cursor-pointer rounded-md border-2 border-shadow-200 bg-white p-1.5 hover:bg-nav-selected'
        >
          <Tooltip tooltipContent='Delete'>
            <Trash2 size={20} />
          </Tooltip>
        </div>
      </div>
      <Input
        name='act-title'
        value={title}
        type='text'
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='subtle-regular self-start text-shadow'>
        ({title?.length} / 100 characters)
      </p>
      <Textarea
        value={text}
        name='act-text'
        onChange={(e) => setText(e.target.value)}
        className='mt-4 h-[140px] text-[14px]'
      />
      <p className='subtle-regular self-start text-shadow'>
        ({text?.length} / 1250 characters)
      </p>
      <div className='flex-between mt-4 gap-x-2'>
        <Button
          variant={'ghost'}
          disabled
          className='w-1/2 border border-border-50 bg-white'
        >
          <Scissor />
          Reduce to characters limit
        </Button>
        <Button
          variant={'ghost'}
          onClick={handlePolsh}
          className='w-1/2 border border-border-50 bg-white'
        >
          <PowerUp />
          Power up
        </Button>
      </div>
      <div className='mt-4 flex gap-x-4 self-end'>
        <Button
          onClick={handleRevert}
          variant={'secondary'}
          className='border-none'
          disabled={!cachedData}
        >
          Revert changes
        </Button>
        <Button onClick={handleSaveAct}>Save Changes</Button>
      </div>
    </div>
  );
};

export default memo(EditCard);
