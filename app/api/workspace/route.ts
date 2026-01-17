import { getUserAndToken } from "@/app/functions/auth";
import { workspacesData } from "@/app/functions/workspacesData";
import { createUserSupabase } from "@/utils/supabase/mobile";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { error, data } = await workspacesData({ supabase, userId: user.id });

  return NextResponse.json(
    { error: error, data: data },
    { status: error ? 500 : 200 }
  );
}
