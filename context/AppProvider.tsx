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

type UserType = {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
};
export interface AppContextType {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSideBar(): void;
  removeAllDisplay(): void;
  theme: "light" | "dark" | string;
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | string>>;
  // toggleTheme(): void;
  showNavbar: boolean;
  showSidebar: boolean;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

type PropsType = {
  children: React.ReactNode;
};

function AppProvider({ children }: PropsType) {
  const router = useRouter();

  const workContext = useContext(WorkContext);
  const [user, setUser] = useState<UserType | null>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const [mainSidebar, setMainSidebar] = useState(false);
  const [showMainNavbar, setMainNavbar] = useState(false);

  const [showAdminNavbar, setAdminNavbar] = useState(false);
  const [adminSidebar, setAdminSidebar] = useState(false);
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | string>("");
  const [lang, setLang] = useState("EN");

  const [showNewsForm, setNewsForm] = useState(false);
  const [showJobForm, setJobForm] = useState(false);

  function seedUser() {
    const isUserAvailable = localStorage.getItem("user");
    if (isUserAvailable) {
      setUser(JSON.parse(isUserAvailable));
    }
  }
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
      return setMainNavbar(false);
    }
    if (offSet > 500) {
      return setMainNavbar(true);
    }
  }, [toggleNavbar]);

  useEffect(() => {
    seedUser();

    return () => {};
  }, []);

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
    lang,
    setLang,
    mainSidebar,
    setMainSidebar,
    adminSidebar,
    setAdminSidebar,
    showMainNavbar,
    showAdminNavbar,
    showNewsForm, setNewsForm,
    showJobForm, setJobForm
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export default AppProvider;
