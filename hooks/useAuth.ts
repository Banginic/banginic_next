"use client";

import { AppContext } from "@/context/AppProvider";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { verifyToken } from "@/lib/jwt";
import { useRouter } from "next/navigation";

interface Options {
  redirectTo?: string;
  redirectIfFound?: boolean;
}
export function useAuth({
  redirectTo = "",
  redirectIfFound = false,
}: Options = {}) {
  const [cookies] = useCookies(["token"]);
  const { mainUser, setMainUser } = useContext(AppContext)!;
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = cookies.token;
    async function checkToken() {
      const decoded = await verifyToken(token);
      if (!decoded) {
        setMainUser(null);
        if (redirectTo && !redirectIfFound) {
          router.push(redirectTo);
        }
      } else {
        setMainUser({ id: 1, name: "New User", email: "newuser@email.com" });
        if (redirectIfFound && redirectTo) {
          router.push(redirectTo);
        }
      }
      setLoading(false);
    }
    checkToken();
  }, [cookies, redirectTo, redirectIfFound, router]);
  return { mainUser, isLoading };
}
