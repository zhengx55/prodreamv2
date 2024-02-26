import useUpdateEffect from 'beautiful-react-hooks/useUpdateEffect';
import { useInView } from 'react-intersection-observer';

export default function useInviewCapture(event: string) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useUpdateEffect(() => {
    async function anonymous() {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/log/page/${event}/anonymous`,
          {
            method: 'POST',
          }
        );
      } catch (error) {
        console.error(error);
      }
    }

    if (inView) {
      anonymous();
    }
  }, [inView]);
  return { ref };
}
