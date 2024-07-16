'use client';
import { useOnboarding } from '@/zustand/store';

const ChatToggleBtn = () => {
  const { isSideBarVisible, setIsSideBarVisible } = useOnboarding((state) => ({
    isSideBarVisible: state.isSideBarVisible,
    setIsSideBarVisible: state.setIsSideBarVisible,
  }));

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <div
      className='mx-2 flex h-12 w-1 cursor-pointer items-center justify-center rounded-lg bg-white'
      onClick={toggleSideBar}
    ></div>
  );
};

export default ChatToggleBtn;
