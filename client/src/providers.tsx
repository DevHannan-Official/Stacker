"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/useQuery";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./components/utils/authcheck";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={qc}>
      <AuthCheck>{children}</AuthCheck>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </QueryClientProvider>
  );
}
