'use client';
import ChatSideBar from '@/components/chat/ChatSideBar';
import ChatToggleBtn from '@/components/chat/ChatToggleBtn';
import { useOnboarding } from '@/zustand/store';

const LeftArea = () => {
  const { isSideBarVisible } = useOnboarding((state) => ({
    isSideBarVisible: state.isSideBarVisible,
  }));
  return (
    <div className='flex items-center'>
      {isSideBarVisible && <ChatSideBar />}
      <ChatToggleBtn />
    </div>
  );
};

export default LeftArea;
