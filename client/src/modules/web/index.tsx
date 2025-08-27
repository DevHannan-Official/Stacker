"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";

const WebPage = () => {
  const { user } = useAuthStore();
  return <div>Hey, {user?.displayName}</div>;
};

export default WebPage;
