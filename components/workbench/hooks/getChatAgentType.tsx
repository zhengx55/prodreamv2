import { NAVGATION_LINK } from '@/constant/enum';
import { StoreTypes } from '@/zustand/slice/chat-agent';
import { usePathname } from 'next/navigation';

export default function useAgentType(): { storeType: StoreTypes } {
  const pathName = usePathname();
  const storeType = pathName.includes(NAVGATION_LINK.BRAINSTORMING)
    ? 'brainstorming'
    : pathName.includes(NAVGATION_LINK.OUTLINE)
      ? 'outline'
      : pathName.includes(NAVGATION_LINK.DRAFT)
        ? 'draft'
        : 'chat';

  return { storeType };
}
