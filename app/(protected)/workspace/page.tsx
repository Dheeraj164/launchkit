// // Notes:
// // - This file includes two pages: default export `DashboardPage` and named export `WorkspacePage`.
// // - Move `WorkspacePage` to its own file if you prefer `export default` per route file conventions.
// // - Replace alerts and placeholders with real API calls to your backend (Supabase/Flask) and wire invites, creation, and deletion.

"use client";

import { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";
// import Image from "next/image";
import Invite from "@/component/Invite";
import Loading from "@/component/Loading";
import WorkspaceTile from "@/component/WorkspaceTile";
import WorkspaceMember from "@/component/WorkspaceMember";

export interface WorkspaceData {
  id: string;
  name: string;
  owner: string;
  plan: "free" | "pro";
  created_at: Date;
  userinfo: {
    firstname: string;
    lastname: string;
  };
  workspace_members: {
    role: "owner" | "member";
    userinfo: {
      firstname: string;
      lastname: string;
    };
  }[];
}

export interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: string;
  created_at: string;
}
export interface selectedWorkspaceMembers {
  role: string;
  userinfo: {
    firstname: string;
    lastname: string;
  };
}

export default function WorkspacePage() {
  const [workspace, setWorkspace] = useState<WorkspaceData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  // const [workspaceMember, setWorkspaceMember] = useState<
  //   WorkspaceMember[] | null
  // >(null);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<WorkspaceData | null>(null);

  // const settingSelectedWorkspace = (id: string) => {
  //   setSelectedWorkspace(() => workspace.map((member) => member.id === id));
  // };

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const res = await fetch("/api/workspace");
        const json = await res.json();
        setWorkspace(json.workspaces);
        setSelectedWorkspace(json.workspace);
        setLoading(false);
      } catch (e) {
        alert(e);
      }
    }
    loadWorkspace();
  }, []);

  if (loading) return <Loading />;
  if (!workspace) return <div className="p-10">Failed to load workspace</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-screen-2xl px-4 pt-20 pb-12">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Workspace</h1>
          <p className="text-sm text-gray-600">
            Manage your team and workspace settings.
          </p>
        </div>

        {/* WORKSPACE CARD */}
        <div className="grid grid-cols-3 ">
          {workspace.map((w, i) => {
            return (
              <div key={i} onClick={() => setSelectedWorkspace(w)}>
                <WorkspaceTile
                  workspace={w}
                  // setShowInvite={setShowInvite}
                />
              </div>
            );
          })}
        </div>

        {/* MEMBERS LIST (STATIC FOR NOW) */}
        <div className="mt-6 rounded-lg bg-white p-4 shadow border border-gray-100">
          <h3 className="text-sm font-medium mb-3">Members</h3>
          {selectedWorkspace && (
            <div>
              <WorkspaceMember members={selectedWorkspace.workspace_members} />
            </div>
          )}
        </div>

        {showInvite && <Invite setShowInvite={setShowInvite} />}
      </main>
    </div>
  );
}
