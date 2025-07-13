import CareerSkeleton from "../skeletons/CareerSkeleton";
import { Link } from "react-router-dom";
import fetchData from "../../libs/fetchData";
import { useQuery } from "@tanstack/react-query";

interface Jobs {
  _id: string;
  title: string;
  location: string;
  description: string;
  latestDate: string;
  postedDate: string;
}
interface JobProps {
  success: boolean;
  message: string;
  jobs: Jobs[] | [];
}

function Careers() {
  const fetchDetails = {
    method: "get",
    endpoint: "/api/v2/jobs/list",
  };
  function returnFn() {
    return fetchData(fetchDetails);
  }
  const { isLoading, isError, data, refetch } = useQuery<JobProps>({
    queryKey: ["Jobs"],
    queryFn: returnFn,
  });



  if (isLoading) {
    return <CareerSkeleton />;
  }
  if (isError) {
    return (
      <div className="h-screen grid place-items-center ">
        <div>
          <h3 className="heading3 text-center">Error fetching Jobs</h3>
          <p className="text-center text-gray-500">
            <a href="#footer" className="text-indigo-700 underline font-bold">
              Subscribe
            </a>{" "}
            to our news letter to recieve information of latest openings
          </p>
          <button
            className="py-2 px-6 mx-auto flex mt-4 border rounded-lg cursor-pointer"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (data && data?.jobs?.length < 1) {
    return (
      <div className="h-screen grid place-items-center">
        <div>
          <h3 className="heading3 text-center">No Available Job</h3>
          <p className="text-center text-gray-500">
            <a href="#footer" className="text-indigo-700 underline font-bold">
              Subscribe
            </a>{" "}
            to our news letter to recieve information of latest openings
          </p>
          <p></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <h1 className="heading3 mano text-center">AVAILABLE JOBS</h1>
      <div className="border border-gray-200  dark:border-gray-800 bg-black shadow-lg lg:w-2xl mt-8 mx-auto rounded-sm p-4 ">
        {data &&
          data.jobs.map((job) => (
            <Link key={job._id} to={`/careers/${job._id}`}>
              <article
                title={`View Job ID ${job._id}`}
                className="flex justify-around md:grid-cols-4 mx-auto  text-sm  bg-gray-800 backdrop:blur-sm border border-gray-400/10  my-2 hover:bg-white/20 px-4 py-2 rounded-sm trans cursor-pointer"
              >
                <div className="mb-2 sr-only">
                  <h3 className="text-gray-500">Job ID</h3>
                  <p>{job._id}</p>
                </div>
                <div className="mb-2 flex-1">
                  <h3 className="text-pink-100/70">Job Title</h3>
                  <p>{job.title}</p>
                </div>
                <div className="mb-2 flex-1">
                  <h3 className="text-pink-100/70">Location</h3>
                  <p>{job.location}</p>
                </div>
                <div className="mb-2">
                  <h3 className="text-pink-100/70">Posted Date</h3>
                  <p className="text-green-300">
                    {new Date(job.postedDate).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </article>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Careers;
