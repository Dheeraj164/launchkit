import { NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const { pathname } = request.nextUrl;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/billing") ||
    pathname.startsWith("/workspace")
  ) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // if (pathname.startsWith("/")) {
  //   if (!user) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   } else {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
  if (pathname.startsWith("/admin")) {
    const { data: userRole } = await supabase
      .from("userinfo")
      .select("role")
      .eq("id", user?.id)
      .single();
    if (userRole?.role !== "admin")
      if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
  }

  if (pathname.startsWith("/api")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      supabase.from("api_usage").insert({
        user_id: user.id,
        path: pathname,
        method: request.method,
      });
    }
  }

  return NextResponse.next();
}
