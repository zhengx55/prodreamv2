import { getUserMemberShip, purchaseMembership } from '@/query/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useMembershipInfo = () => {
  return useQuery({
    queryKey: ['membership'],
    queryFn: () => getUserMemberShip(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useMutationMembership = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (params: { product_id: string; url: string; coupon: string }) =>
      purchaseMembership(params),
    onSuccess: (data) => {
      router.push(data);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });
};
