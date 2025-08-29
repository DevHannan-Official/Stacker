import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <Loader className="animate-spin text-slack-purple" size={40} />
    </div>
  );
};

export default Loading;
