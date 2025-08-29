import { ProtectAuthRoute } from "@/components/utils/protected-routes";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectAuthRoute>{children}</ProtectAuthRoute>;
}
