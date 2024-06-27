'use client';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createResetSchemaCN } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { sendVerificationEmail, sendVerificationCodeByPhoneCN, userReset } from '@/query/api';
import { getCountryPhonePrefixList } from '@/lib/aboutPhonenumber/getCountryPhonePrefixList';
import { ReactNode, memo, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { IResetParams } from '@/query/type';
import { resetPasswordAction } from './_action';
import Spacer from '@/components/root/Spacer';
import { LoginData } from '../../query/type';

type Props = {
  children: ReactNode;
  userInfo: LoginData;
};

const EditPassModalCN = ({ children, userInfo }: Props) => {
  const tAuth = useTranslations('Auth');
  const tProfile = useTranslations('Profile');
  const [show, setShow] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState('CN +86');
  const resetSchema = createResetSchemaCN(tAuth, selectedPrefix.split(' ')[0]);
  const countryPhonePrefixList = getCountryPhonePrefixList(false, true);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [verifyWait, setVerifyWait] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (verifyWait && countdown > 0) {
      // start count down
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [verifyWait, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setVerifyWait(false);
    }
  }, [countdown]);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
      confirm: '',
      verification_code: '',
    },
  });
  const { mutateAsync: handleReset } = useMutation({
    mutationFn: (param: IResetParams) => userReset(param),
    onSuccess: (_data) => {
      const toastInfo = tAuth('ForgotPassword.Successfully_Reset_Password');
      toast.success(toastInfo);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleSendVerificationEmail } = useMutation({
    mutationFn: (params: { email: string }) => sendVerificationEmail(params),
    onSuccess: () => {
      const toastInfo = tAuth('ForgotPassword.Checked_your_email');
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleSendVerificationPhone } = useMutation({
    mutationFn: (params: { phone_number: string }) =>
      sendVerificationCodeByPhoneCN(params),
    onSuccess: () => {
      const toastInfo = tAuth('Schema.Verification_code_sent');
      toast.success(toastInfo);
      setVerifyWait(true);
      setCountdown(60);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSentVerification() {
    const { emailOrPhone } = form.getValues();
    if (!emailOrPhone) {
      const toastInfo = tAuth('ForgotPassword.Please_enter_your_email_address');
      toast.error(toastInfo);
      return;
    } else if (emailOrPhone.includes('@')) {
      await handleSendVerificationEmail({ email: emailOrPhone });
    } else {
      await handleSendVerificationPhone({ phone_number: `${selectedPrefix.split(' ')[1]}${emailOrPhone}` });
    }
  }

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    let emailOrPhoneNeed = ''
    if (values.emailOrPhone.includes('@')) {
      emailOrPhoneNeed = values.emailOrPhone
    } else {
      emailOrPhoneNeed = `${selectedPrefix.split(' ')[1]}${values.emailOrPhone}`
    }

    try {
      await handleReset({
        emailOrPhone: emailOrPhoneNeed,
        password: values.password,
        verification_code: values.verification_code,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[550px] md:gap-y-0 md:rounded-lg md:p-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <p className='text-[#4B454D] text-center text-xl font-normal leading-6'>
              {tProfile('Setting.Change_password')}
            </p>
            <DialogClose>
              <X className='self-end text-shadow' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <Spacer y='24' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col'>
            <div className='flex items-center gap-x-2 mt-5'>
              <Select
                value={selectedPrefix}
                onValueChange={(value) => setSelectedPrefix(value)}
              >
                <SelectTrigger className='w-[116px] h-max gap-x-2 rounded-lg px-4 py-3.5'>
                  <SelectValue placeholder={selectedPrefix} />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {Object.entries(countryPhonePrefixList).map(([code, prefix]) => (
                    <SelectItem key={code} value={`${code} ${prefix}`}>
                      {code} {prefix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormField
                control={form.control}
                name='emailOrPhone'
                render={({ field }) => (
                  <FormItem className='relative flex-grow'>
                    <FormControl>
                      <Input
                        autoComplete='email'
                        type='emailOrPhone'
                        id='username'
                        placeholder={tAuth('ForgotPassword.Input_Email_or_Phone_Number')}
                        className='placeholder:base-regular h-12 rounded-md border'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                  </FormItem>
                )}
              />
            </div>
            <Spacer y='12' />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='relative'>
                  {!hidePassword ? (
                    <EyeOff
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={20}
                      className='absolute top-6 right-2 cursor-pointer text-neutral-400'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHidePassword((prev) => !prev)}
                      size={20}
                      className='absolute top-6 right-2 cursor-pointer text-neutral-400'
                    />
                  )}
                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='password'
                      type={hidePassword ? 'password' : 'text'}
                      placeholder={tProfile('Setting.Enter_your_new_password')}
                      className='base-regular h-12 rounded-md border'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Spacer y='12' />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem className='relative'>
                  {!hideConfirm ? (
                    <EyeOff
                      onClick={() => setHideConfirm((prev) => !prev)}
                      size={20}
                      className='absolute top-6 right-2 cursor-pointer text-neutral-400'
                    />
                  ) : (
                    <Eye
                      onClick={() => setHideConfirm((prev) => !prev)}
                      size={20}
                      className='absolute top-6 right-2 cursor-pointer text-neutral-400'
                    />
                  )}
                  <FormControl>
                    <Input
                      autoComplete='current-password'
                      id='confirm'
                      type={hideConfirm ? 'password' : 'text'}
                      placeholder={tAuth('ForgotPassword.Please_input_password_again')}
                      className='base-regular h-12 rounded-md border'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Spacer y='20' />
            <FormField
              control={form.control}
              name='verification_code'
              render={({ field }) => (
                <FormItem className='relative'>
                  <div className='flex gap-x-2'>
                    <FormControl>
                      <Input
                        autoComplete='current-password'
                        id='verification_code'
                        type='text'
                        placeholder={tAuth('ForgotPassword.Please_input_verification_code')}
                        className='base-regular h-12 rounded-md border'
                        {...field}
                      />
                    </FormControl>
                    <Button
                      disabled={verifyWait}
                      variant={'ghost'}
                      onClick={handleSentVerification}
                      type='button'
                      className='flex w-[134px] h-12 px-3.5 py-1.5 justify-center items-center gap-2.5 rounded-md border border-[#8652DB]'
                    >
                      {verifyWait ? countdown : tAuth('ForgotPassword.Send_Verification_Code')}
                    </Button>
                  </div>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Spacer y='24' />
            <Button className='w-full rounded bg-[#8652DB]' type='submit'>
              {tAuth('ForgotPassword.Reset_Password')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditPassModalCN);
