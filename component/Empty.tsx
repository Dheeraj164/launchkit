"use client";
import WorkspaceAdd from "@/app/(protected)/workspace/WorkspaceAdd";
import { useState } from "react";

export default function Empty({
  header,
  message,
  button,
}: {
  header: string;
  message: string;
  button: boolean;
}) {
  const [showInvite, setShowInvite] = useState(false);

  return (
    <>
      {/* FULLSCREEN WORKSPACE BUILDER */}
      {showInvite && (
        <WorkspaceAdd setShowInvite={setShowInvite} showInvite={showInvite} />
      )}

      {/* EMPTY STATE */}
      {!showInvite && (
        <div className="mt-10 flex min-h-screen items-center justify-center bg-linear-to-br from-black via-neutral-950 to-neutral-900 px-6">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-white/10 to-white/5 text-3xl shadow-lg">
              🚀
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {header}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {message}
            </p>

            {button && (
              <button
                onClick={() => setShowInvite(true)}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                Create Workspace
              </button>
            )}

            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-white/5 via-transparent to-transparent" />
          </div>
        </div>
      )}
    </>
  );
}
