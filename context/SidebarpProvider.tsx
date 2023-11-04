'use client';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type SidebarProps = {
  expandSidebar: boolean;
  setExpandSidebar: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext({} as SidebarProps);

export default function SideBarProvider({ children }: { children: ReactNode }) {
  const [expandSidebar, setExpandSidebar] = useState(true);
  return (
    <SidebarContext.Provider
      value={{
        expandSidebar,
        setExpandSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
