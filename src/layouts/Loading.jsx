import React from "react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 animate-pulse">
          Loading FindConnect...
        </p>
      </div>
    </div>
  );
};

export default Loading;
