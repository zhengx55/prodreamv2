import { PageTrack } from '@/query/api';
import { useInView } from 'react-intersection-observer';
import { useUpdateEffect } from 'react-use';

export default function useInviewCapture(event: string) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useUpdateEffect(() => {
    async function anonymous() {
      await PageTrack(event, '0');
    }

    if (inView) {
      anonymous();
    }
  }, [inView]);
  return { ref };
}
