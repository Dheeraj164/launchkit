import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  // Read query params
  // const { searchParams } = new URL(request.url);
  // const name = searchParams.get("name");

  // console.log("Name:", name);

  const supabase = await createClient();
  const id = (await supabase.auth.getUser()).data.user?.id;
  const { data: workspaceData, error: workspaceError } = await supabase
    .from("workspaces")
    .select("*")
    .eq("owner", id);

  if (workspaceError) {
    return NextResponse.json(
      {
        error: workspaceError.name,
        message: workspaceError.message,
      },
      { status: parseInt(workspaceError.code) }
    );
  }

  //   const { data: workspaceMemberData, error: workspaceMemberError } =
  //     await supabase.from("workspaces_member").select("*");

  //   if (workspaceMemberError) {
  //     return NextResponse.json(
  //       {
  //         error: workspaceMemberError.name,
  //         message: workspaceMemberError.message,
  //       },
  //       { status: parseInt(workspaceMemberError.code) }
  //     );
  //   }

  //   console.log(workspaceData);
  if (workspaceData)
    return NextResponse.json({
      workspaces: workspaceData,
    });
}
