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
import { memo, useState } from 'react';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { resetEmail } from '@/lib/validation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { profileResetEmail } from '@/query/api';
import { useToast } from '../ui/use-toast';
import { useAppDispatch } from '@/store/storehooks';
import { setUserEmail } from '@/store/reducers/userSlice';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
};

const EditEmailModal = ({ isActive, toogleActive }: Props) => {
  const { toast } = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof resetEmail>>({
    resolver: zodResolver(resetEmail),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: resetEmailAction } = useMutation({
    mutationFn: (params: { new_email: string; password: string }) =>
      profileResetEmail(params),
    onSuccess: () => {
      toogleActive();
      toast({
        variant: 'default',
        description: 'Email has been reset successfully!',
      });
      dispatch(setUserEmail(form.getValues().email));
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof resetEmail>) {
    resetEmailAction({
      new_email: values.email,
      password: values.password,
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
            <p className='h2-bold mt-2 text-center'>Change Email</p>
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
              name='email'
              render={({ field }) => (
                <FormItem className='mt-10'>
                  <FormControl>
                    <Input
                      autoComplete='email'
                      id='email'
                      placeholder='Enter your new email'
                      type='email'
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
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  {!hidePassword ? (
                    <EyeOff
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-6 cursor-pointer'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-6 cursor-pointer'
                    />
                  )}
                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      placeholder='Enter your password'
                      className='h-14'
                      type={hidePassword ? 'password' : 'text'}
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

export default memo(EditEmailModal);
