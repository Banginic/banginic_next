import React from "react";
import { AdminType, UserType } from "./types";
import { useRouter } from "next/navigation";

export interface AppContextType {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSideBar(): void;
  removeAllDisplay(): void;
  theme: "light" | "dark" | string;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | string>>;
  // toggleTheme(): void;
  showNavbar: boolean;
  showSidebar: boolean;
  adminUser: AdminType;
  setAdminUser: React.Dispatch<React.SetStateAction<AdminType>>;
  mainUser: UserType;
  setMainUser: React.Dispatch<React.SetStateAction<UserType>>;
  router: ReturnType<typeof useRouter>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  mainSidebar: boolean;
  setMainSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  adminSidebar: boolean;
  setAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showMainNavbar: boolean;
  showAdminNavbar: boolean;

  showNewsForm: boolean;
  setNewsForm: React.Dispatch<React.SetStateAction<boolean>>;
  showJobForm: boolean;
  setJobForm: React.Dispatch<React.SetStateAction<boolean>>;
  showMainJobForm: boolean;
  setMainJobForm: React.Dispatch<React.SetStateAction<boolean>>;
}