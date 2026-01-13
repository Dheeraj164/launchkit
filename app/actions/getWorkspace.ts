import { createClient } from "@/utils/supabase/server";

export async function getWorkspace() {
  const supabase = await createClient();

  // 1️⃣ Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2️⃣ Get workspaces via relation
  const { data: workspaceMemberData, error } = await supabase
    .from("workspace_members")
    .select(`*`)
    .eq("user_id", user?.id);

  if (error) {
    return { error: error.message, data: null };
  }
  //   console.log(data);

  // 3️⃣ Normalize response
  const workspacesIDS = workspaceMemberData?.map((row) => row.workspace_id);
  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select(
      `
        id,
        name,
        plan,
        created_at,
        owner,
        userinfo (
          firstname,
          lastname
        ),
        workspace_members(
        userinfo(
        firstname,
        lastname
        ),
        role   
        )
      `
    )
    .in("id", workspacesIDS);

  if (workspaceError) {
    // console.log("Error Message: ", workspaceError.message);
    return {
      error: workspaceError.message,
      data: null,
    };
  }

  // console.log(workspaceData);

  return {
    error: null,
    data: {
      workspaces: workspaceData,
      workspaceMemberData: workspaceMemberData,
    },
  };
}
