import Loading from '@/components/root/CustomLoading';
import dynamic from 'next/dynamic';

const LazyEditRoot = dynamic(() => import('@/components/resume/LazyEditRoot'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Page() {
  return <LazyEditRoot />;
}
