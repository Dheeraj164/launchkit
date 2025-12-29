"use client";
import { AppContext } from "@/context/AppContext";
import { Button } from "@heroui/react";
import React, { Activity, useContext } from "react";

export default function Invite() {
  const { showInvite, setShowInvite } = useContext(AppContext);
  return (
    <Activity mode={showInvite ? "visible" : "hidden"}>
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md rounded bg-white p-6">
          <h3 className="text-lg font-semibold">Invite member</h3>
          <p className="text-sm text-gray-500">
            Send an invite to join this workspace.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              className="flex-1 rounded border px-3 py-2"
              placeholder="email@company.com"
            />
            <Button onClick={() => alert("Invite sent")}>Send</Button>
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={() => {
                if (setShowInvite) setShowInvite(false);
              }}
              className="text-sm text-gray-500">
              Close
            </button>
          </div>
        </div>
      </section>
    </Activity>
  );
}
