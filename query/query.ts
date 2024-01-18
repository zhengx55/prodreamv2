import { useQuery } from '@tanstack/react-query';
import { getReferralCount } from './api';

// ----------------------------------------------------------------
// Referals
// ----------------------------------------------------------------
export const useReferralsCount = () => {
  return useQuery({
    queryKey: ['referrals_count'],
    queryFn: () => getReferralCount(),
  });
};
