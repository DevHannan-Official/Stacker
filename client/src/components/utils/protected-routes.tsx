// src/components/ProtectRoute.tsx
"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../shared/loading";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isFetching, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && !isLoggedIn) {
      <Loading />;
      router.replace("/");
    }

    if (!isFetching && isLoggedIn && !user?.verified) {
      <Loading />;
      router.replace("/verify");
      return;
    }
  }, [isFetching, isLoggedIn, router, user]);

  if (isFetching || !isLoggedIn) {
    return <Loading />;
  }

  return <>{children}</>;
};

const ProtectAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isFetching, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isFetching && isLoggedIn) {
      if (user?.verified) {
        <Loading />;
        router.replace("/web");
        return;
      } else {
        <Loading />;
        router.replace("/verify");
        return;
      }
    }
  }, [isFetching, isLoggedIn, router, user]);

  if (isFetching || isLoggedIn) {
    return <Loading />;
  }

  return <>{children}</>;
};

export { ProtectRoute, ProtectAuthRoute };
