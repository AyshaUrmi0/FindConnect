import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 bg-gray-100">
      <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
    </div>
  );
};

export default Loading;
