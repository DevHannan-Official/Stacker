// src/components/AuthCheck.tsx
"use client";

import { checkAuth } from "@/lib/fetchApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../shared/loading";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { setUser, logout, setFetching, isFetching } = useAuthStore();
  const router = useRouter();
  const { mutate: authorizeUser, isPending } = useMutation({
    mutationFn: checkAuth,
    onMutate: () => setFetching(true),
    onSuccess: (res) => {
      setUser(res.data.user);
      if (res.data.user.verified) {
        setFetching(false);
      } else {
        if (window.location.pathname !== "/verify") {
          router.replace("/verify");
        }
        setFetching(false);
      }
    },
    onError: () => {
      logout();
      setFetching(false);
    },
  });

  useEffect(() => {
    authorizeUser();
  }, [authorizeUser]);

  if (isPending || isFetching) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthCheck;
