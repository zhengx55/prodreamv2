import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: { old_password: string; password: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/password`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        }
      );
      const data = await res.json();
      if (data.code !== 0) throw new Error(data.msg);
    },
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Password changed successfully');
      queryClient.invalidateQueries({
        queryKey: ['user-session'],
      });
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useChangeAvatar = () => {};

export const useChangeEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: { email: string; verification_code: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/email`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        }
      );
      const data = await res.json();
      if (data.code !== 0) throw new Error(data.msg);
    },
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Email changed successfully');
      queryClient.invalidateQueries({
        queryKey: ['user-session'],
      });
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: async (param: { email: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user/verification_code`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        }
      );
      const data = await res.json();
      if (data.code !== 0) throw new Error(data.msg);
    },
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Verification code sent successfully');
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};

export const useChangeName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (param: { name: string }) => {
      const token = Cookies.get('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_V2_BASE_URL}user`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(param),
        }
      );
      const data = await res.json();
      if (data.code !== 0) throw new Error(data.msg);
    },
    onSuccess: async () => {
      const { toast } = await import('sonner');
      toast.success('Name changed successfully');
      queryClient.invalidateQueries({
        queryKey: ['user-session'],
      });
    },
    onError: async (error) => {
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });
};
