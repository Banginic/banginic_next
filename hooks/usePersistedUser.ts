"use client";
import { useState } from "react";
import { AdminType, UserType } from "@/models/types";

export function usePersistedUser() {
  const [adminUser, setAdminUser] = useState<AdminType>(() => {
    const stored = localStorage.getItem("admin-user");
    return stored ? JSON.parse(stored) : null;
  });

  const [mainUser, setMainUser] = useState<UserType>(() => {
    const stored = localStorage.getItem("main-user");
    return stored ? JSON.parse(stored) : null;
  });

  return { adminUser, setAdminUser, mainUser, setMainUser };
}
