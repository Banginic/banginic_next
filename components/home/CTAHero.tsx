import { Link } from "react-router-dom";

function CTAHero() {
  return (
    <div className="flex z-50 justify-start md:items-center   gap-5 mt-3 text-[var(--primary-color)  w-full ">
      <Link to="/contact-us">
        <button
          className="text-sm font-medium flex gap-2 justify-center items-center py-3 lg:text-[17px] cursor-pointer px-6 hover:bg-accent-tone 
      rounded-lg bg-accent text-white montserrat
     "
        >
          Get in touch
        </button>
      </Link>
      <Link to="/works">
        <button
          className="text-sm flex montserrat gap-2 justify-center items-center p-3 px-6 lg:text-[17px] rounded-lg
        shadow-md trans bg-gray-950 dark:bg-gray-800/90 text-white cursor-pointer hover:bg-black/80  trans"
        >
          Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-accent"
          >
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default CTAHero;
