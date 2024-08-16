'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LocaleType } from '@/i18n';
import { createLoginSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import useUserLogin from './hooks/useUserLogin';

const LoginForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const trans = useTranslations('Auth');
  const loginSchema = createLoginSchema(trans);
  const { lang } = useParams();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { mutateAsync: handleLogin } = useUserLogin(lang as LocaleType);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await handleLogin(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-6'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel
                htmlFor='username'
                className='text-xl font-semibold text-zinc-800'
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete='email'
                  id='username'
                  placeholder={trans('FormEmail')}
                  className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel
                htmlFor='password'
                className='text-xl font-semibold text-zinc-800'
              >
                Password
              </FormLabel>
              {!hidePassword ? (
                <EyeOff
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={22}
                  className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
                />
              ) : (
                <Eye
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={22}
                  className='absolute bottom-4 right-2 cursor-pointer text-neutral-400'
                />
              )}
              <FormControl>
                <Input
                  autoComplete='current-password'
                  id='password'
                  type={hidePassword ? 'password' : 'text'}
                  placeholder={trans('FormPassword')}
                  className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        <Link
          href={`/${lang}/reset-password`}
          className='small-semibold cursor-pointer self-end text-indigo-500 hover:underline'
        >
          {trans('Login.Forget')}
        </Link>
        <Button
          className='h-[60px] w-full rounded-lg font-semibold'
          type='submit'
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
