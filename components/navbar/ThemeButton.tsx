import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import styles from "./navbar.module.css";
import { moon, placeholdeImage, sun } from "../../assets/assets";

function ThemeButton() {
  const appContext = useContext(AppContext);
  return (
    <div
      // onClick={appContext?.toggleTheme}
      className={` ${styles.theme_icon} rounded-full  md:block hover`}
      title="change theme"
      aria-label="Toggle theme"
    >
      {appContext?.theme === "dark" ? (
        <img src={sun} width={35} alt={placeholdeImage} loading="lazy" aria-label="Theme photo" />
      ) : (
        <img src={moon} width={26} alt={placeholdeImage} loading="lazy" aria-label="Theme photo"/>
      )}
    </div>
  );
}

export default ThemeButton;
