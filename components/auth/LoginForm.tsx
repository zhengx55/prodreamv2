'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createLoginSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { LocaleType } from '@/i18n';
import { useTranslations } from 'next-intl';
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
              <FormControl>
                <Input
                  autoComplete='email'
                  id='username'
                  placeholder={trans('FormEmail')}
                  className='placeholder:base-regular h-12 rounded-md border'
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
              {!hidePassword ? (
                <EyeOff
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={22}
                  className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                />
              ) : (
                <Eye
                  onClick={() => setHidePassword((prev) => !prev)}
                  size={22}
                  className='absolute bottom-3.5 right-2 cursor-pointer text-neutral-400'
                />
              )}
              <FormControl>
                <Input
                  autoComplete='current-password'
                  id='password'
                  type={hidePassword ? 'password' : 'text'}
                  placeholder={trans('FormPassword')}
                  className='placeholder:base-regular h-12 rounded-md border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
            </FormItem>
          )}
        />
        <Link
          href={`/${lang}/reset-password`}
          className='small-semibold cursor-pointer self-end text-violet-500 hover:underline'
        >
          {trans('Login.Forget')}
        </Link>
        <Button className='w-full rounded bg-violet-500' type='submit'>
          {trans('Login.Button')}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
