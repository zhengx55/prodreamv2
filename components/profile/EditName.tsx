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
import { createResetNameSchema } from '@/lib/validation';
import { profileResetName } from '@/query/api';
import { useUserInfo } from '@/zustand/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { ReactNode, memo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Props = {
  children: ReactNode;
};

const EditNameModal = ({ children }: Props) => {
  const tProfile = useTranslations('Profile');
  const tAuth = useTranslations('Auth');
  const tSuccess = useTranslations('Success');
  const resetNameSchema = createResetNameSchema(tAuth);
  const updateUserFirstName = useUserInfo((state) => state.setUserFirstName);
  const updateUserLastName = useUserInfo((state) => state.setUserLastName);

  const form = useForm<z.infer<typeof resetNameSchema>>({
    resolver: zodResolver(resetNameSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
    },
  });

  const { mutateAsync: resetNameAction } = useMutation({
    mutationFn: (params: { first_name: string; last_name: string }) =>
      profileResetName(params),
    onSuccess: () => {
      const toastInfo = tSuccess('Name_has_been_reset_successfully');
      toast.success(toastInfo);
      updateUserFirstName(form.getValues().firstname);
      updateUserLastName(form.getValues().lastname);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof resetNameSchema>) {
    resetNameAction({
      first_name: values.firstname,
      last_name: values.lastname,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        className='md:w-[500px] md:gap-y-0 md:rounded-lg md:p-2 md:px-4'
      >
        <DialogHeader>
          <DialogTitle className='flex-between p-0'>
            <p className='h2-bold mt-2 text-center'>
              {tProfile('Setting.Change_name')}
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
              name='firstname'
              render={({ field }) => (
                <FormItem className='mt-10'>
                  <FormControl>
                    <Input
                      autoComplete='firstname'
                      placeholder={tProfile('Setting.Enter_your_first_name')}
                      type='text'
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
              name='lastname'
              render={({ field }) => (
                <FormItem>
                  <div></div>
                  <FormControl>
                    <Input
                      autoComplete='lastname'
                      placeholder={tProfile('Setting.Enter_your_last_name')}
                      className='h-14'
                      type={'text'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs text-red-400' />
                </FormItem>
              )}
            />
            <div className='mb-8 mt-6 flex items-center justify-end gap-x-2'>
              <DialogClose asChild>
                <Button variant={'ghost'} className='text-violet-500'>
                  {tProfile('Setting.Cancel')}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className='bg-violet-500' type='submit'>
                  {tProfile('Setting.Save')}
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EditNameModal);
