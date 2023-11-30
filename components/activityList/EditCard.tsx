import { ActData, IGenerateActListParams, Mode } from '@/query/type';
import React, { useCallback, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { generateActivityList, updateActivityListItem } from '@/query/api';
import { useAppDispatch } from '@/store/storehooks';
import { updateActListItem } from '@/store/reducers/activityListSlice';
import PolishLoader from './PolishLoader';

type Props = { type: string; data: ActData; index: number; close: () => void };

const EditCard = ({ type, close, index, data }: Props) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.result ? data.result : data.text);
  const [isPoslishing, setIsPoslishing] = useState(false);
  const handleRevert = () => {
    setText(data.result ? data.result : data.text);
    setTitle(data.title);
  };
  const { mutateAsync: saveChange } = useMutation({
    mutationFn: (params: { id: string; title?: string; text?: string }) =>
      updateActivityListItem(params),
    onSuccess: () => {
      toast({
        description: 'Changed has been successfully made',
        variant: 'default',
      });
      dispatch(
        updateActListItem({
          dataId: data.id,
          dataTitle: title,
          dataText: text as string,
          dataType: type,
        })
      );
      close();
    },
    onError: () => {
      toast({
        description: 'Opps, something went wrong',
        variant: 'destructive',
      });
    },
  });

  const { mutateAsync: polishActItem } = useMutation({
    mutationFn: (params: IGenerateActListParams) =>
      generateActivityList(params),
    onSuccess: (result) => {
      setIsPoslishing(false);
      toast({
        description: 'Activity list polished successfully!',
        variant: 'default',
      });
      setText(result[type].activities[0].result as string);
    },

    onError: () => {
      setIsPoslishing(false);
      toast({
        description: 'Oops something went wrong',
        variant: 'destructive',
      });
    },
  });

  const handleSave = async () => {
    const compate_result = data.result ? data.result : data.text;
    if (text === compate_result && title === data.title) {
      toast({
        description: 'No changes were detected',
        variant: 'default',
      });
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
    setIsPoslishing(true);
    await polishActItem({
      mode: Mode.Optimize,
      power_up: true,
      lengths: [parseInt(type)],
      texts: [text as string],
    });
  };

  return (
    <div className='relative flex shrink-0 flex-col gap-y-2 rounded-[10px] border border-border-50 bg-sectionBackground px-4 py-3'>
      {isPoslishing ? (
        <PolishLoader toogleLoadingModal={toogleLoadingModal} />
      ) : null}
      <h1 className='base-semibold'>Activity {index}</h1>
      <Input
        name='act-title'
        value={title}
        type='text'
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className='subtle-regular self-start text-shadow'>
        ({data.title?.length} characters)
      </p>
      <Textarea
        value={text}
        name='act-text'
        onChange={(e) => setText(e.target.value)}
        className='mt-4 h-[140px] text-[14px]'
      />
      <p className='subtle-regular self-start text-shadow'>
        ({data.result ? data.result?.length : data.text?.length} characters)
      </p>
      <div className='flex-between mt-4 gap-x-2'>
        <Button
          variant={'ghost'}
          disabled
          className='w-1/2 border border-border-50 bg-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
          >
            <path
              d='M7.75458 2.92969C6.73159 2.92969 5.69959 3.3097 4.91859 4.0907C3.35559 5.6527 3.34561 8.19169 4.9076 9.7537C5.9086 10.7537 7.2906 11.1207 8.6496 10.8357L10.5496 12.7337L7.75159 15.5267L7.42258 15.2087C7.19958 14.9857 6.91861 14.9217 6.63361 14.9497C6.34761 14.9777 6.11761 15.1047 5.94261 15.3677C5.69261 15.7427 4.19261 17.9917 3.94261 18.3677C3.67761 18.7637 3.73061 19.3117 4.06761 19.6487L5.06761 20.6487C5.40461 20.9857 5.92061 21.0377 6.31761 20.7737L9.3176 18.7737C9.8426 18.4237 9.8726 17.6327 9.4646 17.2417L9.15461 16.9477L11.9656 14.1397L13.8326 16.0317C13.6926 16.6437 13.6946 17.3537 13.8696 18.0017C14.4266 20.0687 16.6586 21.3747 18.7306 20.8017L15.7446 17.9307L16.2546 15.4607L18.7546 14.9297L21.6136 17.9397C21.7846 17.2897 21.7916 16.5967 21.6046 15.9007C21.1766 14.3007 19.8616 13.1757 18.3176 12.9607C17.8526 12.8967 17.3256 12.9147 16.8426 13.0227L15.4606 11.6547L20.7856 8.30469L20.8486 8.2417C22.0596 7.0317 22.0596 5.07768 20.8486 3.86768L20.8176 3.83569C20.2116 3.23069 19.4236 2.92969 18.6296 2.92969C17.8366 2.92969 17.0476 3.23069 16.4426 3.83569L16.3796 3.89868L13.0486 9.20169L11.6436 7.81269C11.9246 6.52568 11.5616 5.09368 10.5606 4.09268C9.77958 3.31168 8.77858 2.92969 7.75458 2.92969ZM7.09861 4.52368L9.50361 5.16467L10.1476 7.57569L8.37061 9.35068L5.97459 8.70368L5.32261 6.31268L7.09861 4.52368Z'
              fill='#9C2CF3'
            />
          </svg>
          Reduce to characters limit
        </Button>
        <Button
          variant={'ghost'}
          onClick={handlePolsh}
          className='w-1/2 border border-border-50 bg-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
          >
            <path
              d='M12.7493 2.0139C10.1843 2.0387 8.74925 3.9428 8.74925 6.0139C8.74925 7.8968 10.0344 9.4324 11.7493 9.8889V7.0139C11.7505 6.4616 12.197 6.0127 12.7493 6.0139C13.3016 6.0151 13.7505 6.4616 13.7493 7.0139V8.73271C14.3361 7.66111 15.8204 6.45461 17.7493 6.10771C17.2279 3.62421 15.0809 1.9913 12.7493 2.0139ZM6.84305 7.0139C4.35955 7.5353 2.72666 9.6824 2.74926 12.0139C2.77406 14.5789 4.67815 16.0139 6.74925 16.0139C8.63215 16.0139 10.1678 14.7289 10.6243 13.0139H7.74925C7.19695 13.0129 6.74805 12.5659 6.74925 12.0139C6.75045 11.4619 7.19695 11.0129 7.74925 11.0139H9.46805C8.39645 10.4269 7.18995 8.9427 6.84305 7.0139ZM18.7493 8.0139C16.8664 8.0139 15.3308 9.299 14.8743 11.0139H17.7493C18.3016 11.0149 18.7505 11.4619 18.7493 12.0139C18.7481 12.5659 18.3016 13.0149 17.7493 13.0139H16.0304C17.102 13.6009 18.3085 15.0849 18.6554 17.0139C21.139 16.4929 22.7719 14.3459 22.7493 12.0139C22.7245 9.4489 20.8204 8.0139 18.7493 8.0139ZM12.7493 11.0139C12.197 11.0139 11.7493 11.4619 11.7493 12.0139C11.7493 12.5659 12.197 13.0139 12.7493 13.0139C13.3016 13.0139 13.7493 12.5659 13.7493 12.0139C13.7493 11.4619 13.3016 11.0139 12.7493 11.0139ZM13.7493 14.1389V17.0139C13.7481 17.5659 13.3016 18.0149 12.7493 18.0139C12.197 18.0129 11.7481 17.5659 11.7493 17.0139V15.2949C11.1625 16.3669 9.67815 17.5729 7.74925 17.9199C8.27065 20.4039 10.4177 22.0369 12.7493 22.0139C15.3143 21.9889 16.7493 20.0849 16.7493 18.0139C16.7493 16.1309 15.4642 14.5959 13.7493 14.1389Z'
              fill='#9C2CF3'
            />
          </svg>
          Power up
        </Button>
      </div>
      <div className='mt-4 flex gap-x-4 self-end'>
        <Button
          onClick={handleRevert}
          variant={'secondary'}
          className='border-none'
        >
          Revert changes
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default EditCard;
