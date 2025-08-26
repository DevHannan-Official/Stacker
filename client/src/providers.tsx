"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/useQuery";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
