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
import { resetEmail } from '@/lib/validation';
import { useUserInfo } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, X } from 'lucide-react';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { resetEmailAction } from './_action';

type Props = {
  children: ReactNode;
};

const EditEmailModal = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const updateUserEmail = useUserInfo((state) => state.setUserEmail);
  const t = useTranslations('Profile');
  const form = useForm<z.infer<typeof resetEmail>>({
    resolver: zodResolver(resetEmail),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetEmail>) {
    const toast = (await import('sonner')).toast;
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      resetEmailAction(formData);
      toast.success('Email has been reset successfully!');
      updateUserEmail(form.getValues().email);
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
            <p className='h2-bold mt-2 text-center'>{t('Setting.Change_email')}</p>
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
                      placeholder={t('Setting.Enter_your_new_email')}
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
                      placeholder={t('Setting.Enter_your_password')}
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
                <Button variant={'ghost'} className=' text-violet-500'>
                  {t('Setting.Cancel')}
                </Button>
              </DialogClose>
              <Button type='submit'>{t('Setting.Save')}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditEmailModal);
