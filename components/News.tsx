import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-toastify";

type News = {
  subject: string;
  body: string;
};
function News() {
  const [news, setNews] = useState<News | null>(null);
  const [error, setError] = useState("");

  const appContext = useContext(AppContext);
  if (error) {
    toast.warning(error);
  }
  useEffect(() => {
    async function fetchNews() { 
      try {
        const { data } = await axios.get(
          appContext?.baseUrl + "/api/v2/news/list"
        );

        if (!data.success) {
          return setError(data.message);
        }
        return setNews(data.news[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Unknown error", error);
        }
      }
    }
    const timer = setTimeout(fetchNews, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {news && (
        <article className="borde py-2 text-center p-2 text-sm bg-gradient-to-b dark:from-gray-800 text-accent  flex justify-center gap-4 items-center border-l-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-yellow-500 news-icon"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
          <h6 className="opacity-80 sr-only">{news?.subject.toUpperCase()}</h6>
          <p>{news?.body}</p>
        </article>
      )}
    </div>
  );
}

export default News;
