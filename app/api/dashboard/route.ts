import { getUserAndToken } from "@/app/functions/auth";
import { dashboardData } from "@/app/functions/dashboardData";
import { createUserSupabase } from "@/utils/supabase/mobile";

export async function GET(req: Request) {
  const auth = await getUserAndToken(req);

  if (!auth) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 }
    );
  }

  const { user, accessToken } = auth;

  /* 2️⃣ Create user-scoped DB client */
  const supabase = createUserSupabase(accessToken);

  if (!user) {
    return Response.json(
      { error: "Unauthorized", data: null },
      { status: 401 }
    );
  }
  const dashboard = await dashboardData({ supabase, userId: user.id });
  return Response.json(
    { error: dashboard[0].error, data: dashboard },
    { status: dashboard[0].error ? 500 : 200 }
  );
}
