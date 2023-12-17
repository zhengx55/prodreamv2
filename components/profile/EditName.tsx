'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { memo } from 'react';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useAppDispatch } from '@/store/storehooks';
import { useForm } from 'react-hook-form';
import { resetName } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { profileResetName } from '@/query/api';
import { setUserFirstName, setUserLastName } from '@/store/reducers/userSlice';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
};

const EditNameModal = ({ isActive, toogleActive }: Props) => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof resetName>>({
    resolver: zodResolver(resetName),
    defaultValues: {
      firstname: '',
      lastname: '',
    },
  });

  const { mutateAsync: resetNameAction } = useMutation({
    mutationFn: (params: { first_name: string; last_name: string }) =>
      profileResetName(params),
    onSuccess: () => {
      toogleActive();
      toast.success('Name has been reset successfully!');
      dispatch(setUserFirstName(form.getValues().firstname));
      dispatch(setUserLastName(form.getValues().lastname));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof resetName>) {
    resetNameAction({
      first_name: values.firstname,
      last_name: values.lastname,
    });
  }
  return (
    <Dialog open={isActive} onOpenChange={toogleActive}>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-2 md:px-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <p className='h2-bold mt-2 text-center'>Change Name </p>
            <DialogClose>
              <X className='self-end text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-2'
          >
            <FormField
              control={form.control}
              name='firstname'
              render={({ field }) => (
                <FormItem className='mt-10'>
                  <FormControl>
                    <Input
                      autoComplete='firstname'
                      placeholder='Enter your first name'
                      type='text'
                      className='h-14'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastname'
              render={({ field }) => (
                <FormItem>
                  <div></div>
                  <FormControl>
                    <Input
                      autoComplete='lastname'
                      placeholder='Enter your last name'
                      className='h-14'
                      type={'text'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <div className='mb-8 mt-6 flex items-center justify-end gap-x-2'>
              <DialogClose asChild>
                <Button variant={'ghost'} className=' text-primary-200'>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditNameModal);
