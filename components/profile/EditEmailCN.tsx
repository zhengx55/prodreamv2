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
import { createResetEmailSchema } from '@/lib/validation';
import { useUserInfo } from '@/zustand/store';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, X } from 'lucide-react';
import { ReactNode, memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import Spacer from '@/components/root/Spacer';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { resetEmailAction } from './_action';
import { LoginData } from '../../query/type';

type Props = {
  children: ReactNode;
  userInfo: LoginData;
};

const EditEmailModalCN = ({ children, userInfo }: Props) => {
  const [show, setShow] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const updateUserEmail = useUserInfo((state) => state.setUserEmail);
  const tProfile = useTranslations('Profile');
  const tAuth = useTranslations('Auth');
  const tError = useTranslations('Error');
  const tSuccess = useTranslations('Success');
  const resetEmailSchema = createResetEmailSchema(tAuth);

  const form = useForm<z.infer<typeof resetEmailSchema>>({
    resolver: zodResolver(resetEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetEmailSchema>) {
    const toast = (await import('sonner')).toast;
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      resetEmailAction(formData);
      const toastInfo = tSuccess('Email_has_been_reset_successfully');
      toast.success(toastInfo);
      updateUserEmail(form.getValues().email);
      setShow(false);
    } catch (error) {
      const toastInfo = tError('An_error_occurred_please_try_again_later');
      toast.error(toastInfo);
    }
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <p className='text-center text-xl font-normal leading-6 text-[#4B454D]'>
              {userInfo.email
                ? tProfile('Setting.Change_email')
                : tProfile('Setting.Bind_email')}
            </p>
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
                      placeholder={tProfile('Setting.Enter_your_new_email')}
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
                      placeholder={tProfile('Setting.Enter_your_password')}
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
              <Button type='submit' size='expand' className='w-full'>
                {tProfile('Setting.Confirm')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditEmailModalCN);
