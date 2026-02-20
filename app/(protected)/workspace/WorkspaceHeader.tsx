"use client";
import { useState } from "react";
import WorkspaceAdd from "./WorkspaceAdd";

export default function WorkspaceHeader() {
  const [showInvite, setShowInvite] = useState(false);
  return (
    <header className="mb-6 flex justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Workspace</h1>
        <p className="text-sm text-gray-600">
          Manage your team and workspace settings.
        </p>
      </div>
      <div>
        <WorkspaceAdd setShowInvite={setShowInvite} showInvite={showInvite} />
      </div>
    </header>
  );
}
