import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import type { FormEvent } from "react";

function NewsletterForm() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isLoading, setLoading] = useState(false);
  const [newSignee, setNewSignee] = useState({
    fullName: "",
    email: "",
    checkbox: false,
  });

  function clearForm() {
    setNewSignee({
      fullName: "",
      email: "",
      checkbox: false,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event?.preventDefault();
    setLoading(true);
    const body = { emailAddress: newSignee.email };
    try {
      const { data } = await axios.post(
        baseUrl + "/api/v2/newsletters-subscription/create",
        body
      );

      if (!data.success) {
        return toast.warning(data.message);
      }
      return toast.success(data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      clearForm();
      setLoading(false);
    }
  }
  const disabled = newSignee.email === "" || !newSignee.checkbox;
  return (
    <form
      onSubmit={handleSubmit}
      className="text- bg-black/50 border-gray-600 border shadow-md  mt-2 p-5 rounded-lg"
    >
      <div className="mb-5 w-full mx-auto items-center gap-3 flex">
        <label htmlFor="email" className="opacity-60 ">
          Email:
        </label>
        <input
          type="email"
          className="lg:ml-3 w-full border bg-transparent border-gray-500 py-3 rounded-lg px-3"
          value={newSignee.email}
          required
          autoComplete="email"
          minLength={8}
          maxLength={25}
          onChange={(event) =>
            setNewSignee({ ...newSignee, email: event.target.value })
          }
          id="email"
          placeholder="example@email.com"
        />
      </div>

      <div className="mb-5 w-full mx-auto flex">
        <input
          type="checkbox"
          id="checkbox"
          checked={newSignee.checkbox}
          className="mr-2  cursor-pointer placeholder:text-pink-200 text-white"
          onChange={() =>
            setNewSignee({ ...newSignee, checkbox: !newSignee.checkbox })
          }
        />
        <label
          htmlFor="checkbox"
          className="opacity-80 text-sm cursor-pointer text-gray-500"
        >
          I agree to the terms and conditions
        </label>
      </div>
      <button
        disabled={disabled}
        type="submit"
        className={`btn py-3  px-6 rounded-lg disabled:bg-gray-400 bg-black dark:bg-accent text-pink-100  w-29 hover:opacity-80 trans `}
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}

export default NewsletterForm;
