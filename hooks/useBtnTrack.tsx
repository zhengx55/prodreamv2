import { ButtonTrack } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';

export default function useButtonTrack() {
  return useMutation({
    mutationFn: ({ event }: { event: string }) =>
      ButtonTrack(event, isMobile ? 1 : 0),
  });
}
