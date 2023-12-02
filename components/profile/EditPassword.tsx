'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, EyeOff, X } from 'lucide-react';
import { Button } from '../ui/button';
import { memo, useState } from 'react';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { resetPass } from '@/lib/validation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { profileResetPasswords } from '@/query/api';
import { useToast } from '../ui/use-toast';

type Props = {
  isActive: boolean;
  toogleActive: () => void;
};

const EditPassModal = ({ isActive, toogleActive }: Props) => {
  const { toast } = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);

  const form = useForm<z.infer<typeof resetPass>>({
    resolver: zodResolver(resetPass),
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });

  const { mutateAsync: resetPassAction } = useMutation({
    mutationFn: (params: { new_password: string; old_password: string }) =>
      profileResetPasswords(params),
    onSuccess: () => {
      toogleActive();
      toast({
        variant: 'default',
        description: 'Password has been reset successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof resetPass>) {
    resetPassAction({
      new_password: values.new_password,
      old_password: values.old_password,
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
            <p className='h2-bold mt-2 text-center'>Change Password </p>
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
              name='old_password'
              render={({ field }) => (
                <FormItem className='relative mt-10'>
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
                      placeholder='Enter your old password'
                      className='h-14'
                      type={hidePassword ? 'password' : 'text'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='new_password'
              render={({ field }) => (
                <FormItem className='relative'>
                  {!hideNewPassword ? (
                    <EyeOff
                      onClick={() => setHideNewPassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-6 cursor-pointer'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHideNewPassword((prev) => !prev)}
                      size={22}
                      className='absolute right-2 top-6 cursor-pointer'
                    />
                  )}
                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      placeholder='Enter your new password'
                      className='h-14'
                      type={hideNewPassword ? 'password' : 'text'}
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

export default memo(EditPassModal);
