"use client";

import Loading from "@/components/shared/loading";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const VerifyLayout = ({ children }: { children: React.ReactNode }) => {
  const { isFetching, isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && isLoggedIn && user?.verified) {
      <Loading />;
      router.replace("/web");
    }
  }, [isFetching, isLoggedIn, user, router]);

  // Conditional rendering of the Loading component
  if (isFetching) {
    return <Loading />;
  }

  // If not fetching, render the child components
  return <>{children}</>;
};

export default VerifyLayout;
