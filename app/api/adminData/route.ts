import { adminData } from "@/app/functions/adminData";
import { getUserAndToken } from "@/app/functions/auth";
import { createUserSupabase } from "@/utils/supabase/mobile";

export async function GET(req: Request) {
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

  if (!user) {
    return Response.json(
      { error: "Unauthorized user", data: null },
      { status: 401 },
    );
  } else {
    const { data, error } = await adminData({ supabase });

    return Response.json(
      { error: error, data: data },
      { status: error ? 500 : 200 },
    );
  }
}
