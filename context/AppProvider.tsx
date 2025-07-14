"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { WorkContext } from "./WorkProvider";
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
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  router: ReturnType<typeof useRouter>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  mainSidebar: boolean;
  setMainSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  adminSidebar: boolean;
  setAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

type PropsType = {
  children: React.ReactNode;
};

function AppProvider({ children }: PropsType) {
  const router = useRouter();

  const workContext = useContext(WorkContext);
  const [user, setUser] = useState<string | null>(
    () => localStorage.getItem("user") || null
  );
  const [showNavbar, setShowNavbar] = useState(false);
  const [mainSidebar, setMainSidebar] = useState(false);
  const [adminSidebar, setAdminSidebar] = useState(false);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light" | string>("");
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [lang, setLang] = useState("EN");

  // const storedTheme = localStorage.getItem("theme");
  // const preferedTheme = window.matchMedia(
  //   "(prefers-color-scheme: dark)"
  // ).matches;

  // //  CHECK FOR PREFERS THEME
  // function themeFunction() {
  //   document.documentElement.classList.toggle(
  //     "dark",
  //     storedTheme === "dark" || (!storedTheme && preferedTheme)
  //   );
  // }
  // function toggleTheme() {
  //   if (storedTheme && storedTheme === "dark") {
  //     setTheme("light");
  //     localStorage.removeItem("theme");
  //     localStorage.setItem("theme", "light");
  //     document.documentElement.classList.toggle("dark");
  //   } else {
  //     setTheme("dark");
  //     localStorage.setItem("theme", "dark");
  //     document.documentElement.classList.toggle("dark");
  //   }
  // }

  // useEffect(() => {
  //   themeFunction();
  // }, []);

  // //  STORE THEME TO LOCAL STORAGE ON CHANGE
  // useEffect(() => {
  //   const currentTheme = localStorage.getItem("theme");
  //   currentTheme ? setTheme(currentTheme) : setTheme("dark");
  // }, [theme]);

  function toggleSideBar() {
    setShowSidebar(!showSidebar);
  }
  const removeAllDisplay = () => {
    if (showSidebar) {
      setShowSidebar(false);
    }
    workContext?.handleRenderDetails();
  };
  const handleScroll = useCallback(() => {
    setToggleNavbar((prev) => !prev);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const offSet = pageYOffset;
    removeAllDisplay();
    if (offSet < 5) {
      return setShowNavbar(false);
    }
    if (offSet > 500) {
      return setShowNavbar(true);
    }
  }, [toggleNavbar]);

  const values = {
    showSidebar,
    setShowSidebar,
    toggleSideBar,
    removeAllDisplay,
    theme,
    setTheme,
    // toggleTheme,
    showNavbar,
    user,
    setUser,
    router,
    token,
    setToken,
    lang,
    setLang,
    mainSidebar, setMainSidebar,
    adminSidebar, setAdminSidebar
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export default AppProvider;
