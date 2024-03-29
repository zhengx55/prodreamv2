'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { resetPass } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, X } from 'lucide-react';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { resetPasswordAction } from './_action';

type Props = {
  children: ReactNode;
};

const EditPassModal = ({ children }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [show, setShow] = useState(false);

  const form = useForm<z.infer<typeof resetPass>>({
    resolver: zodResolver(resetPass),
    defaultValues: {
      old_password: '',
      new_password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPass>) {
    const toast = (await import('sonner')).toast;
    try {
      const formData = new FormData();
      formData.append('old_password', values.old_password);
      formData.append('password', values.new_password);
      await resetPasswordAction(formData);
      toast.success('password has been reset successfully!');
      setShow(false);
    } catch (error) {
      toast.error('An error occurred, please try again later!');
    }
  }
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-2 md:px-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <p className='h2-bold mt-2 text-center'>Change Password</p>
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
                <Button variant={'ghost'} className=' text-violet-500'>
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
