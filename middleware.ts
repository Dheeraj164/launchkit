import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { pathname } = request.nextUrl;
  const user = await supabase.auth.getUser();
  // console.log("Middle ware user info: ", user);
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/api")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // fire-and-forget (DON’T block request)
      supabase.from("api_usage").insert({
        user_id: user.id,
        path: pathname,
        method: request.method,
      });
    }
  }

  return NextResponse.next();
}
