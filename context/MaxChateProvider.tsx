import { ReactNode, createContext, useContext, useState } from 'react';

const MaxChatContext = createContext({} as any);

export default function MaxChatProvider({ children }: { children: ReactNode }) {
  const [showMenu, setShowMenu] = useState(true);
  const [currentSession, setCurrentSession] = useState('');
  const [currentHistory, setCurrentHistory] = useState([]);
  const [currentMessageList, setCurrentMessageList] = useState([]);
  const [currentChatType, setCurrentChatType] = useState(1);

  return (
    <MaxChatContext.Provider
      value={{
        showMenu,
        setShowMenu,
        currentSession,
        setCurrentSession,
        currentHistory,
        setCurrentHistory,
        currentMessageList,
        setCurrentMessageList,
        currentChatType,
        setCurrentChatType,
      }}
    >
      {children}
    </MaxChatContext.Provider>
  );
}

export const useMaxChatContext = () => useContext(MaxChatContext);
