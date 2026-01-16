"use client";

import WorkspaceMember from "@/app/(protected)/workspace/WorkspaceMember";
import { AppContext } from "@/context/AppContext";
import { WorkspaceData } from "@/utils/intefaces_types";
import React, { useContext } from "react";

export default function MembersList({
  initmember,
}: {
  initmember: WorkspaceData;
}) {
  const { selectedWorkspace, setSelectedWorkspace } = useContext(AppContext);

  if (!selectedWorkspace && initmember) setSelectedWorkspace(initmember);

  return (
    <section className="mt-6 rounded-lg bg-white p-4 shadow border border-gray-100">
      <h3 className="text-sm font-medium mb-3">Members</h3>
      {selectedWorkspace ? (
        <div>
          <WorkspaceMember
            members={selectedWorkspace.members}
            invitedWorkspace={selectedWorkspace.name}
            invitedWorkspaceId={selectedWorkspace.id}
          />
        </div>
      ) : (
        <WorkspaceMember
          members={initmember.members}
          invitedWorkspace={initmember.name}
          invitedWorkspaceId={initmember.id}
        />
      )}
    </section>
  );
}
