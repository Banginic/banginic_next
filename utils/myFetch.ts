import axios from "axios";
import { toast } from "react-toastify";

// (method, endpoint, body=null, id=null )
interface Props {
  method: string;
  id: string;
  endpoint: string;
  body: object;
}
async function myFetch(props: Props) {
  const { method, endpoint, body = "", id = "" } = props;
  const baseUrl = "";
  try {
    // create an item
    if (method === "post" && body) {
      console.log("post method Called..");
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    }
    // Get single item
    else if (method === "get" && id.length > 1) {
      const { data } = await axios.get(baseUrl + endpoint + `/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
        },
      });
      return data;
    }

    // Delete single item
    else if (method === "delete" && id) {
      const { data } = await axios.delete(baseUrl + endpoint + `/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
        },
      });
      return data;
    }

    // Get all items
    else if (method === "get" && !id) {
      const { data } = await axios.get(baseUrl + endpoint, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Admin-token")}`,
        },
      });
      return data;
    }
  } catch (ex) {
    if (ex instanceof Error) {
      console.log(ex);

      toast.error(ex.message);
      return toast.warning(ex.message);
    }
    localStorage.clear();
  }
}

export default myFetch;
