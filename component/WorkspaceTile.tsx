import { WorkspaceData } from "@/app/(protected)/workspace/page";
import { Button } from "@heroui/react";
import React from "react";

interface WorkspaceTileProps {
  workspace: WorkspaceData;
  //   setShowInvite: (value: boolean) => void;
}

export default function WorkspaceTile({
  workspace,
}: //   setShowInvite,
WorkspaceTileProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow border border-gray-100 m-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <p className="text-sm text-gray-500">
            Plan: {workspace.plan.toUpperCase()}
          </p>
        </div>

        {/* <Button onClick={() => setShowInvite(true)}>Invite member</Button> */}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Members</div>
          {/* <div className="mt-2 text-lg font-semibold">{data.teamCount}</div> */}
        </div>

        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Plan</div>
          <div className="mt-2 text-lg font-semibold">
            {workspace.plan.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
