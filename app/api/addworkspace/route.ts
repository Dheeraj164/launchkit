import { getUserAndToken } from "@/app/functions/auth";
import { workspaceAdd } from "@/app/functions/workspaceAdd";
import { createUserSupabase } from "@/utils/supabase/mobile";

export async function POST(req: Request) {
  const auth = await getUserAndToken(req);

  if (!auth) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  }

  const { user, accessToken } = auth;

  /* 2️⃣ Create user-scoped DB client */
  const supabase = createUserSupabase(accessToken);

  //   const resp =  req.body;
  const { workspaceName } = await req.json();

  if (!user) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  } else {
    const { data, error } = await workspaceAdd({
      supabase,
      workspaceName: workspaceName,
    });

    return Response.json(
      { error: error, data: data },
      { status: error ? 500 : 200 },
    );
  }
}
