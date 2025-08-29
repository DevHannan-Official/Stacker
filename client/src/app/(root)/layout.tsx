import { ProtectRoute } from "@/components/utils/protected-routes";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectRoute>{children}</ProtectRoute>;
}
