import { Loader2 } from 'lucide-react';

export default function Page() {
  return (
    <main className='sm:flex-center hidden h-full w-full'>
      <Loader2 className='animate-spin text-doc-primary' size={30} />
    </main>
  );
}
