import Options from '@/components/welcome/Options';
import dynamic from 'next/dynamic';

const AnimatedLayout = dynamic(
  () => import('@/components/welcome/AnimatedLayout'),
  { ssr: false }
);

export default function Page() {
  return (
    <AnimatedLayout>
      <Options type='language' />
    </AnimatedLayout>
  );
}
