"use client";

import WorkspaceTile from "@/component/WorkspaceTile";
import { AppContext } from "@/context/AppContext";
// import { WorkspaceData } from "@/utils/intefaces_types";
import React, { useContext } from "react";

export default function WorkspaceCard({
  workspace,
}: {
  workspace:
    | {
        id: string;
        name: string;
        plan: string;
        created_at: string;
        owner: {
          firstname: string;
          lastname: string;
        };
        members: {
          firstname: string;
          lastname: string;
          role: string;
          invitationStatus: string;
        }[];
      }[]
    | undefined;
}) {
  const { setSelectedWorkspace } = useContext(AppContext);
  return (
    <section className="grid grid-cols-3 ">
      {workspace ? (
        workspace.map((w, i) => {
          return (
            <div key={i} onClick={() => setSelectedWorkspace(w)}>
              <WorkspaceTile workspace={w} />
            </div>
          );
        })
      ) : (
        <div>No Workspace to Display</div>
      )}
    </section>
  );
}
