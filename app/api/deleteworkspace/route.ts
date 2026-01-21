import { getUserAndToken } from "@/app/functions/auth";
import { deleteWorkspace } from "@/app/functions/deleteWorkspace";
import { createUserSupabase } from "@/utils/supabase/mobile";

export async function DELETE(req: Request) {
  const auth = await getUserAndToken(req);

  const url = new URL(req.url);

  const workspace_id = url.searchParams.get("workspaceId");

  if (!auth) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  }

  const { user, accessToken } = auth;

  /* 2️⃣ Create user-scoped DB client */
  const supabase = createUserSupabase(accessToken);

  if (!user) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  } else {
    const { message } = await deleteWorkspace({
      supabase,
      userId: user.id,
      workspaceId: workspace_id!,
    });

    return Response.json(
      { message },
      { status: message === "Error While deleting the workspace" ? 500 : 200 },
    );
  }
}
