import { createContext, useContext, useState, FC, ReactNode } from 'react';

type Tab = 'all' | 'active' | 'completed';

interface ContextProviderProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextProviderProps | undefined>(undefined);

export const ContextProvider: FC<ProviderProps> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<Tab>('all');

  return (
    <Context.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </Context.Provider>
  );
};

export const useTab = (): ContextProviderProps => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useTab must be used within a ContextProvider');
  }
  return context;
};
