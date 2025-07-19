"use client";
import { createContext } from "react";
import { AppContextType } from "@/models/appContext"; // move interface there
import { useAppContextState } from "@/hooks/useAppContextState";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: React.ReactNode }) {
console.log('renderd once')
  const values = useAppContextState();
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
