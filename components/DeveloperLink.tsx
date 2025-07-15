import Link from "next/link";

function DeveloperLink() {
  return (
    <li className="group flex cursor-pointer gap-1.5 items-center relative trans">
      <p>Developer</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#eee"
        className="-rotate-90 group-hover:rotate-90 group-hover:mt-2 trans -mt-2 size-4"
      >
        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
      </svg>
      <div className=" p-3 hidden group-hover:block font-normal w-28 text-left px-3 absolute top-6 rounded bg-black/20 backdrop:blur-sm">
        <Link href={"/learning"} className="cursor-pointer hover:opacity-70 block">
          Classes
        </Link>
        <Link
          href={"/learning-assets"}
          className=" mt-1 cursor-pointer hover:opacity-70 block"
        >
          Assets
        </Link>
        <Link
          href={"/career"}
          className=" mt-1 cursor-pointer hover:opacity-70 block"
        >
          Careers
        </Link>
      </div>
    </li>
  );
}

export default DeveloperLink;
