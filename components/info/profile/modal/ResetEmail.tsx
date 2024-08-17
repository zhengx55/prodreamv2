import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { resetEmailV2 } from '@/lib/validation';
import { useChangeEmail, useSendVerificationEmail } from '@/query/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const ResetEmail = () => {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<z.infer<typeof resetEmailV2>>({
    resolver: zodResolver(resetEmailV2),
    defaultValues: {
      email: '',
      verification_code: '',
    },
  });
  const { mutateAsync, isPending } = useChangeEmail();
  const { mutateAsync: sendCode, isPending: isSending } =
    useSendVerificationEmail();
  const onSubmit = async (values: z.infer<typeof resetEmailV2>) => {
    await mutateAsync(values);
    setShow(false);
  };

  const handleSendCode = async () => {
    if (countdown > 0) return;
    await sendCode({ email: form.getValues('email') });
    setCountdown(60);
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='p-0'>
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className='rounded-lg border border-gray-200 p-8 shadow md:w-[432px]'>
        <DialogHeader className='flex-row justify-between'>
          <DialogTitle className='font-semibold'>Chage Email</DialogTitle>
          <DialogClose asChild>
            <Button
              variant={'icon'}
              className='size-max border border-gray-200 p-1'
              role='button'
            >
              <X size={16} className='text-zinc-500' />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className='hidden' />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='relative space-y-0'>
                  <FormControl>
                    <Input
                      id='email'
                      autoComplete='email'
                      className='h-11 bg-gray-50'
                      type='email'
                      placeholder='Enter new email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='verification_code'
              render={({ field }) => (
                <FormItem className='flex-between relative gap-x-4 space-y-0'>
                  <FormControl>
                    <Input
                      id='verification_code'
                      type='text'
                      className='h-11 bg-gray-50'
                      placeholder='Enter verification code'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type='button'
                    onClick={handleSendCode}
                    disabled={
                      isSending || countdown > 0 || !form.getValues('email')
                    }
                    className='h-11 w-[116px] rounded-lg'
                    variant={'secondary'}
                  >
                    {countdown > 0 ? `${countdown}s` : 'Send code'}
                  </Button>
                  <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit' className='w-full'>
              Confirm
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ResetEmail);
