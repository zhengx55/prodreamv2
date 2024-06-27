'use client';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createVerificationCodeLoginSchema } from '@/lib/validation';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import Spacer from '@/components/root/Spacer';
import { X } from 'lucide-react';
import { ReactNode, memo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { getCountryPhonePrefixList } from '@/lib/aboutPhonenumber/getCountryPhonePrefixList';
import {
    sendVerificationCodeByPhoneCN,
    updatePhoneNumber,
} from '@/query/api';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { LoginData } from '../../query/type';

type Props = {
    children: ReactNode;
    userInfo: LoginData;
};

const EditPhoneCNModal = ({ children, userInfo }: Props) => {
    const tAuth = useTranslations('Auth');
    const tProfile = useTranslations('Profile');
    const [selectedPrefix, setSelectedPrefix] = useState('CN +86');
    const VerificationCodeLoginSchema =
        createVerificationCodeLoginSchema(tAuth, selectedPrefix.split(' ')[0]);
    const [show, setShow] = useState(false);
    const [verifyWait, setVerifyWait] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const countryPhonePrefixList = getCountryPhonePrefixList(false, true);

    const { mutateAsync: handleSendVerification } = useMutation({
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

    const form = useForm<z.infer<typeof VerificationCodeLoginSchema>>({
        resolver: zodResolver(VerificationCodeLoginSchema),
        defaultValues: {
            phone: '',
            verification_code: '',
        },
    });

    async function handleSentVerificationPhoneNumber() {
        const { phone } = form.getValues();
        if (!phone) {
            const toastInfo = tAuth('Schema.Please_Input_Phone_Number');
            toast.error(toastInfo);
            return;
        }
        await handleSendVerification({ phone_number: `${selectedPrefix.split(' ')[1]}${phone}` });
    }

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

    const { mutateAsync: handleRegister } = useMutation({
        mutationFn: (params: {
            phone_number: string;
            verification_code: string;
        }) => {
            const paramObj = {
                phone_number: `${selectedPrefix.split(' ')[1]}${params.phone_number}`,
                code: params.verification_code,
            };
            // 这里的接口应该换掉
            return updatePhoneNumber(paramObj);
        },
        onSuccess: () => {
            toast.success(tAuth('Schema.Phone_number_updated'));
            setShow(false);
        },
        onError: async (error) => {
            toast.error(error.message);
        },
    });

    async function onSubmit(values: z.infer<typeof VerificationCodeLoginSchema>) {
        const { phone, verification_code } = values;
        await handleRegister({
            phone_number: phone,
            verification_code: verification_code,
        });
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
                        <p className='text-[#4B454D] text-center text-xl font-normal leading-6'>
                            {userInfo.phone_number ? tProfile('Setting.Change_phone_number') : tProfile('Setting.Bind_phone_number')}
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
                        <Spacer y='24' />
                        <div className='flex items-center gap-x-2'>
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
                                name='phone'
                                render={({ field }) => (
                                    <FormItem className='relative flex-grow'>
                                        <FormControl>
                                            <Input
                                                autoComplete=''
                                                id='phone'
                                                placeholder={tAuth('Schema.Please_Input_Phone_Number')}
                                                className='placeholder:base-regular h-12 rounded-md border w-full'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Spacer y='8' />
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
                                                placeholder={tAuth('Schema.Please_Input_Verification_Code')}
                                                className='h-14'
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            disabled={verifyWait}
                                            onClick={handleSentVerificationPhoneNumber}
                                            type='button'
                                            variant={'ghost'}
                                            className='flex w-[134px] h-14 px-3.5 py-1.5 justify-center items-center gap-2.5 rounded-md border border-[#8652DB]'
                                        >
                                            <span className='text-[#8652DB] text-sm font-normal leading-[150%]'>{verifyWait ? countdown : tAuth('Schema.Send_Verification_Code')}</span>
                                        </Button>
                                    </div>
                                    <FormMessage className='text-xs text-red-400' />
                                </FormItem>
                            )}
                        />
                        <div className='mb-8 mt-6 flex items-center justify-end gap-x-2'>
                            <Button type='submit' size="expand" className='w-full'>{tProfile('Setting.Confirm')}</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(EditPhoneCNModal);
