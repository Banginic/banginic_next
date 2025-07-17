'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NewsTypes } from "@/models/types";
import Link from "next/link";


function News() {
  const [news, setNews] = useState<NewsTypes | null>(null);
  const [error, setError] = useState("");


  if (error) {
    toast.warning(error);
  }
  useEffect(() => {
    async function fetchNews() { 
      try {
        const { data } = await axios.get("/api/news/list-news"
        );
        console.log(news)

        if (!data.success) {
          return setError(data.message);
        }
        return setNews(data);
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
        <article className=" py-2 text-center p-2 text-sm bg-gradient-to-b backdrop-blur-2xl from-black/80 text-accent hover:text-white tran  flex justify-center gap-4 items-center border-l-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-yellow-500 news-icon"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
          <h6 className="opacity-80 sr-only">{news.data[0].subject.toUpperCase()}</h6>
          <Link href={'/news'} className="cursor-pointer group">{news.data[0].body}</Link>
        </article>
      )}
    </div>
  );
}

export default News;
