import { person } from "../../assets/assets";

function AboutUSkeleton() {
  return (
    <div className="
    // flex flex-col lg:flex-row 
     my-12 mx-auto animate-pulse">
      {/* <div className="lg:w-1/2 p-4 lg:p-8 border border-gray-200  dark:bg-black dark:border-gray-800 bg-white rounded-xl">
        <h2 className=" mb-2 h-8 w-40 dark:bg-gray-800"></h2>
        <p className=" text-gray-500 text-start text-sm bg-gray-800 h-34"></p>
        <div className={` mx-auto mt-8`}>
          <h3 className=" h-8 w-40 bg-gray-300 dark:bg-gray-800 mb-2"></h3>
          <p className="  bg-gray-800 h-34"></p>
        </div>
        <div className={` mx-auto mt-4`}>
          <h3 className=" h-8 w-40 bg-gray-300 dark:bg-gray-800 mb-2"></h3>
          <ul className="  bg-gray-800 h-34"></ul>
        </div>
      </div> */}
      <article
        className="w-sm md:w-md h-[500px] shadow-lg hover:shadow-xl trans bg-black dark:border border-gray-800  lg:w-sm min-h-92
            mx-auto rounded-xl p-4 text-center "
      >
        <img
          className="size-52 -translate-y-10 bg-red-950 dark:opacity-60 rounded-full mx-auto"
          src={person}
          alt={`photo`}
        />
        <div className="-translate-y-10">
          <p className="text-lg font-bold mt-4  mb-2 h-6 w-40 mx-auto bg-gray-800 "></p>
          <p className=" mano text-gray-600 dark:text-gray-400 h-6 w-60 mx-auto bg-gray-800 "></p>
          <p className="h-6 w-40 mx-auto dark:bg-gray-800 mt-2"></p>
          <p className="mt-2 overflow-hidden rounded h-23 w-70 mx-auto bg-gray-800 "></p>
        </div>
        <div className="flex justify-center gap-2">
          <p className="size-8 rounded-lg  dark:bg-gray-800 "></p>
          <p className="size-8 rounded-lg  dark:bg-gray-800 "></p>
          <p className="size-8 rounded-lg  dark:bg-gray-800 "></p>
        </div>
      </article>
    </div>
  );
}

export default AboutUSkeleton;
