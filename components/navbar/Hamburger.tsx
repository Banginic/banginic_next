import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

function Hamburger() {
  const appContext = useContext(AppContext);
  return (
    <span
      className="clickEvent material-symbols-outlined hover:bg-black/20 rounded backdrop:blur-sm text-4xl hover:cursor-pointer hover:opacity-80"
      onClick={appContext?.toggleSideBar}
    >
      <div
        title="Toggle side bar"
        className={` h-8  trans grid place-items-center`}
      >
        {!appContext?.showSidebar ? (
          <svg
            width="50px"
            className={`size-8  stroke-white dark:stroke-white w-14`}
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M4 8H20M4 16H12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="50px"
            height="50px"
            className={`size-6 stroke-white dark:stroke-white  w-14`}
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Menu / Close_LG">
              <path
                id="Vector"
                d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        )}
      </div>
    </span>
  );
}

export default Hamburger;
