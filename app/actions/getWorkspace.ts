import { createClient } from "@/utils/supabase/server";

export async function getWorkspace() {
  const supabase = await createClient();

  /* 1️⃣ Auth check */
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return { error: "Unauthorized", data: null };
  }

  /* 2️⃣ Get workspace IDs */
  const { data: workspaceMemberData, error: memberError } = await supabase
    .from("workspace_members")
    .select("workspace_id, role")
    .eq("user_id", user.id);

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
        firstname,
        lastname
      ),
      workspace_members (
       InvitationStatus,
        role,
        userinfo (
          firstname,
          lastname
        )
      )
    `
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
        firstname: ws.userinfo?.firstname ?? "",
        lastname: ws.userinfo?.lastname ?? "",
      },
      members:
        ws.workspace_members?.map((m) => ({
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
