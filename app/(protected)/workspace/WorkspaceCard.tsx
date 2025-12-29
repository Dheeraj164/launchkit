"use client";

import WorkspaceTile from "@/component/WorkspaceTile";
import { AppContext } from "@/context/AppContext";
import React, { useContext } from "react";

export default function WorkspaceCard() {
  const { setSelectedWorkspace, workspace } = useContext(AppContext);
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
