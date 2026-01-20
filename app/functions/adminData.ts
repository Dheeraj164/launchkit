/* eslint-disable @typescript-eslint/no-explicit-any */
import { SupabaseClient } from "@supabase/supabase-js";

export async function adminData({
  supabase,
}: {
  supabase: SupabaseClient<any, "public", "public", any, any>;
}) {
  /* 2️⃣ Admin check (SECURITY DEFINER function) */
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError || !isAdmin) {
    return { error: "Forbidden: Admin access only", data: null };
  }

  /* 3️⃣ Fetch users */
  const { data: users, error: userInfoError } = await supabase
    .from("userinfo")
    .select("id, email, phonenumber, firstname, lastname, role, created_at");

  if (userInfoError) {
    // console.log(userInfoError);
    return { error: "Unable to fetch user data", data: null };
  }

  /* 4️⃣ Fetch workspaces */
  const { data: workspaces, error: workspaceError } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      owner,
      created_at,
      plan,
      plan_endDate,
      userinfo (
        firstname,
        lastname
      )
    `,
    );

  if (workspaceError || !workspaces) {
    // console.log(workspaceError);
    return { error: "Unable to fetch workspace data", data: null };
  }

  const normalizedWorkspaces = workspaces.map((ws) => ({
    id: ws.id,
    name: ws.name,
    owner: ws.owner,
    created_at: ws.created_at,
    plan: ws.plan,
    plan_endDate: ws.plan_endDate,
    ownerName: {
      firstname: ws.userinfo?.firstname ?? "",
      lastname: ws.userinfo?.lastname ?? "",
    },
  }));

  /* 5️⃣ Return clean data */
  return {
    error: null,
    data: {
      users,
      workspaces: normalizedWorkspaces,
    },
  };
}
