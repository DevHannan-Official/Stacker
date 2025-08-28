// src/components/AuthCheck.tsx
"use client";

import { checkAuth } from "@/lib/fetchApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { setUser, logout, user } = useAuthStore();
  const router = useRouter();
  const { mutate: authorizeUser, isPending } = useMutation({
    mutationFn: checkAuth,
    onSuccess: (res) => {
      setUser(res.data.user);
      if (res.data.user.verified) {
        router.replace("/web");
      } else {
        router.replace("/verify");
      }
    },
    onError: () => {
      logout();
      router.replace("/sign-in");
    },
  });

  // Use an empty dependency array to run only on initial mount.
  useEffect(() => {
    authorizeUser();
  }, []);

  if (isPending) {
    return (
      <div className="w-full h-svh flex items-center justify-center">
        <Loader className="animate-spin text-slack-purple" size={40} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
