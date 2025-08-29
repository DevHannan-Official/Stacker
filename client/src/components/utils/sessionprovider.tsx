"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { user, isFetching } = useAuthStore();

  // Redirect logic must happen inside a Client Component.
  // Use a useEffect to ensure it only runs in the browser.
  useEffect(() => {
    if (!isFetching && user !== null && user !== undefined) {
      return redirect("/web");
    }
  }, [user, isFetching]);

  return <>{children}</>;
}
