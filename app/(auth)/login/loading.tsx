import { Spinner } from "@heroui/react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white shadow-xl border border-gray-100">
        <Spinner
          //   label="Authenticating..."
          //   labelColor="primary"
          size="lg"
        />
        <p className="text-sm text-gray-500 animate-pulse">
          Setting up your workspace...
        </p>
      </div>
    </div>
  );
}
