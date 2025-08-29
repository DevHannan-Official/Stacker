"use client";
import Button from "@/components/shared/button";
import { logoutUser } from "@/lib/fetchApi";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const WebPage = () => {
  const router = useRouter();
  const { user, logout, setFetching } = useAuthStore();
  const { mutate: logoutFunc, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      logout();
      if (res.data.user.verified) {
        setFetching(false);
        toast.success("Logged out successfully");
        router.replace("/");
      } else {
        router.replace("/verify");
        setFetching(false);
      }
    },
    onError: () => {
      setFetching(false);
    },
  });
  return (
    <div>
      <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
        <Image
          src={user?.avatar.oAuthAvatar || "/images/logo.png"}
          alt="Stacker"
          width={0}
          height={0}
          sizes="100%"
          className="size-full rounded-full overflow-hidden bg-contain bg-center"
        />
      </div>
      <div>
        <h2>{user?.displayName}</h2>
        <h3>
          @{user?.username} ({user?.verified ? "Verified" : "Not Verified"})
        </h3>
        <p>{user?.email}</p>
      </div>
      <Button onClick={() => logoutFunc()} disabled={isPending}>
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default WebPage;
