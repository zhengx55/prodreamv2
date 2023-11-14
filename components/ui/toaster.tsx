'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Check, X } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='flex items-center gap-x-2'>
              {props.variant === 'default' && (
                <div className='flex-center h-5 w-5 rounded-full bg-[#34D399]'>
                  <Check size={16} color='rgb(255, 255, 255)' />
                </div>
              )}
              {props.variant === 'destructive' && (
                <div className='flex-center h-5 w-5 rounded-full bg-[#F87171]'>
                  <X size={16} color='rgb(255, 255, 255)' />
                </div>
              )}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
