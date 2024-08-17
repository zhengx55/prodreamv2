import Icon from '@/components/root/Icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetNameV2 } from '@/lib/validation';
import { useChangeName } from '@/query/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const ResetName = () => {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof resetNameV2>>({
    resolver: zodResolver(resetNameV2),
    defaultValues: {
      name: '',
    },
  });
  const { mutateAsync, isPending } = useChangeName();

  const onSubmit = async (values: z.infer<typeof resetNameV2>) => {
    await mutateAsync(values);
    setShow(false);
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button variant={'icon'} className='p-0.5'>
          <Icon
            alt='edit'
            src='/info/edit.svg'
            width={24}
            height={24}
            priority
            className='size-6'
          />
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-lg border border-gray-200 p-8 shadow md:w-[432px]'>
        <DialogHeader className='flex-row justify-between'>
          <DialogTitle className='font-semibold'>Chage Name</DialogTitle>
          <DialogClose asChild>
            <Button
              variant={'icon'}
              className='size-max border border-gray-200 p-1'
              role='button'
            >
              <X size={16} className='text-zinc-500' />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='hidden' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='relative space-y-0'>
                  <FormControl>
                    <Input
                      id='name'
                      type='text'
                      className='h-11 bg-gray-50'
                      placeholder='Enter new name'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit' className='w-full'>
              Confirm
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ResetName);
