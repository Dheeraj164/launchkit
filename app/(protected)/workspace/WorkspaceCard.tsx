"use client";

import WorkspaceTile from "@/app/(protected)/workspace/WorkspaceTile";
import { AppContext } from "@/context/AppContext";
// import { WorkspaceData } from "@/utils/intefaces_types";
import { useContext, useEffect, useState } from "react";
import WorkspaceAdd from "./WorkspaceAdd";
import { addWorkspace } from "@/app/actions/addWorkspace";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    name: string;
    plan: string;
    created_at: string;
    owner: {
      id: string;
      firstname: string;
      lastname: string;
    };
    members: {
      id: string;
      firstname: string;
      lastname: string;
      role: string;
      invitationStatus: string;
    }[];
  }[];
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const [workspaces, setWorkspaces] = useState(workspace);
  const { setSelectedWorkspace, user } = useContext(AppContext);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    setWorkspaces(workspace);
  }, [workspace]);

  async function addWorkspacetoUi({ formData }: { formData: FormData }) {
    const { data, error } = await addWorkspace(formData);
    // inseting the new workspace to the workspace array
    if (error || !data) {
      return;
    }

    setWorkspaces((prev) => [
      ...prev,
      {
        id: data?.id,
        name: formData.get("workspaceName") as string,
        plan: "free",
        created_at: new Date().toISOString(),
        owner: {
          id: user!.id,
          firstname: user!.firstname,
          lastname: user!.lastname,
        }, // from context
        members: [
          {
            id: user!.id,
            firstname: user!.firstname,
            lastname: user!.lastname,
            role: "owner",
            invitationStatus: "Accepted",
          },
        ],
      },
    ]);
  }

  return (
    <section>
      <div className=" justify-end flex ">
        <WorkspaceAdd
          setShowInvite={setShowInvite}
          showInvite={showInvite}
          addWorkspacetoUi={addWorkspacetoUi}
        />
      </div>

      <div className="grid grid-cols-3">
        {workspaces?.length ? (
          workspaces.map((w) => (
            <div key={w.id} onClick={() => setSelectedWorkspace(w)}>
              <WorkspaceTile
                workspace={w}
                onDelete={(id) =>
                  setWorkspaces((prev) => prev!.filter((ws) => ws.id !== id))
                }
              />
            </div>
          ))
        ) : (
          <div>No Workspace to Display</div>
        )}
      </div>
    </section>
  );
}
