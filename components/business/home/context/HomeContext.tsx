import React, { createContext, useContext, useState } from "react";

type HomeContext = {
  refreshCount: number;
  setRefreshCount: (value: number | ((prev: number) => number)) => void;
};

type HomeProvider = {
  children: React.ReactNode;
};

const HomeContext = createContext<HomeContext | null>(null);

export default function HomeProvider({ children }: HomeProvider) {
  const [refreshCount, setRefreshCount] = useState(0);

  return (
    <HomeContext.Provider value={{ refreshCount, setRefreshCount }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeRefresh = () => {
  const ctx = useContext(HomeContext);
  if (!ctx) {
    throw new Error("useHomeRefresh must be used within RefreshProvider");
  }
  return ctx;
};
