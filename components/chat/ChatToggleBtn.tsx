'use client';
import { useOnboarding } from '@/zustand/store';
import Tooltip from '@/components/root/Tooltip';
import { useTranslations } from 'next-intl';

const ChatToggleBtn = () => {
  const { isSideBarVisible, setIsSideBarVisible } = useOnboarding((state) => ({
    isSideBarVisible: state.isSideBarVisible,
    setIsSideBarVisible: state.setIsSideBarVisible,
  }));
  const tChatFeature = useTranslations('ChatFeature');

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <Tooltip
      tooltipContent={
        isSideBarVisible
          ? tChatFeature('HideSideBar')
          : tChatFeature('ShowSideBar')
      }
      side='right'
    >
      <div
        className='mx-2 flex h-12 w-1 cursor-pointer items-center justify-center rounded-lg bg-white'
        onClick={toggleSideBar}
      ></div>
    </Tooltip>
  );
};

export default ChatToggleBtn;
