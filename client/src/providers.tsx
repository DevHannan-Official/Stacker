"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/useQuery";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./components/utils/authcheck";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCheck>{children}</AuthCheck>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </QueryClientProvider>
  );
}
