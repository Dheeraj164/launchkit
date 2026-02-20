"use client";

import WorkspaceTile from "@/app/(protected)/workspace/WorkspaceTile";
import { AppContext } from "@/context/AppContext";

import { useContext, useLayoutEffect } from "react";

import { Workspace } from "@/app/model/Workspace";

export default function WorkspaceCard({
  initWorkspace,
}: {
  initWorkspace: Workspace[];
}) {
  const { workspace, setWorkspace } = useContext(AppContext);

  useLayoutEffect(() => {
    setWorkspace(initWorkspace);
  }, [initWorkspace, setWorkspace]);

  return (
    <section>
      <div className="grid grid-cols-3">
        {workspace?.length ? (
          workspace.map((w) => (
            <div key={w.id}>
              <WorkspaceTile workspace={w} />
            </div>
          ))
        ) : (
          <div>No Workspace to Display</div>
        )}
      </div>
    </section>
  );
}
