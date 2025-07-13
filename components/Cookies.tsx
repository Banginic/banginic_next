import { useEffect, useState } from "react";

function Cookies() {
  const [displayNotice, setDisplayNotice] = useState(false);

  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem("firstVisitToken");
      if (!token) {
        setDisplayNotice(true);
      }
    }
    const time = setTimeout(checkToken, 1000 * 25);
    return () => clearTimeout(time);
  }, []);
  function acceptCookie() {
    localStorage.setItem("firstVisitToken", "My first visit.");
    setDisplayNotice(false);
  }
  function declineCookie() {
    localStorage.clear();
    setDisplayNotice(false);
  }
  return (
    <section className="fixed bottom-4 -translate-x-1/2 left-1/2 z-50">
      {displayNotice && (
        <div className="w-sm lg:w-xl bg-white  dark:bg-black p-4 rounded text-sm mx-auto">
          <p className="mb-2 text-gray-600 dark:text-gray-500">
            Our website uses cookies to make you have the best and smooth user
            experience on our website.
          </p>
          <button
            title="Accept cookies"
            onClick={acceptCookie}
            className="bg-black border dark:border-accent dark:text-accent text-white px-6 py-1 rounded my-2 cursor-pointer hover:bg-black/90"
          >
            I'm okay with that
          </button>
          <button
            title="Reject cookies"
            onClick={declineCookie}
            className="ml-2 px-6 py-1 text-black border rounded text-sm cursor-pointer"
          >
            No! Thank you
          </button>
        </div>
      )}
    </section>
  );
}

export default Cookies;
