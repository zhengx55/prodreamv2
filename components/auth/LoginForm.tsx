'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { loginIn } from './server_actions';

const LoginForm = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const trans = useTranslations('Auth');
  const { execute, isExecuting, result } = useAction(loginIn, {});

  return (
    <form action={execute} className='flex flex-col gap-y-6'>
      <div className='relative space-y-2'>
        <label
          htmlFor='username'
          className='text-xl font-semibold text-zinc-800'
        >
          Email
        </label>
        <Input
          required
          autoComplete='email'
          name='username'
          id='username'
          type='email'
          className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
        />
        {result.validationErrors?.fieldErrors.username && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.username[0]}
          </p>
        )}
      </div>
      <div className='relative space-y-2'>
        <label
          htmlFor='password'
          className='text-xl font-semibold text-zinc-800'
        >
          Password
        </label>
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
        <Input
          required
          autoComplete='current-password'
          id='password'
          name='password'
          type={hidePassword ? 'password' : 'text'}
          className='base-regular h-[60px] rounded-lg border border-zinc-200 bg-gray-50 focus-visible:ring-0'
        />
        {result.validationErrors?.fieldErrors.password && (
          <p className='absolute -bottom-5 text-xs text-red-500'>
            {result.validationErrors?.fieldErrors.password[0]}
          </p>
        )}
      </div>

      <Link
        href={`/reset-password`}
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
  );
};
export default LoginForm;
