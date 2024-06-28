import { Loader2 } from 'lucide-react';

export default function Page() {
  return (
    <main className='sm:flex-center hidden h-full min-h-screen w-full'>
      <Loader2 className='animate-spin text-violet-500' size={30} />
    </main>
  );
}
