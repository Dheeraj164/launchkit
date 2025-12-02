"use client";

import React, { useContext, useState } from "react";
import { User } from "@/model/User";
import { createContext } from "react";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function AppCtx() {
  return useContext(AppContext);
}
