import dynamic from 'next/dynamic';
const Options = dynamic(() => import('@/components/welcome/Options'));
export default async function Page() {
  return <Options type='education' />;
}
