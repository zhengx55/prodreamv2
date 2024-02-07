import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { usePostHog } from 'posthog-js/react';
import { useInView } from 'react-intersection-observer';

export default function useInviewCapture(event: string) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const posthog = usePostHog();
  useUpdateEffect(() => {
    if (inView) {
      posthog.capture(event);
    }
  }, [inView]);
  return { ref };
}
