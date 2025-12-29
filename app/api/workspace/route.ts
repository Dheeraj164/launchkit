// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const supabase = await createClient();
//   const id = (await supabase.auth.getUser()).data.user?.id;

//   const { data: workspaceMemberData, error: workspaceMemberError } =
//     await supabase.from("workspace_members").select("*").eq("user_id", id);
//   if (workspaceMemberError) {
//     console.log(workspaceMemberError);
//     return NextResponse.json(
//       {
//         error: workspaceMemberError.name,
//         message: workspaceMemberError.message,
//       },
//       { status: parseInt(workspaceMemberError.code) }
//     );
//   }

//   console.log(workspaceMemberData);

//   const { data: workspaceData, error: workspaceError } = await supabase
//     .from("workspaces")
//     .select("*")
//     .eq("id", workspaceMemberData.workspace_id);

//   if (workspaceError) {
//     return NextResponse.json(
//       {
//         error: workspaceError.name,
//         message: workspaceError.message,
//       },
//       { status: parseInt(workspaceError.code) }
//     );
//   }

//   if (workspaceData)
//     return NextResponse.json({
//       workspaces: workspaceData,
//     });
// }

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  // 1️⃣ Auth check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (authError) {
    return NextResponse.json(
      {
        error: authError.name,
        message: authError.message,
      },
      { status: 401 }
    );
  }

  // 2️⃣ Get workspaces via relation
  const { data: workspaceMemberData, error } = await supabase
    .from("workspace_members")
    .select(`*`)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
    return NextResponse.json(
      {
        error: workspaceError.name,
        message: workspaceError.message,
      },
      { status: parseInt(workspaceError.code) }
    );
  }

  // console.log(workspaceData);

  return NextResponse.json({
    workspaces: workspaceData,
    workspaceMemberData: workspaceMemberData,
  });
}
