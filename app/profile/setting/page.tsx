import Membership from '@/components/profile/Membership';
import Setting from '@/components/profile/Setting';
import Verification from '@/components/profile/Verification';

export default function Page() {
  return (
    <main className='flex h-full w-full flex-col overflow-y-auto px-10 py-5'>
      <Setting />
      <Membership />
      <Verification />
    </main>
  );
}
