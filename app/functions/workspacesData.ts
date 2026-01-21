/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";
import { updateAPIUsage } from "../actions/updateApiUsage";

export async function workspacesData({
  supabase,
  userId,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
  userId: string;
}) {
  /* 2️⃣ Get workspace IDs */
  const { data: workspaceMemberData, error: memberError } = await supabase
    .from("workspace_members")
    .select("workspace_id, role")
    .eq("user_id", userId);

  if (memberError) {
    return { error: memberError.message, data: null };
  }

  if (!workspaceMemberData || workspaceMemberData.length === 0) {
    return {
      error: null,
      data: {
        workspaces: [],
        workspaceMemberData: [],
      },
    };
  }

  workspaceMemberData.forEach(async (workspace) => {
    const { error } = await updateAPIUsage({
      workspace_id: workspace.workspace_id,
    });
    if (error)
      return {
        error: error,
        workspace: null,
        teamCount: null,
        teamNames: null,
        usage: null,
      };
  });
  const workspaceIds = workspaceMemberData.map((row) => row.workspace_id);

  /* 3️⃣ Fetch workspaces + owner + members */
  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      plan,
      created_at,
      owner,
     
      userinfo:owner (
        id,
        firstname,
        lastname
      ),
      workspace_members (
       InvitationStatus,
        role,
        userinfo (
          id,
          firstname,
          lastname
        )
      )
    `,
    )
    .in("id", workspaceIds);

  if (workspaceError) {
    return { error: workspaceError.message, data: null };
  }

  /* 4️⃣ Normalize response (important) */
  const normalizedWorkspaces =
    workspaceData?.map((ws) => ({
      id: ws.id,
      name: ws.name,
      plan: ws.plan,
      created_at: ws.created_at,
      owner: {
        id: ws.userinfo?.id ?? "",
        firstname: ws.userinfo?.firstname ?? "",
        lastname: ws.userinfo?.lastname ?? "",
      },
      members:
        ws.workspace_members?.map((m) => ({
          id: m.userinfo?.id ?? "",
          firstname: m.userinfo?.firstname ?? "",
          lastname: m.userinfo?.lastname ?? "",
          role: m.role,
          invitationStatus: m.InvitationStatus,
        })) ?? [],
    })) ?? [];

  return {
    error: null,
    data: {
      workspaces: normalizedWorkspaces,
      workspaceMemberData,
    },
  };
}
