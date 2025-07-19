"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { WorkContext } from "@/context/WorkProvider";
import { usePersistedUser } from "./usePersistedUser";
import { useScrollNavbar } from "./useScrollNavbar";

export function useAppContextState() {
  const router = useRouter();
  const workContext = useContext(WorkContext);

  const [theme, setTheme] = useState<"light" | "dark" | string>("");
  const [lang, setLang] = useState("EN");

  const [showSidebar, setShowSidebar] = useState(false);
  const [mainSidebar, setMainSidebar] = useState(false);
  const [adminSidebar, setAdminSidebar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const [showNewsForm, setNewsForm] = useState(false);
  const [showJobForm, setJobForm] = useState(false);
  const [showMainJobForm, setMainJobForm] = useState(false);

  const toggleSideBar = () => setShowSidebar((prev) => !prev);

  const removeAllDisplay = () => {
    if (showSidebar) setShowSidebar(false);
    workContext?.handleRenderDetails();
  };

  const { showMainNavbar } = useScrollNavbar(removeAllDisplay);
  const [showAdminNavbar] = useState(false); // still static

  const { adminUser, setAdminUser, mainUser, setMainUser } = usePersistedUser();

  return useMemo(() => ({
    theme, setTheme,
    lang, setLang,
    showSidebar, setShowSidebar,
    toggleSideBar,
    removeAllDisplay,
    showNavbar,
    router,
    mainSidebar, setMainSidebar,
    adminSidebar, setAdminSidebar,
    showMainNavbar,
    showAdminNavbar,
    showNewsForm, setNewsForm,
    showJobForm, setJobForm,
    showMainJobForm, setMainJobForm,
    adminUser, setAdminUser,
    mainUser, setMainUser,
  }), [
    theme, lang, showSidebar, showNavbar, router,
    mainSidebar, adminSidebar, showMainNavbar, showAdminNavbar,
    showNewsForm, showJobForm, showMainJobForm,
    adminUser, mainUser
  ]);
}
