import React from "react";
import Link from "next/link";

function AdminHero() {
  return (
    <div className="grid place-items-center mt-12">
      <h1 className="text-xl lg:text-3xl text-pink-300">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-2 gap-4 pt-12">
        <Link
          href={"/admin/newsletters"}
          className="px-4 py-2 rounded grid place-content-center bg-green-400 text-green-800 hover:scale-x-105 trans cursor-pointer"
        >
          Newsletters
        </Link>
        <Link
          href={"/admin/news"}
          className="px-4 py-2 rounded grid place-content-center bg-yellow-400 text-yellow-800 hover:scale-x-105 trans cursor-pointer"
        >
          News
        </Link>

        <Link
          href={"/admin/testimonials"}
          className="px-4 py-2 rounded grid place-content-center bg-pink-400 text-pink-800 hover:scale-x-105 trans cursor-pointer"
        >
          Testimonials
        </Link>
        <Link
          href={"/admin/jobs"}
          className="px-4 py-2 rounded grid place-content-center bg-indigo-400 text-indigo-800 hover:scale-x-105 trans cursor-pointer"
        >
          Jobs
        </Link>
      </div>
      <section>
        <p className="bg-green-100/20 p-4 rounded shadow mt-12 text-green-300">Hello Admin! <br/> Your website is perfoming smoothly.</p>
      </section>
      
    </div>
  );
}

export default AdminHero;
