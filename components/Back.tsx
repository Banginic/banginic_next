import { Link } from "react-router-dom";

interface Props {
  link: string;
  name: string;
}

function Back({ link, name }: Props) {
  return (
    <div className=" absolute left-0 bottom-2">
      <Link to={link}>
        <p className="flex text-sm gap-1 mx-2 hover:bg-slate-200 dark:hover:bg-slate-800 px-5 py-4
         bg-gray-100 dark:bg-gray-900/60 w-24 rounded-md h-6 lg:gap-1 items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            className="size-4 fill-gray-500"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
          <span className="text-black">{name}</span>
        </p>
      </Link>
    </div>
  );
}

export default Back;
