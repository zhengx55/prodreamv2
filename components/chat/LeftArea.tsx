import Image from 'next/image';
import ChatNavBar from '@/components/chat/ChatNavBar';
import ChatToggleBtn from '@/components/chat/ChatToggleBtn';

const LeftArea = () => {
  return (
    <div className='flex w-1/5 flex-col justify-between p-6'>
      <Image src='/logo/Prodream.png' alt='Logo' width={120} height={20} />
      <ChatNavBar />
      {/* <ChatToggleBtn /> */}
    </div>
  );
};

export default LeftArea;
