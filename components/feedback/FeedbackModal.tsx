import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { FeedbackOptions } from '@/constant';
import { feedbackAttachments, submitFeedback } from '@/query/api';
import { useModal } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, Copy, Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useRef, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Spacer from '../root/Spacer';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const FeedbackModal = () => {
  const [option, setOption] = useState(-1);
  const memoUpdateOption = useCallback((index: number) => {
    setOption(index);
  }, []);
  const show = useModal((state) => state.feedbackModal);
  const setShow = useModal((state) => state.updateFeedbackModal);
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.stopPropagation();
        }}
        className='p-4 md:w-[544px] md:rounded-md'
      >
        {option === -1 ? (
          <Menu handler={memoUpdateOption} />
        ) : (
          <Submit option={option} handler={memoUpdateOption} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const Menu = memo(({ handler }: { handler: (index: number) => void }) => {
  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex-between'>
        <h1 className='text-xl font-medium text-zinc-700'>
          Choose your support category
        </h1>
        <DialogClose>
          <XCircle size={20} className=' text-neutral-400' />
        </DialogClose>
      </div>
      <ul className='flex flex-col gap-y-2'>
        {FeedbackOptions.map((options, index) => {
          return index === 1 ? (
            <li
              role='link'
              key={`feedback-${index}`}
              className='w-full cursor-pointer rounded border border-stone-300 px-4 py-2.5 text-zinc-600 hover:bg-violet-50 hover:shadow-md'
            >
              <Link href={'https://tally.so/r/mJ2WJR'} target='_blanck'>
                {options}
              </Link>
            </li>
          ) : (
            <li
              role='button'
              onClick={() => handler(index)}
              key={`feedback-${index}`}
              className='w-full cursor-pointer rounded border border-stone-300 px-4 py-2.5 text-zinc-600 hover:bg-violet-50 hover:shadow-md'
            >
              {options}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const Submit = memo(
  ({
    option,
    handler,
  }: {
    option: number;
    handler: (index: number) => void;
  }) => {
    const setShow = useModal((state) => state.updateFeedbackModal);
    const [attachments, setAttachments] = useState<string[]>([]);
    const infoRef = useRef<HTMLTextAreaElement>(null);

    const { mutateAsync: submit, isPending } = useMutation({
      mutationFn: (params: { description: string; attachments: string[] }) =>
        submitFeedback(params),
      onSuccess: async () => {
        const { toast } = await import('sonner');
        toast.success('Feedback submitted successfully');
        setShow(false);
      },
      onError: async (error) => {
        const { toast } = await import('sonner');
        toast.error(error.message);
      },
    });

    const memoUpdateAttachments = useCallback((attachment: string[]) => {
      setAttachments(attachment);
    }, []);

    const handleSubmit = async () => {
      const info = infoRef.current?.value;
      if (!info) {
        const { toast } = await import('sonner');
        toast.error('Please provide details');
        return;
      }
      await submit({ description: info, attachments });

      // send info
    };
    return (
      <div className='flex flex-col gap-y-6'>
        <div className='flex-between'>
          <div className='flex gap-x-2'>
            <Button
              role='button'
              variant={'icon'}
              className='size-max p-1'
              onClick={() => handler(-1)}
            >
              <ChevronLeft size={20} />
            </Button>
            <h1 className='text-xl font-medium text-zinc-700'>
              {FeedbackOptions[option]}
            </h1>
          </div>
          <DialogClose>
            <XCircle size={20} className=' text-neutral-400' />
          </DialogClose>
        </div>
        <div className='flex flex-col'>
          <label
            className='text-base font-normal text-neutral-400'
            htmlFor='detail'
          >
            {option === 0
              ? 'Please describe the bug you encountered in detail '
              : 'Please provide details for how you would like assistance'}
          </label>
          <Spacer y='5' />
          <Textarea
            name='detail'
            ref={infoRef}
            aria-label='feedback-detail'
            id='detail'
            className='small-regular min-h-20 border-stone-300 focus-visible:ring-0'
          />
          <Spacer y='16' />
          {option !== 0 ? (
            <p className='text-base font-normal text-neutral-400'>
              Alternatively, you may email us at&nbsp;
              <a href='mailto:support@prodream.ai' className='text-violet-500'>
                support@prodream.ai
              </a>
              &nbsp;or join our&nbsp;
              <Link
                href={'https://discord.gg/xXSFXv5kPd'}
                target='_blank'
                className='cursor-pointer text-violet-500 hover:underline'
              >
                Discord
              </Link>
              &nbsp;for direct chat support.
            </p>
          ) : (
            <Attachments handler={memoUpdateAttachments} />
          )}
          <Spacer y='24' />

          <Button
            disabled={isPending}
            onClick={handleSubmit}
            role='button'
            className='rounded'
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
);

const Attachments = memo(
  ({ handler }: { handler: (attachment: string[]) => void }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const onDrop = useCallback(
      async (acceptedFile: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
          const { toast } = await import('sonner');
          const error_message = fileRejections[0].errors[0].message;
          toast.error(error_message);
          return;
        }
        await upload(acceptedFile[0]);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxSize: 10 * 1024 * 1024,
      accept: {
        'image/*': [],
      },
    });

    const { mutateAsync: upload, isPending } = useMutation({
      mutationFn: (attachment: File) => feedbackAttachments(attachment),
      onSuccess: async (data) => {
        setImagePreview(data[0]);
        handler([data[0]]);
      },
      onError: async (error) => {
        const { toast } = await import('sonner');
        toast.error(error.message);
      },
    });
    return (
      <div className='flex flex-col'>
        <h2 className='text-base font-normal text-neutral-400'>Attachments</h2>
        <Spacer y='5' />
        {imagePreview ? (
          <div className='flex-center relative flex h-40 rounded border-2 border-dashed border-stone-300 p-4'>
            <Button
              role='button'
              variant={'icon'}
              className='absolute -right-2 -top-2 z-50 size-max bg-white p-0.5'
              onClick={() => {
                setImagePreview(null);
                handler([]);
              }}
            >
              <XCircle size={18} className='text-neutral-400' />
            </Button>
            <Image
              alt='user-attachment'
              src={imagePreview}
              className='rounded object-contain'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
            />
          </div>
        ) : (
          <div
            {...getRootProps({
              'aria-label': 'drag and drop area',
            })}
            className={`${isDragActive && 'bg-zinc-100'} ${
              isPending && 'pointer-events-none'
            } flex-center relative flex h-12 cursor-pointer flex-col rounded border-2 border-dashed border-stone-300 p-4 hover:bg-zinc-100`}
          >
            {isPending && (
              <div className='flex-center absolute inset-0 cursor-not-allowed backdrop-blur-sm'>
                <Loader2 className='animate-spin text-violet-500' />
              </div>
            )}
            <input {...getInputProps()} />
            <p className='inline-flex items-center gap-x-2 text-xs font-normal text-neutral-400'>
              <Copy size={14} />
              Click to choose a file or drag here
            </p>
          </div>
        )}
      </div>
    );
  }
);

Attachments.displayName = 'Attachments';
Menu.displayName = 'Menu';
Submit.displayName = 'Submit';

export default memo(FeedbackModal);
