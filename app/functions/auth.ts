import { createMobileClient } from "@/utils/supabase/mobile";
import { createClient } from "@/utils/supabase/server";

export async function getUserAndToken(req: Request) {
  /* 1️⃣ Try cookie-based auth (Web) */
  const ssrSupabase = await createClient();
  const {
    data: { user },
  } = await ssrSupabase.auth.getUser();

  console.log("web user");
  if (user) {
    return { user, accessToken: null };
  }

  /* 2️⃣ Try Bearer token (Mobile) */
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) return null;

    const adminSupabase = createMobileClient();

    const { data, error } = await adminSupabase.auth.getUser(token);
    if (error || !data.user) return null;
    console.log("Mobile User");
    console.log("user: ", data.user);
    return { user: data.user, accessToken: token };
  } catch (e) {
    console.log(e);
  }
}
