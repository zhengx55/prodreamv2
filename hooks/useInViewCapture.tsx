import { PageTrack } from '@/query/api';
import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { useInView } from 'react-intersection-observer';

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
