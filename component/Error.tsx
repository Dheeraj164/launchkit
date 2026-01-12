"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function ErrorComponent({ error }: { error: string }) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <Icon
            icon="mdi:alert-circle-outline"
            className="text-red-500"
            width={48}
            height={48}
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600">
          We couldn&apos;t load your dashboard. This is usually temporary.
          Please try again.
        </p>

        {/* Actions */}
        {/* <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Try again
          </button>

          <a
            href="/"
            className="px-4 py-2 rounded-md border text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Go home
          </a>
        </div> */}

        {/* Debug (only visible in dev) */}
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-4 text-xs text-left bg-gray-100 p-2 rounded overflow-auto text-red-600">
            {error}
          </pre>
        )}
      </div>
    </div>
  );
}
