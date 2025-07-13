
import { placeholdeImage } from "../../assets/assets";

function RecentProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-12 justify-self-center-safe 2xl:gap-24 px-4">

      {Array.from("124").map((number) => (
        <article
        key={number}
         className="animate-pulse rounded-lg w-[360px] md:w-sm lg:w-[360px] 2xl:w-[400px] group overflow-hidden my-8">
          <img
            src={placeholdeImage}
            className="w-full h-60 xl:h-52 2xl:h-60 border-none outline-none bg-gray-20 opacity-30 trans"
            alt=""
          />
          <div className="p-4  bg-gray-900/50">
            <h2 className="font-bold text-xl mt-4 mb-2 h-6 rounded  bg-gray-800"></h2>
            <p className="text-gray-500 h-14  bg-gray-800"></p>
            <button
              title="View Project"
              className="my-4 text-bold   px-5 text-sm h-6 w-18 bg-gray-800 rounded-full py-1.5 flex items-center gap-2 cursor-pointer trans hover:bg-black hover:text-white"
            >
              {" "}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default RecentProjectSkeleton;
