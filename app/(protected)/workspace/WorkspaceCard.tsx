/* eslint-disable @typescript-eslint/no-explicit-any */
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
        id: any;
        name: any;
        plan: any;
        created_at: any;
        owner: {
          firstname: any;
          lastname: any;
        };
        members: {
          firstname: any;
          lastname: any;
          role: any;
        }[];
      }[]
    | undefined;
}) {
  //   {
  //   workspace,
  // }: {
  //   workspace: WorkspaceData[];
  // }
  const { setSelectedWorkspace } = useContext(AppContext);
  return (
    <section className="grid grid-cols-3 ">
      {workspace ? (
        workspace.map((w, i) => {
          return (
            <div key={i} onClick={() => setSelectedWorkspace(w)}>
              <WorkspaceTile
                workspace={w}
                // setShowInvite={setShowInvite}
              />
            </div>
          );
        })
      ) : (
        <div>No Workspace to Display</div>
      )}
    </section>
  );
}
