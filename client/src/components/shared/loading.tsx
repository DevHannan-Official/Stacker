import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <Loader className="animate-spin text-slack-purple" size={40} />
    </div>
  );
};

export default Loading;
