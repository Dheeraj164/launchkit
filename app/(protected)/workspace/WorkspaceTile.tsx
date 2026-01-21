"use client";

import { deleteWorkspaceId } from "@/app/actions/deleteWorkspaceid";
import { AppContext } from "@/context/AppContext";
import { WorkspaceData } from "@/utils/intefaces_types";
import { Button } from "@heroui/react";
import { Activity, useContext } from "react";

interface WorkspaceTileProps {
  workspace: WorkspaceData;
  onDelete: (id: string) => void;
}

export default function WorkspaceTile({
  workspace,
  onDelete,
}: WorkspaceTileProps) {
  const { user } = useContext(AppContext);
  return (
    <div className="rounded-lg bg-white p-4 shadow border border-gray-100 m-2">
      <div className="flex items-center justify-between ">
        <div>
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <p className="text-sm text-gray-500">
            Plan: {workspace.plan.toUpperCase()}
          </p>
        </div>
        <div>
          <Activity
            mode={user?.id === workspace.owner.id ? "visible" : "hidden"}>
            <Button
              onClick={() => {
                deleteWorkspaceId({ workspace_id: workspace.id });
                onDelete(workspace.id);
              }}
              variant="danger">
              Delete Workspace
            </Button>
          </Activity>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Owner</div>
          <div className="mt-2 text-md font-semibold">
            {workspace.owner.firstname} {workspace.owner.lastname}
          </div>
        </div>

        <div className="rounded-md border p-3">
          <div className="text-xs text-gray-500">Plan</div>
          <div className="mt-2 text-md font-semibold">
            {workspace.plan.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
