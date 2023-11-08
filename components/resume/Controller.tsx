'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Download, PencilLine } from 'lucide-react';
import { usePDF } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';

type Props = {
  document: JSX.Element;
};

const Controller = ({ document }: Props) => {
  const [instance] = usePDF({ document });

  const router = useRouter();
  return (
    <div className='flex flex-col gap-y-4'>
      <Button variant={'white'} onClick={() => router.back()}>
        <PencilLine size={24} />
        Edit
      </Button>
      <a download={'test_resume'} href={instance.url as string}>
        <Button variant={'white'}>
          <Download size={24} /> Downlad
        </Button>
      </a>
    </div>
  );
};

export const ResumeControllerCSR = dynamic(() => Promise.resolve(Controller), {
  ssr: false,
});
