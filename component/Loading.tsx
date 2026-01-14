"use client";

import { Icon } from "@iconify/react";

export default function Loading({ page }: { page: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-8 py-10 shadow-lg">
        {/* Spinner */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <Icon
            icon="mdi:loading"
            className="animate-spin text-indigo-600"
            width={28}
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">Loading {page}</p>
          <p className="mt-1 text-sm text-gray-500">
            Please wait while we prepare your {page}
          </p>
        </div>

        {/* Progress dots */}
        <div className="mt-2 flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.2s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.1s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />
        </div>
      </div>
    </div>
  );
}
