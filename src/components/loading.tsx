import { Loader } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex item-center justify-center gap-2 bg-accent px-2 py-1 rounded-md">
        <Loader className="animate-spin" />
        <span>Loading ...</span>
      </div>
    </div>
  );
}
