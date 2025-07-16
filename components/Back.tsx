import Link from "next/link";

interface Props {
  link: string;
  name: string;
}

function Back({ link, name }: Props) {
  return (
    <Link href={link}>
      <button
        className="flex text-sm gap-1 mx-2 hover:bg-slate-200/20 px-5 py-4
         bg-gray-100/20  rounded-md h-6 lg:gap-1 items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          className="size-4 fill-pink-100"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        <span className="text-pink-100 hidden lg:inline">{name}</span>
      </button>
    </Link>
  );
}

export default Back;
