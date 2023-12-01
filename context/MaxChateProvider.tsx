import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type ChatWithMaxProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  currentSession: string;
  setCurrentSession: Dispatch<SetStateAction<string>>;
  currentChatType: 1 | 2;
  setCurrentChatType: Dispatch<SetStateAction<1 | 2>>;
};

const MaxChatContext = createContext({} as ChatWithMaxProps);

export default function MaxChatProvider({ children }: { children: ReactNode }) {
  const [showMenu, setShowMenu] = useState(true);
  const [currentSession, setCurrentSession] = useState('');
  const [currentChatType, setCurrentChatType] = useState<1 | 2>(1);

  return (
    <MaxChatContext.Provider
      value={{
        showMenu,
        setShowMenu,
        currentSession,
        setCurrentSession,
        currentChatType,
        setCurrentChatType,
      }}
    >
      {children}
    </MaxChatContext.Provider>
  );
}

export const useMaxChatContext = () => useContext(MaxChatContext);
