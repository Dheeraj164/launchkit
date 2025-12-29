"use client";

import WorkspaceMember from "@/app/(protected)/workspace/WorkspaceMember";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

export default function MembersList() {
  const { selectedWorkspace } = useContext(AppContext);
  return (
    <section className="mt-6 rounded-lg bg-white p-4 shadow border border-gray-100">
      <h3 className="text-sm font-medium mb-3">Members</h3>
      {selectedWorkspace && (
        <div>
          <WorkspaceMember members={selectedWorkspace.workspace_members} />
        </div>
      )}
    </section>
  );
}
