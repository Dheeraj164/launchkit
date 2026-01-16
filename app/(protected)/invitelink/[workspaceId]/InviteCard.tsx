"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function InviteCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="mt-6 text-center text-2xl font-semibold text-gray-900">
          Invitation accepted
        </h1>

        {/* Description */}
        <p className="mt-2 text-center text-sm text-gray-600">
          You’ve successfully joined the workspace.
        </p>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 transition">
            Go to dashboard
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-center text-xs text-gray-400">
          You can now start collaborating with your team.
        </p>
      </div>
    </div>
  );
}
